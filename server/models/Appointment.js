const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    service: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    timeSlot: {
      type: String,
      required: true,
    },

    doctor: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "rescheduled", "cancelled"],
      default: "pending",
    },

    rescheduleReason: {
      type: String,
      default: "",
    },

    cancelReason: {
      type: String,
      default: "",
    },
    reminder24hSent: {
  type: Boolean,
  default: false,
},

reminder1hSent: {
  type: Boolean,
  default: false,
},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);