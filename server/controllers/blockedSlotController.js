/* =====================================
   BLOCKED SLOT CONTROLLER
===================================== */

const Appointment = require("../models/Appointment");
const BlockedSlot = require("../models/BlockedSlots");
const logActivity = require("../utils/logActivity");

/* =====================================
   CONVERT SLOT TO DATE TIME
===================================== */

const convertSlotToDateTime = (date, timeSlot) => {
  if (!date || !timeSlot) return null;

  const [time, modifier] = timeSlot.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return new Date(
    `${date}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:00`
  );
};

/* =====================================
   GET UNAVAILABLE SLOTS
===================================== */

const getUnavailableSlots = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });
    }

    const appointments = await Appointment.find({
      date,
      status: { $ne: "cancelled" },
    }).select("timeSlot");

    const blockedSlots = await BlockedSlot.find({ date });

    const fullDayBlock = blockedSlots.find((item) => item.type === "day");

    const slotBlocks = blockedSlots.filter((item) => item.type === "slot");

    const bookedSlots = appointments.map((item) => item.timeSlot);

    const blockedSlotTimes = slotBlocks.map((item) => item.timeSlot);

    const blockedSlotReasons = {};

    slotBlocks.forEach((item) => {
      blockedSlotReasons[item.timeSlot] =
        item.reason || "This slot is blocked by clinic.";
    });

    const unavailableSlots = [
      ...bookedSlots,
      ...blockedSlotTimes,
    ];

    res.json({
      success: true,

      isFullDayBlocked: Boolean(fullDayBlock),

      fullDayReason: fullDayBlock?.reason || "",

      unavailableSlots: [...new Set(unavailableSlots)],

      bookedSlots,

      blockedSlotTimes,

      blockedSlotReasons,

      blockedSlots,
    });
  } catch (error) {
    console.error("Get Unavailable Slots Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch unavailable slots",
    });
  }
};

/* =====================================
   BLOCK SLOT OR FULL DAY
===================================== */

const blockSlotOrDay = async (req, res) => {
  try {
    const { date, timeSlot, type, reason } = req.body;

    if (!date || !type) {
      return res.status(400).json({
        success: false,
        message: "Date and type are required",
      });
    }

    const today = new Date().toISOString().split("T")[0];

    if (date < today) {
      return res.status(400).json({
        success: false,
        message: "You cannot block a past date.",
      });
    }

    if (type === "slot") {
      if (!timeSlot) {
        return res.status(400).json({
          success: false,
          message: "Time slot is required",
        });
      }

      const slotDateTime = convertSlotToDateTime(date, timeSlot);

      if (!slotDateTime || slotDateTime <= new Date()) {
        return res.status(400).json({
          success: false,
          message: "You cannot block a past time slot.",
        });
      }
    }

    const existingBlock = await BlockedSlot.findOne({
      date,
      timeSlot: type === "slot" ? timeSlot : "",
      type,
    });

    if (existingBlock) {
      return res.status(400).json({
        success: false,
        message: "This day/slot is already blocked",
      });
    }

    const block = await BlockedSlot.create({
      date,
      timeSlot: type === "slot" ? timeSlot : "",
      type,
      reason: reason || "",
    });

    await logActivity(
      "Availability Blocked",
      type === "day"
        ? `Full day blocked on ${date}. Reason: ${reason || "No reason"}`
        : `Slot blocked on ${date} at ${timeSlot}. Reason: ${
            reason || "No reason"
          }`,
      "availability"
    );

    res.status(201).json({
      success: true,
      message: "Blocked successfully",
      block,
    });
  } catch (error) {
    console.error("Block Slot Or Day Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to block slot/day",
    });
  }
};

/* =====================================
   GET ALL BLOCKED SLOTS
===================================== */

const getBlockedSlots = async (req, res) => {
  try {
    const blockedSlots = await BlockedSlot.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      blockedSlots,
    });
  } catch (error) {
    console.error("Get Blocked Slots Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch blocked slots",
    });
  }
};

/* =====================================
   DELETE BLOCKED SLOT OR DAY
===================================== */

const deleteBlockedSlot = async (req, res) => {
  try {
    const block = await BlockedSlot.findByIdAndDelete(req.params.id);

    if (!block) {
      return res.status(404).json({
        success: false,
        message: "Blocked slot/day not found",
      });
    }

    await logActivity(
      "Availability Restored",
      block.type === "day"
        ? `Full day restored on ${block.date}`
        : `Slot restored on ${block.date} at ${block.timeSlot}`,
      "availability"
    );

    res.json({
      success: true,
      message: "Blocked slot/day removed",
    });
  } catch (error) {
    console.error("Delete Blocked Slot Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to remove blocked slot/day",
    });
  }
};

/* =====================================
   EXPORT CONTROLLERS
===================================== */

module.exports = {
  getUnavailableSlots,
  blockSlotOrDay,
  getBlockedSlots,
  deleteBlockedSlot,
};