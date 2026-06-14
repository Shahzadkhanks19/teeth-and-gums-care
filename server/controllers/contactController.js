const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendEmail");

const validateContactData = ({ name, phone, email, message }) => {
  const indianPhoneRegex = /^[6-9]\d{9}$/;
  const emailRegex = /\S+@\S+\.\S+/;

  if (!name || !phone || !email || !message) {
    return "Please fill all required fields";
  }

  if (name.trim().length < 2) {
    return "Name should be at least 2 characters";
  }

  if (!indianPhoneRegex.test(phone)) {
    return "Please enter a valid 10-digit Indian mobile number";
  }

  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }

  if (message.trim().length < 10) {
    return "Message should be at least 10 characters";
  }

  return null;
};

const createContact = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    const validationError = validateContactData({
      name,
      phone,
      email,
      message,
    });

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const contact = await Contact.create({
      name: name.trim(),
      phone,
      email: email.trim(),
      message: message.trim(),
    });

    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "New Contact Message - Teeth & Gums Care",
      html: `
        <h2>New Contact Form Message</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Message submitted successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit message",
    });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch contacts",
    });
  }
};

const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ["new", "read", "replied"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact status",
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    res.json({
      success: true,
      message: "Contact status updated",
      contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update contact status",
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    res.json({
      success: true,
      message: "Contact message deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete contact message",
    });
  }
};

module.exports = {
  createContact,
  getContacts,
  updateContactStatus,
  deleteContact,
};