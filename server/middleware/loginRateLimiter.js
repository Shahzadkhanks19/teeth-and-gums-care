/* =====================================
   LOGIN RATE LIMITER
===================================== */

const rateLimit = require("express-rate-limit");

/* =====================================
   LIMIT LOGIN ATTEMPTS

   - Maximum 5 failed requests
   - Time Window: 15 Minutes
   - Helps prevent brute-force attacks
===================================== */

const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minutes

  max: 5, // Maximum Attempts

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many login attempts. Please try again after 15 minutes.",
  },
});

/* =====================================
   EXPORT RATE LIMITER
===================================== */

module.exports = loginRateLimiter;