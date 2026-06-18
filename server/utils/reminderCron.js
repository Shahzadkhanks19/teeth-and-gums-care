/* =====================================
   APPOINTMENT REMINDER CRON
===================================== */

const cron = require("node-cron");

const Appointment = require("../models/Appointment");
const sendEmail = require("./sendEmail");

/* =====================================
   PARSE APPOINTMENT DATE & TIME
===================================== */

/*
  Converts Appointment Date + Time Slot
  into a JavaScript Date Object
*/

const parseAppointmentDateTime = (
  date,
  timeSlot
) => {
  const dateTimeString = `${date} ${timeSlot}`;

  return new Date(dateTimeString);
};

/* =====================================
   SEND REMINDER EMAIL
===================================== */

/*
  Reminder Types:

  24h -> 24 Hours Before Appointment
  1h  -> 1 Hour Before Appointment
*/

const sendReminderEmail = async (
  appointment,
  reminderType
) => {
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

      <p>
        This is a friendly reminder for your upcoming
        dental appointment at Teeth & Gums Care.
      </p>

      <h3>Appointment Details</h3>

      <p>
        <strong>Service:</strong>
        ${appointment.service}
      </p>

      <p>
        <strong>Date:</strong>
        ${appointment.date}
      </p>

      <p>
        <strong>Time:</strong>
        ${appointment.timeSlot}
      </p>

      <p>
        <strong>Doctor:</strong>
        ${appointment.doctor}
      </p>

      <h3>Clinic Details</h3>

      <p>
        <strong>Address:</strong>
        Pal Road, Jodhpur, Rajasthan
      </p>

      <p>
        <strong>Phone:</strong>
        +91 98298 24356
      </p>

      <p>
        Please arrive 5–10 minutes before your
        scheduled appointment.
      </p>

      <br />

      <p>
        Regards,<br />
        Teeth & Gums Care
      </p>
    `,
  });
};

/* =====================================
   START REMINDER CRON
===================================== */

/*
  Runs Every 15 Minutes

  Checks:
  - Confirmed Appointments
  - Rescheduled Appointments

  Sends:
  - 24 Hour Reminder
  - 1 Hour Reminder
*/

const startReminderCron = () => {
  cron.schedule("*/15 * * * *", async () => {
    try {
      const now = new Date();

      const appointments =
        await Appointment.find({
          status: {
            $in: [
              "confirmed",
              "rescheduled",
            ],
          },
        });

      for (const appointment of appointments) {
        const appointmentDateTime =
          parseAppointmentDateTime(
            appointment.date,
            appointment.timeSlot
          );

        const diffMs =
          appointmentDateTime - now;

        const diffMinutes =
          Math.floor(
            diffMs / (1000 * 60)
          );

        /* ==========================
           24 HOUR REMINDER
        ========================== */

        if (
          diffMinutes <= 1440 &&
          diffMinutes > 1425 &&
          !appointment.reminder24hSent
        ) {
          await sendReminderEmail(
            appointment,
            "24h"
          );

          appointment.reminder24hSent = true;

          await appointment.save();

          console.log(
            `24h reminder sent to ${appointment.email}`
          );
        }

        /* ==========================
           1 HOUR REMINDER
        ========================== */

        if (
          diffMinutes <= 60 &&
          diffMinutes > 45 &&
          !appointment.reminder1hSent
        ) {
          await sendReminderEmail(
            appointment,
            "1h"
          );

          appointment.reminder1hSent = true;

          await appointment.save();

          console.log(
            `1h reminder sent to ${appointment.email}`
          );
        }
      }
    } catch (error) {
      console.error(
        "Reminder Cron Error:",
        error.message
      );
    }
  });

  console.log(
    "Appointment Reminder Cron Started"
  );
};

/* =====================================
   EXPORT UTILITY
===================================== */

module.exports = startReminderCron;