/* =====================================
   CORE PACKAGES
===================================== */

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");
const http = require("http");
const { Server } = require("socket.io");

/* =====================================
   CONFIG & DATABASE
===================================== */

const connectDB = require("./config/db");

/* =====================================
   MIDDLEWARE
===================================== */

const errorMiddleware = require("./middleware/errorMiddleware");

/* =====================================
   CONTROLLERS
===================================== */

const {
  createDefaultAdmin,
} = require("./controllers/adminController");

/* =====================================
   ROUTES
===================================== */

const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const blockedSlotsRoutes = require("./routes/blockedSlotsRoutes");
const activityLogRoutes = require("./routes/activityLogRoutes");

/* =====================================
   UTILITIES
===================================== */

const startReminderCron = require("./utils/reminderCron");
const { initSocket } = require("./utils/socket");

/* =====================================
   ENV CONFIGURATION
===================================== */

dotenv.config();

/* =====================================
   EXPRESS APP INITIALIZATION
===================================== */

const app = express();
const server = http.createServer(app);

/* =====================================
   SOCKET.IO CONFIGURATION
===================================== */

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  },
});

/* =====================================
   INITIALIZE SOCKET INSTANCE
===================================== */

initSocket(io);

/* =====================================
   SOCKET CONNECTION EVENTS
===================================== */

io.on("connection", (socket) => {
  console.log("Admin connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Admin disconnected:", socket.id);
  });
});

/* =====================================
   BASIC SECURITY
===================================== */

/*
  Hide Express Signature
*/
app.disable("x-powered-by");

/*
  Security Headers
*/
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

/* =====================================
   REQUEST LOGGING
===================================== */

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

/* =====================================
   GLOBAL RATE LIMITER
===================================== */

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minutes
  max: 200,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many requests. Please try again later.",
  },
});

app.use(globalLimiter);

/* =====================================
   CORS CONFIGURATION
===================================== */

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

/* =====================================
   BODY PARSER
===================================== */

app.use(
  express.json({
    limit: "10mb",
  })
);

/* =====================================
   MONGODB SANITIZATION
===================================== */

/*
  Prevent NoSQL Injection Attacks
*/
app.use((req, res, next) => {
  ["body", "params"].forEach((key) => {
    if (req[key]) {
      mongoSanitize.sanitize(req[key], {
        replaceWith: "_",
        allowDots: true,
      });
    }
  });

  next();
});

/* =====================================
   XSS PROTECTION
===================================== */

/*
  Prevent Cross Site Scripting
*/
const xss = require("xss");

const cleanXSS = (data) => {
  if (!data || typeof data !== "object") return;

  Object.keys(data).forEach((key) => {
    if (typeof data[key] === "string") {
      data[key] = xss(data[key]);
    } else if (typeof data[key] === "object") {
      cleanXSS(data[key]);
    }
  });
};

app.use((req, res, next) => {
  if (req.body) cleanXSS(req.body);
  if (req.params) cleanXSS(req.params);

  next();
});

/* =====================================
   HEALTH CHECK ROUTE
===================================== */

app.get("/", (req, res) => {
  res.send("Teeth & Gums Care API is running");
});

/* =====================================
   API ROUTES
===================================== */

app.use("/api/admin", adminRoutes);

app.use("/api/contact", contactRoutes);

app.use("/api/appointments", appointmentRoutes);

app.use("/api/blocked-slots", blockedSlotsRoutes);

app.use("/api/activity-logs", activityLogRoutes);

/* =====================================
   GLOBAL ERROR HANDLER
===================================== */

app.use(errorMiddleware);

/* =====================================
   SERVER CONFIGURATION
===================================== */

const PORT = process.env.PORT || 5000;

/* =====================================
   START SERVER
===================================== */

const startServer = async () => {
  try {
    /*
      Connect MongoDB
    */
    await connectDB();

    console.log(
      "Database connection established"
    );

    /*
      Create Default Admin
      Only if admin does not exist
    */
    await createDefaultAdmin();

    /*
      Start Appointment Reminder Cron Jobs
    */
    startReminderCron();

    /*
      Start Express Server
    */
    server.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Server startup failed:",
      error.message
    );

    process.exit(1);
  }
};

/* =====================================
   APPLICATION ENTRY POINT
===================================== */

startServer();