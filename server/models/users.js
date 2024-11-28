const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  _id: String,
  balance: {
    type: mongoose.Types.Decimal128,
    required: true,
    default: mongoose.Types.Decimal128.fromString("100"),
  },
  products_bought: {
    products: [String],
    inventory: [],
  },
});

const UserModel = mongoose.model("Users", UserSchema, "Users");
module.exports = UserModel;
