const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    max: 5,
    min: 1,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  author:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model("Review", reviewSchema);
