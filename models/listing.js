const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

let default_img =
  "https://images.unsplash.com/photo-1756151224665-eba765e8c3b5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D";

// Schema
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
      url : String,
      filename : String
  },
  price: {
    type: Number,
    min: 100,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

listingSchema.post("findOneAndDelete", async (list) => {
  if (list) {
    await Review.deleteMany({ _id: { $in: list.reviews } });
  }
});

const listing = mongoose.model("listing", listingSchema);

module.exports = listing;
