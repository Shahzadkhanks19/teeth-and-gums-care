/* =====================================
   ACTIVITY LOG MODEL
===================================== */

const mongoose = require("mongoose");

/* =====================================
   ACTIVITY LOG SCHEMA
===================================== */

const activityLogSchema = new mongoose.Schema(
  {
    /*
      Action Performed
      Example:
      - Admin Login
      - Appointment Created
      - Contact Deleted
    */
    action: {
      type: String,
      required: true,
    },

    /*
      Additional Details
    */
    details: {
      type: String,
      default: "",
    },

    /*
      Log Category
    */
    type: {
      type: String,
      enum: [
        "appointment",
        "contact",
        "availability",
        "admin",
        "system",
      ],
      default: "system",
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
  "ActivityLog",
  activityLogSchema
);