const mongoose = require("mongoose");

const blockedSlotSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },

    timeSlot: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      enum: ["day", "slot"],
      required: true,
    },

    reason: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlockedSlot", blockedSlotSchema);