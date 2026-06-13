const Appointment = require("../models/Appointment");
const BlockedSlot = require("../models/BlockedSlots");

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

    const isFullDayBlocked = blockedSlots.some((item) => item.type === "day");

    const unavailableSlots = [
      ...appointments.map((item) => item.timeSlot),
      ...blockedSlots
        .filter((item) => item.type === "slot")
        .map((item) => item.timeSlot),
    ];

    res.json({
      success: true,
      isFullDayBlocked,
      unavailableSlots: [...new Set(unavailableSlots)],
      blockedSlots,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch unavailable slots",
    });
  }
};

const blockSlotOrDay = async (req, res) => {
  try {
    const { date, timeSlot, type, reason } = req.body;

    if (!date || !type) {
      return res.status(400).json({
        success: false,
        message: "Date and type are required",
      });
    }

    if (type === "slot" && !timeSlot) {
      return res.status(400).json({
        success: false,
        message: "Time slot is required",
      });
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

    res.status(201).json({
      success: true,
      message: "Blocked successfully",
      block,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to block slot/day",
    });
  }
};

const getBlockedSlots = async (req, res) => {
  try {
    const blockedSlots = await BlockedSlot.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      blockedSlots,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch blocked slots",
    });
  }
};

const deleteBlockedSlot = async (req, res) => {
  try {
    const block = await BlockedSlot.findByIdAndDelete(req.params.id);

    if (!block) {
      return res.status(404).json({
        success: false,
        message: "Blocked slot/day not found",
      });
    }

    res.json({
      success: true,
      message: "Blocked slot/day removed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove blocked slot/day",
    });
  }
};

module.exports = {
  getUnavailableSlots,
  blockSlotOrDay,
  getBlockedSlots,
  deleteBlockedSlot,
};