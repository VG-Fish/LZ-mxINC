const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/users");
const cors = require("cors");
const productsInfo = require("../products_info.json").products;
require("dotenv").config({ path: "./config.env" });

app.use(express.json()); // makes `request.body` work.
app.use(cors());

const connect = () => {
  mongoose.connect(process.env.ATLAS_URI, {});
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

// For the `app.post()` method.
class UserExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = "UserExistsError";
  }
}

app.post("/createUser", async (request, response) => {
  try {
    const user = request.body;
    const newUser = new UserModel(user);
    const createdUser = await newUser.save({ isNew: true }).catch((error) => {
      if (error.code === 11000) {
        throw new UserExistsError("User already exists.");
      } else {
        throw error;
      }
    });

    response.status(201).json(createdUser);
  } catch (error) {
    switch (error.name) {
      case "UserExistsError":
        response
          .status(409)
          .json({ message: "User already exists.", error: error.message });
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

    const userData = await UserModel.findOne({ email: user.email });
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
