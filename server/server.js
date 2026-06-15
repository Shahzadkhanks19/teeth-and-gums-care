const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");
const errorMiddleware = require("./middleware/errorMiddleware");
const { createDefaultAdmin } = require("./controllers/adminController");

const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const blockedSlotsRoutes = require("./routes/blockedSlotsRoutes");
const startReminderCron = require("./utils/reminderCron");
const activityLogRoutes = require("./routes/activityLogRoutes");
const { initSocket } = require("./utils/socket");

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  },
});

initSocket(io);

io.on("connection", (socket) => {
  console.log("Admin connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Admin disconnected:", socket.id);
  });
});

app.disable("x-powered-by");

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
app.use("/api/activity-logs", activityLogRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    console.log("Database connection established");

    await createDefaultAdmin();

    startReminderCron();

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();