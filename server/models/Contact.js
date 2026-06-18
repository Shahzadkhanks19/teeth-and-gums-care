/* =====================================
   CONTACT MODEL
===================================== */

const mongoose = require("mongoose");

/* =====================================
   CONTACT SCHEMA
===================================== */

const contactSchema = new mongoose.Schema(
  {
    /*
      Visitor Name
    */
    name: {
      type: String,
      required: true,
      trim: true,
    },

    /*
      Visitor Phone Number
    */
    phone: {
      type: String,
      required: true,
      trim: true,
    },

    /*
      Visitor Email Address
    */
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    /*
      Contact Message
    */
    message: {
      type: String,
      required: true,
    },

    /*
      Message Status

      new      = newly submitted
      read     = viewed by admin
      replied  = responded by admin
    */
    status: {
      type: String,
      enum: [
        "new",
        "read",
        "replied",
      ],
      default: "new",
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
  "Contact",
  contactSchema
);