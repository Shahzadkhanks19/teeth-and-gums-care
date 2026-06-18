/* =====================================
   ADMIN CONTROLLER
===================================== */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const Admin = require("../models/Admin");
const sendEmail = require("../utils/sendEmail");
const logActivity = require("../utils/logActivity");

/* =====================================
   PASSWORD POLICY
===================================== */

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const passwordPolicyMessage =
  "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";

/* =====================================
   TOKEN GENERATOR
===================================== */

const generateToken = (adminId) => {
  return jwt.sign(
    {
      id: adminId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

/* =====================================
   CREATE DEFAULT ADMIN
===================================== */

const createDefaultAdmin = async () => {
  const existingAdmin = await Admin.findOne({
    email: process.env.ADMIN_EMAIL,
  });

  if (existingAdmin) {
    return;
  }

  if (!passwordRegex.test(process.env.ADMIN_PASSWORD)) {
    console.error(
      "Default admin password does not meet strict password policy."
    );

    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD,
    10
  );

  await Admin.create({
    email: process.env.ADMIN_EMAIL,
    password: hashedPassword,
  });

  console.log("Default admin created");
};

/* =====================================
   ADMIN LOGIN
===================================== */

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    /*
      Validate Required Fields
    */
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    /*
      Find Admin By Email
    */
    const admin = await Admin.findOne({
      email,
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    /*
      Compare Password
    */
    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    /*
      Save Login Activity
    */
    await logActivity(
      "Admin Login",
      admin.email,
      "admin"
    );

    /*
      Send Auth Response
    */
    res.json({
      success: true,
      message: "Login successful",
      token: generateToken(admin._id),
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error(
      "Admin Login Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Admin login failed",
    });
  }
};

/* =====================================
   CHANGE ADMIN PASSWORD
===================================== */

const changeAdminPassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;

    /*
      Validate Required Fields
    */
    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "All password fields are required",
      });
    }

    /*
      Validate Password Strength
    */
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message: passwordPolicyMessage,
      });
    }

    /*
      Match New Password & Confirm Password
    */
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "New password and confirm password do not match",
      });
    }

    /*
      Get Logged In Admin
    */
    const admin = await Admin.findById(
      req.admin.id
    );

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    /*
      Verify Current Password
    */
    const isMatch = await bcrypt.compare(
      currentPassword,
      admin.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    /*
      Prevent Same Password Reuse
    */
    const isSamePassword = await bcrypt.compare(
      newPassword,
      admin.password
    );

    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message:
          "New password cannot be the same as current password",
      });
    }

    /*
      Hash & Save New Password
    */
    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    admin.password = hashedPassword;

    await admin.save();

    /*
      Save Activity Log
    */
    await logActivity(
      "Password Changed",
      admin.email,
      "admin"
    );

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error(
      "Change Password Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to change password",
    });
  }
};

/* =====================================
   FORGOT ADMIN PASSWORD
===================================== */

const forgotAdminPassword = async (req, res) => {
  try {
    const { email } = req.body;

    /*
      Validate Email
    */
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    /*
      Find Admin
    */
    const admin = await Admin.findOne({
      email,
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin email not found",
      });
    }

    /*
      Generate Reset Token
    */
    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    /*
      Hash Reset Token Before Saving
    */
    admin.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    /*
      Token Valid For 15 Minutes
    */
    admin.resetPasswordExpire =
      Date.now() + 15 * 60 * 1000;

    await admin.save();

    /*
      Frontend Reset Link
    */
    const resetUrl = `${process.env.CLIENT_URL}/admin/reset-password/${resetToken}`;

    /*
      Send Reset Email
    */
    await sendEmail({
      to: admin.email,
      subject:
        "Admin Password Reset - Teeth & Gums Care",
      html: `
        <h2>Password Reset Request</h2>

        <p>
          You requested to reset your admin password.
        </p>

        <p>
          Click the link below to reset your password:
        </p>

        <a href="${resetUrl}">
          ${resetUrl}
        </a>

        <p>
          This link will expire in 15 minutes.
        </p>
      `,
    });

    /*
      Save Activity Log
    */
    await logActivity(
      "Forgot Password Requested",
      admin.email,
      "admin"
    );

    res.json({
      success: true,
      message:
        "Password reset link sent to admin email",
    });
  } catch (error) {
    console.error(
      "Forgot Password Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to send reset email",
    });
  }
};

/* =====================================
   RESET ADMIN PASSWORD
===================================== */

const resetAdminPassword = async (req, res) => {
  try {
    const {
      password,
      confirmPassword,
    } = req.body;

    /*
      Validate Required Fields
    */
    if (!password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and confirm password are required",
      });
    }

    /*
      Validate Password Strength
    */
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: passwordPolicyMessage,
      });
    }

    /*
      Match Passwords
    */
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    /*
      Hash Token From URL
    */
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    /*
      Find Admin With Valid Token
    */
    const admin = await Admin.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    /*
      Prevent Same Password Reuse
    */
    const isSamePassword = await bcrypt.compare(
      password,
      admin.password
    );

    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message:
          "New password cannot be the same as old password",
      });
    }

    /*
      Save New Password
    */
    admin.password = await bcrypt.hash(
      password,
      10
    );

    /*
      Clear Reset Token
    */
    admin.resetPasswordToken = "";
    admin.resetPasswordExpire = undefined;

    await admin.save();

    /*
      Save Activity Log
    */
    await logActivity(
      "Password Reset Successfully",
      admin.email,
      "admin"
    );

    res.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error(
      "Reset Password Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to reset password",
    });
  }
};

/* =====================================
   EXPORT CONTROLLERS
===================================== */

module.exports = {
  loginAdmin,
  createDefaultAdmin,
  changeAdminPassword,
  forgotAdminPassword,
  resetAdminPassword,
};