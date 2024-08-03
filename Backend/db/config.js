const mongoose = require("mongoose");
require("dotenv").config();

const DB = async () => {
  try {
    const databaseURL = process.env.DB_URL;
    const dbRes = await mongoose.connect(databaseURL);
    console.log(`Database Connected : ${dbRes.connection.host}`);
  } catch (error) {
    console.error(`DbError == ${error}`);
  }
};

module.exports = DB 