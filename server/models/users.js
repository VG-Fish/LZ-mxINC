const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: mongoose.Types.UUID,
    required: true,
  },
  balance: {
    type: mongoose.Types.Decimal128,
    required: true,
    default: 100,
  },
  products_bought: {
    type: [[mongoose.Schema.Types.Mixed]],
  },
});
