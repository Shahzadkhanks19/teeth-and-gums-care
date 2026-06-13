const express = require("express");
const {
  getUnavailableSlots,
  blockSlotOrDay,
  getBlockedSlots,
  deleteBlockedSlot,
} = require("../controllers/blockedSlotController");

const protectAdmin = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/unavailable", getUnavailableSlots);

router.get("/", protectAdmin, getBlockedSlots);

router.post("/", protectAdmin, blockSlotOrDay);

router.delete("/:id", protectAdmin, deleteBlockedSlot);

module.exports = router;