/* =====================================
   DATABASE CONFIGURATION
===================================== */

const mongoose = require("mongoose");

/* =====================================
   CONNECT TO MONGODB
===================================== */

/*
  Establishes Connection To MongoDB Atlas

  Environment Variable:
  MONGO_URI
*/

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      "MongoDB Connected Successfully"
    );
  } catch (error) {
    console.error(
      "MongoDB Connection Failed:",
      error.message
    );

    process.exit(1);
  }
};

/* =====================================
   EXPORT DATABASE CONNECTION
===================================== */

module.exports = connectDB;