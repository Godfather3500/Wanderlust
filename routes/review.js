const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn,validateReview, isAuthor} = require("../middlewear.js");
const { createReview, deleteReview } = require("../controllers/review.js");

// add review route
router.post(
  "/",isLoggedIn,
  validateReview,
  wrapAsync(createReview)
);

// delete review route
router.delete(
  "/:reviewId",isLoggedIn,isAuthor,
  wrapAsync(deleteReview)
);

module.exports = router;
