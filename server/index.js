const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/users");
const IdsModel = require("./models/ids");
const cors = require("cors");
const productsInfo = require("../products_info.json").products;
require("dotenv").config({ path: "./config.env" });

app.use(express.json()); // makes `request.body` work.
app.use(cors());

const connect = () => {
  mongoose.connect(process.env.ATLAS_URI, {
    dbName: "LZ-mxINC",
  });
};

connect();
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected. Retrying...");
  connect();
});

app.get("/getUsers", async (_, response) => {
  try {
    const users = await UserModel.find({});
    response.json(users);
  } catch (error) {
    response.status(500).json({
      message: "Error occurred while fetching all the users.",
      error: error.message,
    });
  }
});

app.get("/getUser:id", async (request, response) => {
  try {
    const userId = parseInt(request.params.id, 10);
    const user = await UserModel.find({ id: userId }).exec();
    response.status(200).json(user.balance);
  } catch (error) {
    response.status(404).json({ message: "User not found" });
  }
});

// For the `app.post()` method.
class UserExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = "UserExistsError";
  }
}

class UserCreationError extends Error {
  constructor(message) {
    super(message);
    this.name = "UserCreationError";
  }
}

app.post("/createUser", async (request, response) => {
  try {
    const user = request.body;
    const userId = user.id;
    const userPeriod = user.period;

    // Check if ID in bounds
    if (userId < 100_000 || userId > 999_999) {
      throw new UserCreationError("Invalid ID");
    }

    const currentIds = await IdsModel.findOne({});
    const periodString = "period" + (userPeriod == 1 ? "One" : "Two");
    const idsInPeriod = currentIds.get(periodString);
    const idIndex = idsInPeriod.indexOf(userId);

    if (idIndex == -1) {
      throw new UserCreationError("ID not found in school period.");
    }
    currentIds[periodString].splice(idIndex, 1);
    await currentIds.save();

    const newUser = new UserModel(user);
    const createdUser = await newUser.save({ isNew: true }).catch((error) => {
      if (error.code === 11000) {
        throw new UserExistsError("User already exists.");
      }
      throw error;
    });

    response.status(201).json(createdUser);
  } catch (error) {
    switch (error.name) {
      case "UserExistsError":
        response
          .status(409)
          .json({ message: "User already exists.", error: error.message });
        break;
      case "UserCreationError":
        response
          .status(409)
          .json({ message: "Error in creating user.", error: error.message });
        break;
      default:
        response.status(500).json({
          message: "Error occurred while creating a new user.",
          error: error.message,
        });
    }
  }
});

// For the `app.put()` method.
class InsufficientBalanceError extends Error {
  constructor(message) {
    super(message);
    this.name = "InsufficientBalanceError";
  }
}

// For the `app.put()` method.
class InsufficientInventoryError extends Error {
  constructor(message) {
    super(message);
    this.name = "InsufficientInventoryError";
  }
}

app.put("/updateUser", async (request, response) => {
  try {
    const user = request.body;
    const requestedProduct = user.product;
    const requestedAmount = user.amount;

    const userData = await UserModel.findOne({ id: user.id });
    if (!userData) {
      return response.status(404).json({ message: "User not found." });
    }

    const productIndex = productsInfo.findIndex(
      (product) => product.name === requestedProduct
    );
    if (productIndex === -1) {
      return response.status(404).json({ message: "Product not found." });
    }

    const productDetails = productsInfo[productIndex];

    // Check if user has enough inventory.
    const userInventory = userData.inventory;
    const amountUserCanBuy = userInventory[productIndex];
    if (requestedAmount > amountUserCanBuy) {
      throw new InsufficientInventoryError("Not enough inventory available.");
    }

    // Check if balance is enough.
    const userBalance = parseFloat(userData.balance.toString());
    const totalCost = productDetails.price * requestedAmount;
    if (totalCost > userBalance) {
      throw new InsufficientBalanceError("Insufficient balance.");
    }

    // Update user's balance and inventory.
    userInventory[productIndex] -= requestedAmount;
    userData.balance = mongoose.Types.Decimal128.fromString(
      (userBalance - totalCost).toString()
    );

    await userData.save();

    response.status(201).json(userData);
  } catch (error) {
    switch (error.name) {
      case "InsufficientBalanceError":
        response.status(402).json({
          message: "User does not have enough balance.",
          error: error.message,
        });
        break;
      case "InsufficientInventoryError":
        response.status(400).json({
          message: "User does not have enough inventory.",
          error: error.message,
        });
        break;
      default:
        response.status(500).json({
          message: "Error occurred while updating user.",
          error: error.message,
        });
    }
  }
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running on port ${process.env.PORT || 3001}`);
});
