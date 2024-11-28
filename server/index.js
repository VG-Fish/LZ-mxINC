const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/users");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

app.use(express.json()); // makes `request.body` work.
app.use(cors());

mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("Database connected");
  UserModel.init();
});

app.get("/getUsers", async (_, response) => {
  try {
    const users = await UserModel.find({});
    response.json(users);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error fetching users.", error: error.message });
  }
});

app.post("/createUser", async (request, response) => {
  try {
    const user = request.body;
    const newUser = new UserModel(user);
    await newUser.save().catch((err) => {
      if (err.code === 11000) {
        console.log("Email already exists.");
      } else {
        console.error(err);
      }
    });

    response.status(201).json(user);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error creating user.", error: error.message });
  }
});

app.put("/updateUser/:id", async (request, response) => {
  try {
    const user = request.body;
    const product = user.product;
    const amount = user.amount;

    const products_bought = UserModel.findById(
      user.email,
      (error, document) => {
        if (error) {
          throw error;
        } else if (document) {
          const userProducts = document.get("products_bought.products");
          const userInventory = document.get("products_bought.inventory");
        }
      }
    );
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error updating user.", error: error.message });
  }
});

app.listen(3001, () => {
  console.log("Server runs.");
});
