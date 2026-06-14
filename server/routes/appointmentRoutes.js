const express = require("express");
const {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  rescheduleAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");

const protectAdmin = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", createAppointment);

router.get("/", protectAdmin, getAppointments);

router.patch("/:id/status", protectAdmin, updateAppointmentStatus);

router.patch("/:id/reschedule", protectAdmin, rescheduleAppointment);

router.delete(
  "/:id",
  protectAdmin,
  deleteAppointment
);

module.exports = router;