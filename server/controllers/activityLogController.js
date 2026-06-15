const ActivityLog = require("../models/ActivityLog");

const getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .sort({ createdAt: -1 })
      .limit(200);

    res.json({
      success: true,
      logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch logs",
    });
  }
};

module.exports = {
  getActivityLogs,
};