const cron = require("node-cron");
const Appointment = require("../models/Appointment");
const sendEmail = require("./sendEmail");

const parseAppointmentDateTime = (date, timeSlot) => {
  const dateTimeString = `${date} ${timeSlot}`;
  return new Date(dateTimeString);
};

const sendReminderEmail = async (appointment, reminderType) => {
  const subject =
    reminderType === "24h"
      ? "Appointment Reminder - Tomorrow - Teeth & Gums Care"
      : "Appointment Reminder - 1 Hour Left - Teeth & Gums Care";

  const heading =
    reminderType === "24h"
      ? "Your appointment is tomorrow"
      : "Your appointment is in 1 hour";

  await sendEmail({
    to: appointment.email,
    subject,
    html: `
      <h2>${heading}</h2>

      <p>Dear ${appointment.name},</p>

      <p>This is a friendly reminder for your upcoming dental appointment at Teeth & Gums Care.</p>

      <h3>Appointment Details</h3>

      <p><strong>Service:</strong> ${appointment.service}</p>
      <p><strong>Date:</strong> ${appointment.date}</p>
      <p><strong>Time:</strong> ${appointment.timeSlot}</p>
      <p><strong>Doctor:</strong> ${appointment.doctor}</p>

      <h3>Clinic Details</h3>
      <p><strong>Address:</strong> Pal Road, Jodhpur, Rajasthan</p>
      <p><strong>Phone:</strong> +91 98298 24356</p>

      <p>Please arrive 5-10 minutes before your scheduled time.</p>

      <br/>

      <p>Regards,<br/>Teeth & Gums Care</p>
    `,
  });
};

const startReminderCron = () => {
  cron.schedule("*/15 * * * *", async () => {
    try {
      const now = new Date();

      const appointments = await Appointment.find({
        status: { $in: ["confirmed", "rescheduled"] },
      });

      for (const appointment of appointments) {
        const appointmentDateTime = parseAppointmentDateTime(
          appointment.date,
          appointment.timeSlot
        );

        const diffMs = appointmentDateTime - now;
        const diffMinutes = Math.floor(diffMs / (1000 * 60));

        if (
          diffMinutes <= 1440 &&
          diffMinutes > 1425 &&
          !appointment.reminder24hSent
        ) {
          await sendReminderEmail(appointment, "24h");

          appointment.reminder24hSent = true;
          await appointment.save();
        }

        if (
          diffMinutes <= 60 &&
          diffMinutes > 45 &&
          !appointment.reminder1hSent
        ) {
          await sendReminderEmail(appointment, "1h");

          appointment.reminder1hSent = true;
          await appointment.save();
        }
      }
    } catch (error) {
      console.error("Reminder cron error:", error.message);
    }
  });

  console.log("Reminder cron started");
};

module.exports = startReminderCron;