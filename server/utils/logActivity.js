/* =====================================
   ACTIVITY LOG UTILITY
===================================== */

const ActivityLog = require("../models/ActivityLog");

/* =====================================
   CREATE ACTIVITY LOG
===================================== */

/*
  Parameters:

  action  -> Action Performed
  details -> Additional Information
  type    -> Log Category

  Examples:

  logActivity(
    "Admin Login",
    "admin@example.com",
    "admin"
  );

  logActivity(
    "Appointment Created",
    "Patient: John Doe",
    "appointment"
  );
*/

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
    /*
      Logging Should Never Break
      Application Functionality
    */
    console.error(
      "Activity Log Error:",
      error.message
    );
  }
};

/* =====================================
   EXPORT UTILITY
===================================== */

module.exports = logActivity;