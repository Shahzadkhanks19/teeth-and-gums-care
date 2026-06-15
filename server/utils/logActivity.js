const ActivityLog = require("../models/ActivityLog");

const logActivity = async (
  action,
  details = "",
  type = "system"
) => {
  try {
    await ActivityLog.create({
      action,
      details,
      type,
    });
  } catch (error) {
    console.log("Activity Log Error:", error.message);
  }
};

module.exports = logActivity;