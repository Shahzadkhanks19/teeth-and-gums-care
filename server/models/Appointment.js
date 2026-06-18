/* =====================================
   APPOINTMENT MODEL
===================================== */

const mongoose = require("mongoose");

/* =====================================
   APPOINTMENT SCHEMA
===================================== */

const appointmentSchema = new mongoose.Schema(
  {
    /*
      Patient Name
    */
    name: {
      type: String,
      required: true,
      trim: true,
    },

    /*
      Patient Phone Number
    */
    phone: {
      type: String,
      required: true,
      trim: true,
    },

    /*
      Patient Email Address
    */
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    /*
      Selected Dental Service
    */
    service: {
      type: String,
      required: true,
    },

    /*
      Appointment Date
    */
    date: {
      type: String,
      required: true,
    },

    /*
      Selected Time Slot
    */
    timeSlot: {
      type: String,
      required: true,
    },

    /*
      Assigned Doctor
    */
    doctor: {
      type: String,
      required: true,
    },

    /*
      Additional Patient Notes
    */
    message: {
      type: String,
      default: "",
    },

    /*
      Appointment Status
    */
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "rescheduled",
        "cancelled",
      ],
      default: "pending",
    },

    /*
      Reason For Rescheduling
    */
    rescheduleReason: {
      type: String,
      default: "",
    },

    /*
      Reason For Cancellation
    */
    cancelReason: {
      type: String,
      default: "",
    },

    /*
      24 Hour Reminder Sent
    */
    reminder24hSent: {
      type: Boolean,
      default: false,
    },

    /*
      1 Hour Reminder Sent
    */
    reminder1hSent: {
      type: Boolean,
      default: false,
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
  "Appointment",
  appointmentSchema
);