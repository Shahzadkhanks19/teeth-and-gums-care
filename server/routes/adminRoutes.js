const express = require("express");
const rateLimit = require("express-rate-limit");

const {
  loginAdmin,
  changeAdminPassword,
  forgotAdminPassword,
  resetAdminPassword,
} = require("../controllers/adminController");

const protectAdmin = require("../middleware/authMiddleware");

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
});

router.post("/login", loginLimiter, loginAdmin);
router.post("/forgot-password", forgotAdminPassword);
router.patch("/reset-password/:token", resetAdminPassword);
router.patch("/change-password", protectAdmin, changeAdminPassword);

module.exports = router;