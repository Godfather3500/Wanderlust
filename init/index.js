const mongoose = require("mongoose");
const data = require('./data.js');
const listing = require('../models/listing.js');

// DB Connection
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

const initData = async () => {
  let new_data = data.data.map((obj) => ({
    ...obj,
    owner: "68bac55e0114eaa03ad8934d",
  }));
  await listing.insertMany(new_data);
  console.log("Data saved.");
} 

initData();