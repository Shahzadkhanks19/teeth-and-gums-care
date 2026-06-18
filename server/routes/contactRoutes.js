/* =====================================
   CONTACT ROUTES
===================================== */

const express = require("express");
const rateLimit = require("express-rate-limit");

const {
  createContact,
  getContacts,
  updateContactStatus,
  deleteContact,
} = require("../controllers/contactController");

const protectAdmin = require("../middleware/authMiddleware");

const router = express.Router();

/* =====================================
   CONTACT FORM RATE LIMITER
===================================== */

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many contact form submissions. Please try again after 15 minutes.",
  },
});

/* =====================================
   PUBLIC ROUTES
===================================== */

/*
  Submit Contact Form
*/
router.post("/", contactLimiter, createContact);

/* =====================================
   PROTECTED ADMIN ROUTES
===================================== */

/*
  Get All Contact Messages
*/
router.get("/", protectAdmin, getContacts);

/*
  Update Contact Status
*/
router.patch("/:id/status", protectAdmin, updateContactStatus);

/*
  Delete Contact Message
*/
router.delete("/:id", protectAdmin, deleteContact);

module.exports = router;