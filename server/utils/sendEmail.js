/* =====================================
   EMAIL UTILITY
===================================== */

const nodemailer = require("nodemailer");

/* =====================================
   SEND EMAIL
===================================== */

/*
  Parameters:

  to      -> Recipient Email
  subject -> Email Subject
  html    -> Email Content

  Used For:

  - Password Reset Emails
  - Appointment Reminders
  - Future Notifications
*/

const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  try {
    /* =====================================
       ENVIRONMENT VALIDATION
    ===================================== */

    if (
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS
    ) {
      console.error(
        "Email not sent: EMAIL_USER or EMAIL_PASS missing"
      );

      return;
    }

    /* =====================================
       EMAIL TRANSPORTER
    ===================================== */

    const transporter =
      nodemailer.createTransport({
        service: "gmail",

        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

    /* =====================================
       SEND EMAIL
    ===================================== */

    await transporter.sendMail({
      from: `"Teeth & Gums Care" <${process.env.EMAIL_USER}>`,

      to,

      subject,

      html,
    });

    console.log(
      `Email sent successfully to ${to}`
    );
  } catch (error) {
    console.error(
      "Email Sending Failed:",
      error.message
    );
  }
};

/* =====================================
   EXPORT UTILITY
===================================== */

module.exports = sendEmail;