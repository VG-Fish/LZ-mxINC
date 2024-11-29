const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/users");
const cors = require("cors");
const products = require("../products_info.json").products;
require("dotenv").config({ path: "./config.env" });

app.use(express.json()); // makes `request.body` work.
app.use(cors());

mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
    await newUser.save().catch((error) => {
      if (error.code === 11000) {
        throw new UserExistsError("User already exists.");
      } else {
        throw error;
      }
    });

    response.status(201).json(user);
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

    const userData = UserModel.findById(user.email, (error, document) => {
      if (error) {
        throw error;
      }
      return document;
    });

    const productDetails = products.find(
      (product) => product.name === requestedProduct
    );
    const productIndex = products.indexOf(requestedProduct);

    // Check if user has enough 'space' to buy the product.
    const userInventory = userData.get("inventory");
    const amountUserCanBuy = userInventory[productIndex];
    if (requestedAmount > amountUserCanBuy) {
      throw new InsufficientInventoryError();
    }

    // Check is balance is enough.
    const userBalance = userData.get("balance");
    if (productDetails.price * requestedAmount > userBalance) {
      throw new InsufficientBalanceError();
    }

    // User can buy the product now.
    const updatedUser = await UserModel.updateOne(
      { email: user.email },
      {
        $set: {
          [`inventory.${productIndex}`]: amountUserCanBuy - requestedAmount,
          balance: userBalance - productDetails.price * requestedAmount,
        },
      }
    );

    response.status(201).json(updatedUser);
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
          message: "Error occurred while updating a user.",
          error: error.message,
        });
    }
  }
});

app.listen(3001, () => {
  console.log("Server runs.");
});
