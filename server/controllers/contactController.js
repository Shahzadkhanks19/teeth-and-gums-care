const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendEmail");

const createContact = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    const contact = await Contact.create({
      name,
      phone,
      email,
      message,
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

module.exports = {
  createContact,
  getContacts,
  updateContactStatus,
};