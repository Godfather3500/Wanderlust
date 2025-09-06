const Listing = require("../models/listing.js");
const axios = require("axios");
const uploadToImgBB = require("../cloudConfig.js");

// index page
module.exports.index = async (req, res) => {
  const { category, search } = req.query; // Get the category & search from the URL query

  // Build the query object
  let query = {};
  if (category) query.category = category; // Add category filter if provided
  if (search)
    query.$or = [
      { title: new RegExp(search, "i") },
      { country: new RegExp(search, "i") },
      { location: new RegExp(search, "i") },
    ];

  // Find listings based on the constructed query
  const allListings = await Listing.find(query);

   if (search && !allListings.length) {
     req.flash("error", "No Search Results");
     return res.redirect("/listings");
   }

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

  let coordinates = null;
  if (list.location && list.country) {
    const address = `${list.location}, ${list.country}`;
    try {
      console.log(`Attempting to geocode: ${address}`);
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: address,
            format: "json",
            limit: 1,
          },
          headers: {
            "User-Agent": "WanderlustApp/1.0 (your.email@example.com)", // Replace with your email
          },
          timeout: 10000, // 10 second timeout
        }
      );
      if (response.data && response.data.length > 0) {
        const result = response.data[0];
        if (result.lat && result.lon) {
          coordinates = {
            latitude: parseFloat(result.lat),
            longitude: parseFloat(result.lon),
          };
          console.log(`Successfully geocoded ${address}:`, coordinates);
        }
      } else {
        console.warn(`No geocoding results found for: ${address}`);
      }
    } catch (error) {
      console.error(`Geocoding error for ${address}:`, error.message);
    }
  }
  console.log("Final coordinates being passed to template:", coordinates);
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
    { ...req.body }
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
