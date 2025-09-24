const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const multer = require("multer");
const upload = multer({ dest: "./uploads"});
const { isLoggedIn, isOwner, validateListing } = require("../middlewear.js");
const {
  index,
  renderNewForm,
  showList,
  createListing,
  renderEditForm,
  updateListing,
  deleteListing,
} = require("../controllers/listings.js");

router
  .route("/")
  .get(wrapAsync(index))
  .post(
    isLoggedIn,
    upload.single("image"),
    validateListing,
    wrapAsync(createListing)
  );

// new listing add page
router.get("/new", isLoggedIn, renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(showList))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("image"),
    validateListing,
    wrapAsync(updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(deleteListing));

// edit page
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(renderEditForm));

module.exports = router;
