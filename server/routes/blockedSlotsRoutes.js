/* =====================================
   BLOCKED SLOT ROUTES
===================================== */

const express = require("express");

const protectAdmin = require("../middleware/authMiddleware");

const {
  getUnavailableSlots,
  blockSlotOrDay,
  getBlockedSlots,
  deleteBlockedSlot,
} = require("../controllers/blockedSlotController");

const router = express.Router();

/* =====================================
   PUBLIC ROUTES
===================================== */

/*
  Get Unavailable Slots
  Used by Appointment Booking Page
*/
router.get("/unavailable", getUnavailableSlots);

/* =====================================
   PROTECTED ADMIN ROUTES
===================================== */

/*
  Get All Blocked Slots
*/
router.get("/", protectAdmin, getBlockedSlots);

/*
  Block Specific Slot or Full Day
*/
router.post("/", protectAdmin, blockSlotOrDay);

/*
  Delete Blocked Slot
*/
router.delete("/:id", protectAdmin, deleteBlockedSlot);

module.exports = router;