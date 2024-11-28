const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

mongoose.connect(process.env.ATLAS_URI);

app.listen(3001, () => {
  console.log("Server runs.");
});
