const express = require("express");
const router = express.Router();

const protectAdmin = require("../middleware/authMiddleware");

const {
  getActivityLogs,
} = require("../controllers/activityLogController");

router.get("/", protectAdmin, getActivityLogs);

module.exports = router;