const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.UUID,
    required: true,
  },
  balance: {
    type: mongoose.Types.Decimal128,
    required: true,
    default: mongoose.Types.Decimal128.fromString("100"),
  },
  products_bought: {
    products: [String],
    inventory: [Number],
  },
});

const UserModel = mongoose.model("Users", UserSchema);
module.exports = UserModel;
