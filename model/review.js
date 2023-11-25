const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  cName: String,
  pros: String,
  cons: String,
  rate: String,
});

exports.Review = mongoose.model("Review", reviewSchema);
