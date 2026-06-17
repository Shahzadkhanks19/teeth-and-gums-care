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
  return jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/* =====================================
   CREATE DEFAULT ADMIN
===================================== */

const createDefaultAdmin = async () => {
  const existingAdmin = await Admin.findOne({
    email: process.env.ADMIN_EMAIL,
  });

  if (!existingAdmin) {
    if (!passwordRegex.test(process.env.ADMIN_PASSWORD)) {
      console.error(
        "Default admin password does not meet strict password policy."
      );
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
    });

    console.log("Default admin created");
  }
};

/* =====================================
   ADMIN LOGIN
===================================== */

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    await logActivity("Admin Login", admin.email, "admin");

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
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All password fields are required",
      });
    }

    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message: passwordPolicyMessage,
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }

    const admin = await Admin.findById(req.admin.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const isSamePassword = await bcrypt.compare(newPassword, admin.password);

    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be the same as current password",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    admin.password = hashedPassword;
    await admin.save();

    await logActivity("Password Changed", admin.email, "admin");

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
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

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin email not found",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    admin.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    admin.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await admin.save();

    const resetUrl = `${process.env.CLIENT_URL}/admin/reset-password/${resetToken}`;

    await sendEmail({
      to: admin.email,
      subject: "Admin Password Reset - Teeth & Gums Care",
      html: `
        <h2>Password Reset Request</h2>
        <p>You requested to reset your admin password.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link will expire in 15 minutes.</p>
      `,
    });

    await logActivity("Forgot Password Requested", admin.email, "admin");

    res.json({
      success: true,
      message: "Password reset link sent to admin email",
    });
  } catch (error) {
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
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password are required",
      });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: passwordPolicyMessage,
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const admin = await Admin.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    const isSamePassword = await bcrypt.compare(password, admin.password);

    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be the same as old password",
      });
    }

    admin.password = await bcrypt.hash(password, 10);
    admin.resetPasswordToken = "";
    admin.resetPasswordExpire = undefined;

    await admin.save();

    await logActivity("Password Reset Successfully", admin.email, "admin");

    res.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to reset password",
    });
  }
};

module.exports = {
  loginAdmin,
  createDefaultAdmin,
  changeAdminPassword,
  forgotAdminPassword,
  resetAdminPassword,
};