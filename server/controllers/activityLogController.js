/* =====================================
   ACTIVITY LOG CONTROLLER
===================================== */

const ActivityLog = require("../models/ActivityLog");

/* =====================================
   GET ACTIVITY LOGS
===================================== */

/*
  Returns Latest Activity Logs

  Used By:
  - Admin Dashboard
  - Activity Log Page

  Sorting:
  Newest → Oldest

  Limit:
  Last 200 Records
*/

const getActivityLogs = async (
  req,
  res
) => {
  try {
    const logs =
      await ActivityLog.find()
        .sort({
          createdAt: -1,
        })
        .limit(200);

    res.json({
      success: true,
      logs,
    });
  } catch (error) {
    console.error(
      "Get Activity Logs Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch activity logs",
    });
  }
};

/* =====================================
   EXPORT CONTROLLER
===================================== */

module.exports = {
  getActivityLogs,
};