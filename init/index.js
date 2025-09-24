const mongoose = require("mongoose");
const data = require('./data.js');
const listing = require('../models/listing.js');

// DB Connection
async function main() {
  await mongoose.connect(
    "mongodb+srv://btechcse21014122_db_user:txJHOR5MTe066kVg@wanderlust.bs8nv3h.mongodb.net/?retryWrites=true&w=majority&appName=Wanderlust"
  );
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
    owner: "68bc3de097fece96ae63300d",
  }));
  await listing.insertMany(new_data);
  console.log("Data saved.");
} 

initData();