const mongoose = require("mongoose");
const products = require("../../products_info.json").products;

const UserSchema = new mongoose.Schema({
  _id: String,
  balance: {
    type: mongoose.Types.Decimal128,
    required: true,
    default: mongoose.Types.Decimal128.fromString("100"),
  },
  products_bought: {
    products: [String],
    inventory: Array(13)
      .fill(0)
      .map((_, index) => {
        return products[index].amount_available_to_individual;
      }),
  },
});

const UserModel = mongoose.model("Users", UserSchema, "Users");
module.exports = UserModel;
