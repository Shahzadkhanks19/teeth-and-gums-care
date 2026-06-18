/* =====================================
   ADMIN MODEL
===================================== */

const mongoose = require("mongoose");

/* =====================================
   ADMIN SCHEMA
===================================== */

const adminSchema = new mongoose.Schema(
  {
    /*
      Admin Email
      Used for authentication
    */
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    /*
      Hashed Password
      Stored using bcrypt
    */
    password: {
      type: String,
      required: true,
    },

    /*
      Password Reset Token
      Generated during forgot password flow
    */
    resetPasswordToken: {
      type: String,
      default: "",
    },

    /*
      Password Reset Token Expiry
    */
    resetPasswordExpire: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

/* =====================================
   EXPORT MODEL
===================================== */

module.exports = mongoose.model(
  "Admin",
  adminSchema
);