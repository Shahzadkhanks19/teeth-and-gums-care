/* =====================================
   ADMIN ROUTES
===================================== */

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

/* =====================================
   LOGIN RATE LIMITER
===================================== */

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
});

/* =====================================
   FORGOT PASSWORD RATE LIMITER
===================================== */

const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many password reset requests. Please try again after 15 minutes.",
  },
});

/* =====================================
   RESET PASSWORD RATE LIMITER
===================================== */

const resetPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many reset attempts. Please try again after 15 minutes.",
  },
});

/* =====================================
   ADMIN AUTH ROUTES
===================================== */

router.post("/login", loginLimiter, loginAdmin);

router.post("/forgot-password", forgotPasswordLimiter, forgotAdminPassword);

router.patch("/reset-password/:token", resetPasswordLimiter, resetAdminPassword);

/* =====================================
   PROTECTED ADMIN ROUTES
===================================== */

router.patch("/change-password", protectAdmin, changeAdminPassword);

module.exports = router;