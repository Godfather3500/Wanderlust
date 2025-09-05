const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

// Create review
module.exports.createReview = async (req, res) => {
  let list = await Listing.findById(req.params.id);
  let new_review = new Review(req.body);
  new_review.author = req.user._id;
  list.reviews.push(new_review);
  await new_review.save();
  await list.save();
  req.flash("success", "New Review Added");
  res.redirect(`/listings/${list._id}`);
};

// delete review
module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted");
  res.redirect(`/listings/${id}`);
};
