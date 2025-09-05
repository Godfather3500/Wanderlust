const joi = require("joi");

module.exports.listingSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  price: joi.number().required().min(100),
  country: joi.string().required(),
  location: joi.string().required(),
  image: joi.string().allow("", null)
});


module.exports.reviewSchema = joi.object({
  rating : joi.number().required().max(5).min(1),
  comment : joi.string().required()
});