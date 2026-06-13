const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const errorMiddleware = require("./middleware/errorMiddleware");
const { createDefaultAdmin } = require("./controllers/adminController");

const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const blockedSlotsRoutes = require("./routes/blockedSlotsRoutes");

dotenv.config();

const app = express();

connectDB();

createDefaultAdmin();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Teeth & Gums Care API is running");
});

app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/blocked-slots", blockedSlotsRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});