const Listing = require("../models/listing.js");
const axios = require("axios");
const uploadToImgBB = require("../cloudConfig.js");

// index page
module.exports.index = async (req, res) => {
  let allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// new listing add page
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showList = async (req, res) => {
  const list = await Listing.findById(req.params.id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!list) {
    req.flash("error", "Listing you requested for doesn't exist!");
    res.redirect("/listings");
  }
  // --- Geocoding Logic ---
  let coordinates = null;
  if (list.location && list.country) {
    const address = `${list.location}, ${list.country}`;
    try {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: address,
            format: "json",
            limit: 1, // Only need the top result
          },
          headers: {
            "User-Agent": "WanderlustApp/1.0 (g.w.yn.ethrepal.es.ya@gmail.com)", // IMPORTANT: Replace with your app name and email
          },
        }
      );

      // Check if response.data is not empty and contains valid lat/lon
      if (
        response.data &&
        response.data.length > 0 &&
        response.data[0].lat &&
        response.data[0].lon
      ) {
        coordinates = {
          latitude: parseFloat(response.data[0].lat),
          longitude: parseFloat(response.data[0].lon),
        };
        console.log(`Geocoded ${address} to:`, coordinates); // Log successful geocoding
      } else {
        console.warn(`Nominatim did not find coordinates for: ${address}`);
        console.log("Nominatim response data:", response.data); // Log response data even if empty
      }
    } catch (error) {
      req.flash(
        "error",
        `Error geocoding location for ${address}: ${error.message}`
      );
      // coordinates remains null if there's an error or no results
    }
  }
  // --- End Geocoding Logic ---

  // Pass the coordinates along with the listing data to the EJS template
  res.render("listings/show.ejs", { list, coordinates });
};

// create listing
module.exports.createListing = async (req, res, next) => {
  const newListing = new Listing(req.body);
  newListing.owner = req.user._id;
  if (req.file) {
    try {
      const imgbbUrl = await uploadToImgBB(req.file.path);
      newListing.image = {
        url: imgbbUrl,
        filename: req.file.filename,
      };
    } catch (uploadError) {
      req.flash("error", "Image upload failed: " + uploadError.message);
      return res.redirect("/listings/new");
    }
  }
  await newListing.save();
  req.flash("success", "New Listing Added");
  res.redirect("/listings");
};

// edit listing page
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let list = await Listing.findById(id);
  if (!list) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { list });
};

// update Listing
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let list = await Listing.findByIdAndUpdate(
    id,
    { ...req.body },
    { runValidators: true }
  );

  if (typeof req.file != "undefined") {
    try {
      const imgbbUrl = await uploadToImgBB(req.file.path);
      list.image = {
        url: imgbbUrl,
        filename: req.file.filename,
      };
      await list.save();
    } catch (uploadError) {
      req.flash("error", "Image upload failed: " + uploadError.message);
      return res.redirect("/listings/");
    }
  }

  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

// delete listing
module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  const list = await Listing.findByIdAndDelete(id);
  if (!list) {
    req.flash("error", "Listing you requested for doesn't exist!");
    return res.redirect("/listings");
  }
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};
