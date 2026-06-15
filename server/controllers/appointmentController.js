const Appointment = require("../models/Appointment");
const BlockedSlot = require("../models/BlockedSlots");
const sendEmail = require("../utils/sendEmail");
const { getIO } = require("../utils/socket");
const logActivity = require("../utils/logActivity");

const validateAppointmentData = ({
  name,
  phone,
  email,
  service,
  date,
  timeSlot,
  doctor,
}) => {
  const indianPhoneRegex = /^[6-9]\d{9}$/;
  const emailRegex = /\S+@\S+\.\S+/;

  if (!name || !phone || !email || !service || !date || !timeSlot || !doctor) {
    return "Please fill all required fields";
  }

  if (!indianPhoneRegex.test(phone)) {
    return "Please enter a valid 10-digit Indian mobile number";
  }

  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }

  return null;
};

const convertSlotToDateTime = (date, slot) => {
  if (!date || !slot) return null;

  const [time, modifier] = slot.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return new Date(
    `${date}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:00`
  );
};

const checkSlotUnavailable = async (
  date,
  timeSlot,
  excludeAppointmentId = null
) => {
  const appointmentQuery = {
    date,
    timeSlot,
    status: { $ne: "cancelled" },
  };

  if (excludeAppointmentId) {
    appointmentQuery._id = { $ne: excludeAppointmentId };
  }

  const existingAppointment = await Appointment.findOne(appointmentQuery);

  if (existingAppointment) {
    return "This slot is already booked. Please choose another time slot.";
  }

  const blockedFullDay = await BlockedSlot.findOne({
    date,
    type: "day",
  });

  if (blockedFullDay) {
    return "Appointments are closed for this date.";
  }

  const blockedSlot = await BlockedSlot.findOne({
    date,
    timeSlot,
    type: "slot",
  });

  if (blockedSlot) {
    return "This slot is blocked by clinic. Please choose another time slot.";
  }

  return null;
};

const createAppointment = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      service,
      date,
      timeSlot,
      doctor,
      message,
    } = req.body;

    const validationError = validateAppointmentData({
      name,
      phone,
      email,
      service,
      date,
      timeSlot,
      doctor,
    });

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const appointmentDateTime = convertSlotToDateTime(date, timeSlot);

    if (!appointmentDateTime || appointmentDateTime <= new Date()) {
      return res.status(400).json({
        success: false,
        message: "You cannot book appointment for a past date or time.",
      });
    }

    const slotError = await checkSlotUnavailable(date, timeSlot);

    if (slotError) {
      return res.status(400).json({
        success: false,
        message: slotError,
      });
    }

    const appointment = await Appointment.create({
      name,
      phone,
      email,
      service,
      date,
      timeSlot,
      doctor,
      message,
    });

    await sendEmail({
      to: email,
      subject: "Appointment Request Received - Teeth & Gums Care",
      html: `
        <h2>Appointment Request Received</h2>

        <p>Dear ${name},</p>

        <p>Thank you for booking an appointment with Teeth & Gums Care.</p>

        <p>Your appointment request has been received successfully.</p>

        <h3>Appointment Details</h3>

        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${timeSlot}</p>
        <p><strong>Doctor:</strong> ${doctor}</p>

        <p>Our team will contact you if any changes are required.</p>

        <br/>

        <p>Regards,<br/>Teeth & Gums Care</p>
      `,
    });

    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "New Appointment Request - Teeth & Gums Care",
      html: `
        <h2>New Appointment Request</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time Slot:</strong> ${timeSlot}</p>
        <p><strong>Doctor:</strong> ${doctor}</p>

        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
      `,
    });

    getIO().emit("newAppointment", appointment);

    await logActivity(
      "New Appointment",
      `${appointment.name} booked ${appointment.service} on ${appointment.date} at ${appointment.timeSlot}`,
      "appointment"
    );

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to book appointment",
    });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch appointments",
    });
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { status, cancelReason } = req.body;

    const allowedStatuses = ["pending", "confirmed", "cancelled", "rescheduled"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment status",
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        status,
        cancelReason: cancelReason || "",
      },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    if (status === "confirmed") {
      await sendEmail({
        to: appointment.email,
        subject: "Appointment Confirmed - Teeth & Gums Care",
        html: `
          <h2>Appointment Confirmed</h2>

          <p>Dear ${appointment.name},</p>

          <p>Your appointment has been confirmed.</p>

          <h3>Appointment Details</h3>

          <p><strong>Service:</strong> ${appointment.service}</p>
          <p><strong>Date:</strong> ${appointment.date}</p>
          <p><strong>Time:</strong> ${appointment.timeSlot}</p>
          <p><strong>Doctor:</strong> ${appointment.doctor}</p>

          <br/>

          <p>Regards,<br/>Teeth & Gums Care</p>
        `,
      });

      await logActivity(
        "Appointment Confirmed",
        `${appointment.name} - ${appointment.date} ${appointment.timeSlot}`,
        "appointment"
      );
    }

    if (status === "cancelled") {
      await sendEmail({
        to: appointment.email,
        subject: "Appointment Cancelled - Teeth & Gums Care",
        html: `
          <h2>Appointment Cancelled</h2>

          <p>Dear ${appointment.name},</p>

          <p>Your appointment has been cancelled.</p>

          ${
            cancelReason
              ? `<p><strong>Reason:</strong> ${cancelReason}</p>`
              : ""
          }

          <p>Please contact us to book another appointment.</p>

          <br/>

          <p>Regards,<br/>Teeth & Gums Care</p>
        `,
      });

      await logActivity(
        "Appointment Cancelled",
        `${appointment.name} - ${appointment.date} ${appointment.timeSlot}`,
        "appointment"
      );
    }

    getIO().emit("appointmentUpdated", appointment);

    res.json({
      success: true,
      message: "Appointment status updated",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update appointment",
    });
  }
};

const rescheduleAppointment = async (req, res) => {
  try {
    const { date, timeSlot, doctor, rescheduleReason } = req.body;

    if (!date || !timeSlot) {
      return res.status(400).json({
        success: false,
        message: "Date and time slot are required",
      });
    }

    const appointmentDateTime = convertSlotToDateTime(date, timeSlot);

    if (!appointmentDateTime || appointmentDateTime <= new Date()) {
      return res.status(400).json({
        success: false,
        message: "You cannot book appointment for a past date or time.",
      });
    }

    const currentAppointment = await Appointment.findById(req.params.id);

    if (!currentAppointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    const finalDoctor = doctor || currentAppointment.doctor;

    const slotError = await checkSlotUnavailable(date, timeSlot, req.params.id);

    if (slotError) {
      return res.status(400).json({
        success: false,
        message: slotError,
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        date,
        timeSlot,
        doctor: finalDoctor,
        rescheduleReason: rescheduleReason || "",
        status: "rescheduled",
      },
      { new: true }
    );

    await sendEmail({
      to: appointment.email,
      subject: "Appointment Rescheduled - Teeth & Gums Care",
      html: `
        <h2>Appointment Rescheduled</h2>

        <p>Dear ${appointment.name},</p>

        <p>Your appointment has been rescheduled.</p>

        <h3>New Appointment Details</h3>

        <p><strong>New Date:</strong> ${appointment.date}</p>
        <p><strong>New Time:</strong> ${appointment.timeSlot}</p>
        <p><strong>Doctor:</strong> ${appointment.doctor}</p>

        ${
          rescheduleReason
            ? `<p><strong>Reason:</strong> ${rescheduleReason}</p>`
            : ""
        }

        <br/>

        <p>Regards,<br/>Teeth & Gums Care</p>
      `,
    });

    getIO().emit("appointmentUpdated", appointment);

    await logActivity(
      "Appointment Rescheduled",
      `${appointment.name} rescheduled to ${appointment.date} at ${appointment.timeSlot}`,
      "appointment"
    );

    res.json({
      success: true,
      message: "Appointment rescheduled",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to reschedule appointment",
    });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    getIO().emit("appointmentDeleted", appointment);

    await logActivity(
      "Appointment Deleted",
      `${appointment.name} - ${appointment.date} ${appointment.timeSlot}`,
      "appointment"
    );

    res.json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete appointment",
    });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  rescheduleAppointment,
  deleteAppointment,
};