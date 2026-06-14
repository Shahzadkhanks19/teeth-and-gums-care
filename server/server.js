const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");
const errorMiddleware = require("./middleware/errorMiddleware");
const { createDefaultAdmin } = require("./controllers/adminController");

const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const blockedSlotsRoutes = require("./routes/blockedSlotsRoutes");
const startReminderCron = require("./utils/reminderCron");

dotenv.config();

const app = express();

app.disable("x-powered-by");

connectDB();
createDefaultAdmin();

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use(globalLimiter);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.send("Teeth & Gums Care API is running");
});

app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/blocked-slots", blockedSlotsRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

startReminderCron();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});