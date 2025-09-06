const joi = require("joi");

module.exports.listingSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  price: joi.number().required().min(100),
  country: joi.string().required(),
  location: joi.string().required(),
  image: joi.string().allow("", null),
  category: joi
    .string()
    .allow(
      "Mountains",
      "Arctic",
      "Rooms",
      "City",
      "Castle",
      "Pool",
      "Camping",
      "Farm",
      "Beach"
    ),
});

module.exports.reviewSchema = joi.object({
  rating: joi.number().required().max(5).min(1),
  comment: joi.string().required(),
});
