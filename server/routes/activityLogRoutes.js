/* =====================================
   ACTIVITY LOG ROUTES
===================================== */

const express = require("express");

const protectAdmin = require("../middleware/authMiddleware");

const {
  getActivityLogs,
} = require("../controllers/activityLogController");

const router = express.Router();

/* =====================================
   PROTECTED ADMIN ROUTES
===================================== */

/*
  Get All Activity Logs
*/
router.get("/", protectAdmin, getActivityLogs);

module.exports = router;