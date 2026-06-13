const express = require("express");
const {
  createContact,
  getContacts,
  updateContactStatus,
} = require("../controllers/contactController");

const protectAdmin = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", createContact);

router.get("/", protectAdmin, getContacts);

router.patch("/:id/status", protectAdmin, updateContactStatus);

module.exports = router;