const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/users");
require("dotenv").config({ path: "./config.env" });

mongoose.connect(process.env.ATLAS_URI);

app.get("/getUsers", (request, response) => {
  UserModel.find({});
});

app.listen(3001, () => {
  console.log("Server runs.");
});
