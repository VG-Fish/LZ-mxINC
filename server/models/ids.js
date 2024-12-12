const mongoose = require("mongoose");

const studentsInPeriodOne = 20;
const studentsInPeriodTwo = 29;
const LOWER_BOUND = 100_000;
const UPPER_BOUND = 999_999;

function generateRandomNumbers(count, min, max) {
  return Array.from(
    { length: count },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
}

const IdsSchema = new mongoose.Schema({
  periodOne: {
    type: [Number],
    required: true,
    default: generateRandomNumbers(
      studentsInPeriodOne,
      LOWER_BOUND,
      UPPER_BOUND
    ),
  },
  periodTwo: {
    type: [Number],
    required: true,
    default: generateRandomNumbers(
      studentsInPeriodTwo,
      LOWER_BOUND,
      UPPER_BOUND
    ),
  },
});

const IdsModel = mongoose.model("Ids", IdsSchema);
module.exports = IdsModel;
