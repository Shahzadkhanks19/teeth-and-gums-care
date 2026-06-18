/* =====================================
   BLOCKED SLOT MODEL
===================================== */

const mongoose = require("mongoose");

/* =====================================
   BLOCKED SLOT SCHEMA
===================================== */

const blockedSlotSchema = new mongoose.Schema(
  {
    /*
      Date Being Blocked
      Example:
      2026-06-18
    */
    date: {
      type: String,
      required: true,
    },

    /*
      Specific Time Slot

      Empty if a full day is blocked
    */
    timeSlot: {
      type: String,
      default: "",
    },

    /*
      Block Type

      day  = entire day blocked
      slot = specific slot blocked
    */
    type: {
      type: String,
      enum: ["day", "slot"],
      required: true,
    },

    /*
      Reason For Blocking
    */
    reason: {
      type: String,
      default: "",
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
  "BlockedSlot",
  blockedSlotSchema
);