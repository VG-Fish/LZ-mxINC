const mongoose = require("mongoose");
const products = require("../../products_info.json").products;

const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  balance: {
    type: mongoose.Types.Decimal128,
    required: true,
    default: mongoose.Types.Decimal128.fromString("100"),
  },
  inventory: {
    type: [Number],
    default: () =>
      products.map((product) => product.amount_available_to_individual),
  },
});

const UserModel = mongoose.model("Users", UserSchema, "Users");
module.exports = UserModel;
