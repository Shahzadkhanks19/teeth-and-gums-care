/* =====================================
   APPOINTMENT ROUTES
===================================== */

const express = require("express");
const rateLimit = require("express-rate-limit");

const {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  rescheduleAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");

const protectAdmin = require("../middleware/authMiddleware");

const router = express.Router();

/* =====================================
   APPOINTMENT FORM RATE LIMITER
===================================== */

const appointmentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many appointment requests. Please try again after 15 minutes.",
  },
});

/* =====================================
   PUBLIC ROUTES
===================================== */

/*
  Book Appointment
*/
router.post("/", appointmentLimiter, createAppointment);

/* =====================================
   PROTECTED ADMIN ROUTES
===================================== */

/*
  Get All Appointments
*/
router.get("/", protectAdmin, getAppointments);

/*
  Update Appointment Status
*/
router.patch("/:id/status", protectAdmin, updateAppointmentStatus);

/*
  Reschedule Appointment
*/
router.patch("/:id/reschedule", protectAdmin, rescheduleAppointment);

/*
  Delete Appointment
*/
router.delete("/:id", protectAdmin, deleteAppointment);

module.exports = router;