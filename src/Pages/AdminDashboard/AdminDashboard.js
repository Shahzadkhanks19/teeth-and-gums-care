import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../api/api";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./AdminDashboard.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

const SOCKET_URL = API_BASE_URL.replace("/api", "");

function AdminDashboard() {
  const navigate = useNavigate();

  const [blockedSlotsForDate, setBlockedSlotsForDate] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [appointments, setAppointments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [blockedSlots, setBlockedSlots] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [actionLoading, setActionLoading] = useState(false);
  const [cancelModal, setCancelModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleteMessageModal, setDeleteMessageModal] = useState(null);
  const [rescheduleModal, setRescheduleModal] = useState(null);
  const [viewAppointmentModal, setViewAppointmentModal] = useState(null);
  const [viewMessageModal, setViewMessageModal] = useState(null);

  const [cancelReason, setCancelReason] = useState("");

  const [rescheduleData, setRescheduleData] = useState({
    date: "",
    timeSlot: "",
    reason: "",
  });

  const [availabilityData, setAvailabilityData] = useState({
    date: "",
    timeSlot: "",
    type: "day",
    reason: "",
  });

  const [appointmentFilter, setAppointmentFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [messageSearchTerm, setMessageSearchTerm] = useState("");
  const [messageFilter, setMessageFilter] = useState("all");

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const token = localStorage.getItem("adminToken");
  const adminEmail = localStorage.getItem("adminEmail");

  const morningSlots = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
  ];

  const eveningSlots = [
    "05:30 PM",
    "06:00 PM",
    "06:30 PM",
    "07:00 PM",
    "07:30 PM",
    "08:00 PM",
  ];

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
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

  const playNotificationSound = () => {
    const audio = new Audio("/notification.mp3");
    audio.volume = 0.8;

    audio.play().catch(() => {
      console.log("Notification sound blocked by browser");
    });
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [appointmentsRes, contactsRes, blockedRes, activityLogsRes] =
        await Promise.all([
          fetch(`${API_BASE_URL}/appointments`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE_URL}/contact`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE_URL}/blocked-slots`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE_URL}/activity-logs`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

      const appointmentsData = await appointmentsRes.json();
      const contactsData = await contactsRes.json();
      const blockedData = await blockedRes.json();
      const activityLogsData = await activityLogsRes.json();

      if (appointmentsData.success) {
        setAppointments(appointmentsData.appointments);
      }

      if (contactsData.success) {
        setContacts(contactsData.contacts);
      }

      if (blockedData.success) {
        setBlockedSlots(blockedData.blockedSlots);
      }

      if (activityLogsData.success) {
        setActivityLogs(activityLogsData.logs);
      }
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const fetchBlockedSlotsForDate = async (date) => {
    if (!date) {
      setBlockedSlotsForDate([]);
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/blocked-slots/unavailable?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setBlockedSlotsForDate(data.unavailableSlots || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    const socket = io(SOCKET_URL);

    socket.on("connect", () => {
      console.log("Connected to real-time server");
    });

    socket.on("newAppointment", () => {
      playNotificationSound();
      toast.success("🔔 New appointment received");
      fetchDashboardData();
    });

    socket.on("appointmentUpdated", () => {
      fetchDashboardData();
    });

    socket.on("appointmentDeleted", () => {
      fetchDashboardData();
    });

    socket.on("newContactMessage", () => {
      playNotificationSound();
      toast.success("📩 New contact message received");
      fetchDashboardData();
    });

    socket.on("contactUpdated", () => {
      fetchDashboardData();
    });

    socket.on("contactDeleted", () => {
      fetchDashboardData();
    });

    socket.on("activityLogUpdated", () => {
      fetchDashboardData();
    });

    return () => {
      socket.disconnect();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const updateAppointmentStatus = async (id, status, reason = "") => {
    try {
      setActionLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/appointments/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
            cancelReason: reason,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to update appointment");
        return;
      }

      toast.success(`Appointment ${status} successfully`);
      setCancelModal(null);
      setCancelReason("");
      fetchDashboardData();
    } catch (error) {
      toast.error("Server error. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const rescheduleAppointment = async (id) => {
    if (!rescheduleData.date || !rescheduleData.timeSlot) {
      toast.error("Please select new date and time slot");
      return;
    }

    try {
      setActionLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/appointments/${id}/reschedule`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            date: rescheduleData.date,
            timeSlot: rescheduleData.timeSlot,
            rescheduleReason: rescheduleData.reason,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to reschedule appointment");
        return;
      }

      toast.success("Appointment rescheduled successfully");

      setRescheduleModal(null);
      setRescheduleData({
        date: "",
        timeSlot: "",
        reason: "",
      });

      fetchDashboardData();
    } catch (error) {
      toast.error("Server error. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      setActionLoading(true);

      const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to delete appointment");
        return;
      }

      toast.success("Appointment deleted successfully");
      setDeleteModal(null);
      fetchDashboardData();
    } catch (error) {
      toast.error("Server error");
    } finally {
      setActionLoading(false);
    }
  };

  const blockAvailability = async (e) => {
    e.preventDefault();

    if (!availabilityData.date) {
      toast.error("Please select a date");
      return;
    }

    if (availabilityData.type === "slot" && !availabilityData.timeSlot) {
      toast.error("Please select a time slot");
      return;
    }

    try {
      setActionLoading(true);

      const response = await fetch(`${API_BASE_URL}/blocked-slots`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(availabilityData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to block availability");
        return;
      }

      toast.success("Availability blocked successfully");

      setAvailabilityData({
        date: "",
        timeSlot: "",
        type: "day",
        reason: "",
      });

      setBlockedSlotsForDate([]);
      fetchDashboardData();
    } catch (error) {
      toast.error("Server error. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const removeBlockedSlot = async (id) => {
    try {
      setActionLoading(true);

      const response = await fetch(`${API_BASE_URL}/blocked-slots/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to remove block");
        return;
      }

      toast.success("Block removed successfully");
      fetchDashboardData();

      if (availabilityData.date) {
        fetchBlockedSlotsForDate(availabilityData.date);
      }
    } catch (error) {
      toast.error("Server error. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const updateMessageStatus = async (id, status) => {
    try {
      setActionLoading(true);

      const response = await fetch(`${API_BASE_URL}/contact/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to update message");
        return;
      }

      toast.success(`Message marked as ${status}`);
      fetchDashboardData();
    } catch (error) {
      toast.error("Server error");
    } finally {
      setActionLoading(false);
    }
  };

  const deleteContactMessage = async (id) => {
    try {
      setActionLoading(true);

      const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to delete message");
        return;
      }

      toast.success("Contact message deleted successfully");
      setDeleteMessageModal(null);
      fetchDashboardData();
    } catch (error) {
      toast.error("Server error");
    } finally {
      setActionLoading(false);
    }
  };

  const totalAppointments = appointments.length;

  const pendingAppointments = appointments.filter(
    (item) => item.status === "pending"
  ).length;

  const confirmedAppointments = appointments.filter(
    (item) => item.status === "confirmed"
  ).length;

  const cancelledAppointments = appointments.filter(
    (item) => item.status === "cancelled"
  ).length;

  const uniquePatients = [
    ...new Set(
      appointments.map((item) => item.phone?.trim() || item.email?.trim())
    ),
  ].filter(Boolean);

  const totalPatients = uniquePatients.length;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const newPatientsThisMonth = appointments.filter((item) => {
    const created = new Date(item.createdAt);

    return (
      created.getMonth() === currentMonth &&
      created.getFullYear() === currentYear
    );
  }).length;

  const returningPatients = totalAppointments - totalPatients;

  const drSunitaCount = appointments.filter(
    (item) => item.doctor === "Dr. Sunita Khetani"
  ).length;

  const drVishalCount = appointments.filter(
    (item) => item.doctor === "Dr. Vishal Khetani"
  ).length;

  const noPreferenceCount = appointments.filter(
    (item) => item.doctor === "No Preference"
  ).length;

  const filteredAppointments = appointments
    .filter((item) =>
      appointmentFilter === "all" ? true : item.status === appointmentFilter
    )
    .filter((item) => {
      const search = searchTerm.toLowerCase();

      return (
        item.name?.toLowerCase().includes(search) ||
        item.phone?.toLowerCase().includes(search) ||
        item.email?.toLowerCase().includes(search) ||
        item.service?.toLowerCase().includes(search) ||
        item.doctor?.toLowerCase().includes(search) ||
        item.status?.toLowerCase().includes(search)
      );
    });

  const filteredContacts = contacts
    .filter((item) =>
      messageFilter === "all" ? true : item.status === messageFilter
    )
    .filter((item) => {
      const search = messageSearchTerm.toLowerCase();

      return (
        item.name?.toLowerCase().includes(search) ||
        item.phone?.toLowerCase().includes(search) ||
        item.email?.toLowerCase().includes(search) ||
        item.message?.toLowerCase().includes(search) ||
        item.status?.toLowerCase().includes(search)
      );
    });

  const exportCSV = () => {
    if (filteredAppointments.length === 0) {
      toast.error("No appointments to export");
      return;
    }

    const rows = filteredAppointments.map((item) => ({
      Name: item.name,
      Phone: item.phone,
      Email: item.email,
      Service: item.service,
      Date: item.date,
      Time: item.timeSlot,
      Doctor: item.doctor,
      Status: item.status,
    }));

    const csvContent = [
      Object.keys(rows[0]).join(","),
      ...rows.map((row) =>
        Object.values(row)
          .map((value) => `"${String(value || "").replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "appointments.csv";
    link.click();

    toast.success("Appointments CSV exported");
  };

  const exportExcel = () => {
    if (filteredAppointments.length === 0) {
      toast.error("No appointments to export");
      return;
    }

    const rows = filteredAppointments.map((item) => ({
      Name: item.name,
      Phone: item.phone,
      Email: item.email,
      Service: item.service,
      Date: item.date,
      Time: item.timeSlot,
      Doctor: item.doctor,
      Status: item.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Appointments");
    XLSX.writeFile(workbook, "appointments.xlsx");

    toast.success("Appointments Excel exported");
  };

  const exportPDF = () => {
    if (filteredAppointments.length === 0) {
      toast.error("No appointments to export");
      return;
    }

    const doc = new jsPDF();

    doc.text("Appointments Report", 14, 15);

    autoTable(doc, {
      startY: 22,
      head: [["Name", "Phone", "Service", "Date", "Time", "Doctor", "Status"]],
      body: filteredAppointments.map((item) => [
        item.name,
        item.phone,
        item.service,
        item.date,
        item.timeSlot,
        item.doctor,
        item.status,
      ]),
    });

    doc.save("appointments.pdf");
    toast.success("Appointments PDF exported");
  };

  const exportContactsCSV = () => {
    if (filteredContacts.length === 0) {
      toast.error("No contact messages to export");
      return;
    }

    const rows = filteredContacts.map((item) => ({
      Name: item.name,
      Phone: item.phone,
      Email: item.email,
      Message: item.message,
      Status: item.status,
    }));

    const csvContent = [
      Object.keys(rows[0]).join(","),
      ...rows.map((row) =>
        Object.values(row)
          .map((value) => `"${String(value || "").replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "contact-messages.csv";
    link.click();

    toast.success("Contact messages CSV exported");
  };

  const exportContactsExcel = () => {
    if (filteredContacts.length === 0) {
      toast.error("No contact messages to export");
      return;
    }

    const rows = filteredContacts.map((item) => ({
      Name: item.name,
      Phone: item.phone,
      Email: item.email,
      Message: item.message,
      Status: item.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Contact Messages");
    XLSX.writeFile(workbook, "contact-messages.xlsx");

    toast.success("Contact messages Excel exported");
  };

  const exportContactsPDF = () => {
    if (filteredContacts.length === 0) {
      toast.error("No contact messages to export");
      return;
    }

    const doc = new jsPDF();

    doc.text("Contact Messages Report", 14, 15);

    autoTable(doc, {
      startY: 22,
      head: [["Name", "Phone", "Email", "Message", "Status"]],
      body: filteredContacts.map((item) => [
        item.name,
        item.phone,
        item.email,
        item.message,
        item.status,
      ]),
    });

    doc.save("contact-messages.pdf");
    toast.success("Contact messages PDF exported");
  };

  const isAvailabilitySunday = availabilityData.date
    ? new Date(availabilityData.date).getDay() === 0
    : false;

  const availableAdminSlots = isAvailabilitySunday
    ? morningSlots
    : [...morningSlots, ...eveningSlots];

  const isAdminPastSlot = (slot) => {
    const slotDateTime = convertSlotToDateTime(availabilityData.date, slot);
    return slotDateTime && slotDateTime <= new Date();
  };

  const availableAdminSlotsFiltered = availableAdminSlots.filter(
    (slot) => !blockedSlotsForDate.includes(slot) && !isAdminPastSlot(slot)
  );

  const statusChartData = [
    { name: "Pending", value: pendingAppointments },
    { name: "Confirmed", value: confirmedAppointments },
    { name: "Cancelled", value: cancelledAppointments },
    {
      name: "Rescheduled",
      value: appointments.filter((item) => item.status === "rescheduled")
        .length,
    },
  ];

  const monthlyChartData = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ].map((month, index) => ({
    month,
    appointments: appointments.filter((item) => {
      const created = new Date(item.createdAt);
      return (
        created.getMonth() === index && created.getFullYear() === currentYear
      );
    }).length,
  }));

  const chartColors = ["#f59e0b", "#16a34a", "#dc2626", "#4f46e5"];

  const changePassword = async (e) => {
    e.preventDefault();

    try {
      setActionLoading(true);

      const response = await fetch(`${API_BASE_URL}/admin/change-password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passwordData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to change password");
        return;
      }

      toast.success("Password changed successfully");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error("Failed to change password");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <i className="fa-solid fa-tooth"></i>

          <div>
            <h3>Admin Panel</h3>
            <p>Teeth & Gums Care</p>
          </div>
        </div>

        <nav className="admin-menu desktop-menu">
          <button
            className={activeTab === "dashboard" ? "active" : ""}
            onClick={() => setActiveTab("dashboard")}
          >
            <i className="fa-solid fa-chart-line"></i>
            Dashboard
          </button>

          <button
            className={activeTab === "appointments" ? "active" : ""}
            onClick={() => setActiveTab("appointments")}
          >
            <i className="fa-solid fa-calendar-check"></i>
            Appointments
          </button>

          <button
            className={activeTab === "messages" ? "active" : ""}
            onClick={() => setActiveTab("messages")}
          >
            <i className="fa-solid fa-envelope"></i>
            Messages
          </button>

          <button
            className={activeTab === "activity" ? "active" : ""}
            onClick={() => setActiveTab("activity")}
          >
            <i className="fa-solid fa-clock-rotate-left"></i>
            Activity Logs
          </button>

          <button
            className={activeTab === "availability" ? "active" : ""}
            onClick={() => setActiveTab("availability")}
          >
            <i className="fa-solid fa-calendar-xmark"></i>
            Availability
          </button>

          <button
            className={activeTab === "settings" ? "active" : ""}
            onClick={() => setActiveTab("settings")}
          >
            <i className="fa-solid fa-gear"></i>
            Settings
          </button>
        </nav>

        <div className="admin-mobile-nav">
          <button
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className="fa-solid fa-bars"></i>
            <span>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </span>
            <i
              className={`fa-solid fa-chevron-${
                mobileMenuOpen ? "up" : "down"
              }`}
            ></i>
          </button>

          <div
            className={`mobile-nav-dropdown ${mobileMenuOpen ? "show" : ""}`}
          >
            <button
              className={activeTab === "dashboard" ? "active" : ""}
              onClick={() => {
                setActiveTab("dashboard");
                setMobileMenuOpen(false);
              }}
            >
              <i className="fa-solid fa-chart-line"></i>
              Dashboard
            </button>

            <button
              className={activeTab === "appointments" ? "active" : ""}
              onClick={() => {
                setActiveTab("appointments");
                setMobileMenuOpen(false);
              }}
            >
              <i className="fa-solid fa-calendar-check"></i>
              Appointments
            </button>

            <button
              className={activeTab === "messages" ? "active" : ""}
              onClick={() => {
                setActiveTab("messages");
                setMobileMenuOpen(false);
              }}
            >
              <i className="fa-solid fa-envelope"></i>
              Messages
            </button>

            <button
              className={activeTab === "activity" ? "active" : ""}
              onClick={() => {
                setActiveTab("activity");
                setMobileMenuOpen(false);
              }}
            >
              <i className="fa-solid fa-clock-rotate-left"></i>
              Activity Logs
            </button>

            <button
              className={activeTab === "availability" ? "active" : ""}
              onClick={() => {
                setActiveTab("availability");
                setMobileMenuOpen(false);
              }}
            >
              <i className="fa-solid fa-calendar-xmark"></i>
              Availability
            </button>

            <button
              className={activeTab === "settings" ? "active" : ""}
              onClick={() => {
                setActiveTab("settings");
                setMobileMenuOpen(false);
              }}
            >
              <i className="fa-solid fa-gear"></i>
              Settings
            </button>
          </div>
        </div>

        <button className="admin-logout" onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket"></i>
          Logout
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1>Dashboard</h1>
            <p>Manage appointments, messages, and availability.</p>
          </div>

          <div className="admin-user">
            <i className="fa-solid fa-user-shield"></i>
            <span>{adminEmail}</span>
          </div>
        </header>

        {loading ? (
          <div className="admin-loading">Loading dashboard...</div>
        ) : (
          <>
            {activeTab === "dashboard" && (
              <>
                <section className="admin-stats-grid">
                  <div className="admin-stat-card">
                    <i className="fa-solid fa-calendar-days"></i>
                    <h2>{totalAppointments}</h2>
                    <p>Total Appointments</p>
                  </div>

                  <div className="admin-stat-card pending">
                    <i className="fa-solid fa-clock"></i>
                    <h2>{pendingAppointments}</h2>
                    <p>Pending</p>
                  </div>

                  <div className="admin-stat-card confirmed">
                    <i className="fa-solid fa-circle-check"></i>
                    <h2>{confirmedAppointments}</h2>
                    <p>Confirmed</p>
                  </div>

                  <div className="admin-stat-card cancelled">
                    <i className="fa-solid fa-circle-xmark"></i>
                    <h2>{cancelledAppointments}</h2>
                    <p>Cancelled</p>
                  </div>

                  <div className="admin-stat-card messages">
                    <i className="fa-solid fa-envelope-open-text"></i>
                    <h2>{contacts.length}</h2>
                    <p>Contact Messages</p>
                  </div>

                  <div className="admin-stat-card">
                    <i className="fa-solid fa-users"></i>
                    <h2>{totalPatients}</h2>
                    <p>Total Patients</p>
                  </div>

                  <div className="admin-stat-card">
                    <i className="fa-solid fa-user-plus"></i>
                    <h2>{newPatientsThisMonth}</h2>
                    <p>New This Month</p>
                  </div>

                  <div className="admin-stat-card">
                    <i className="fa-solid fa-repeat"></i>
                    <h2>{returningPatients}</h2>
                    <p>Returning Patients</p>
                  </div>

                  <div className="admin-stat-card">
                    <i className="fa-solid fa-user-doctor"></i>
                    <h2>{drSunitaCount}</h2>
                    <p>Dr Sunita</p>
                  </div>

                  <div className="admin-stat-card">
                    <i className="fa-solid fa-user-doctor"></i>
                    <h2>{drVishalCount}</h2>
                    <p>Dr Vishal</p>
                  </div>

                  <div className="admin-stat-card">
                    <i className="fa-solid fa-handshake"></i>
                    <h2>{noPreferenceCount}</h2>
                    <p>No Preference</p>
                  </div>
                </section>

                <section className="admin-charts-grid">
                  <div className="admin-chart-card">
                    <h2>Appointment Status</h2>

                    <ResponsiveContainer width="100%" height={280}>
                      <PieChart>
                        <Pie
                          data={statusChartData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={90}
                          label
                        >
                          {statusChartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={chartColors[index % chartColors.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="admin-chart-card">
                    <h2>Monthly Appointments</h2>

                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={monthlyChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="appointments" fill="#0d6efd" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </section>

                <section className="admin-panel-card">
                  <h2>Recent Appointments</h2>

                  <div className="admin-table-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Service</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {appointments.slice(0, 5).map((item) => (
                          <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.service}</td>
                            <td>{item.date}</td>
                            <td>{item.timeSlot}</td>

                            <td>
                              <span className={`status-badge ${item.status}`}>
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </>
            )}

            {activeTab === "appointments" && (
              <section className="admin-panel-card">
                <h2>All Appointments</h2>

                <div className="admin-search-export">
                  <input
                    type="text"
                    placeholder="Search by name, phone, email, service..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <button onClick={exportCSV}>CSV</button>
                  <button onClick={exportExcel}>Excel</button>
                  <button onClick={exportPDF}>PDF</button>
                </div>

                <div className="appointment-filter-bar">
                  {[
                    "all",
                    "pending",
                    "confirmed",
                    "rescheduled",
                    "cancelled",
                  ].map((status) => (
                    <button
                      key={status}
                      className={appointmentFilter === status ? "active" : ""}
                      onClick={() => setAppointmentFilter(status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Doctor</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredAppointments.map((item) => (
                        <tr key={item._id}>
                          <td>{item.name}</td>
                          <td>{item.phone}</td>
                          <td>{item.email}</td>
                          <td>{item.service}</td>
                          <td>{item.date}</td>
                          <td>{item.timeSlot}</td>
                          <td>{item.doctor}</td>

                          <td>
                            <span className={`status-badge ${item.status}`}>
                              {item.status}
                            </span>
                          </td>

                          <td>
                            <div className="admin-action-buttons">
                              <button
                                className="view-btn"
                                onClick={() => setViewAppointmentModal(item)}
                              >
                                View
                              </button>

                              {item.status === "pending" && (
                                <button
                                  className="confirm-btn"
                                  disabled={actionLoading}
                                  onClick={() =>
                                    updateAppointmentStatus(
                                      item._id,
                                      "confirmed"
                                    )
                                  }
                                >
                                  Confirm
                                </button>
                              )}

                              {item.status !== "cancelled" && (
                                <button
                                  className="reschedule-btn"
                                  disabled={actionLoading}
                                  onClick={() => {
                                    setRescheduleModal(item);
                                    setRescheduleData({
                                      date: item.date,
                                      timeSlot: item.timeSlot,
                                      reason: "",
                                    });
                                  }}
                                >
                                  Reschedule
                                </button>
                              )}

                              {item.status !== "cancelled" && (
                                <button
                                  className="cancel-btn"
                                  disabled={actionLoading}
                                  onClick={() => {
                                    setCancelModal(item);
                                    setCancelReason("");
                                  }}
                                >
                                  Cancel
                                </button>
                              )}

                              <button
                                className="delete-btn"
                                onClick={() => setDeleteModal(item)}
                              >
                                Delete
                              </button>

                              {item.status === "cancelled" && (
                                <span className="no-action-text">
                                  No actions
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {activeTab === "messages" && (
              <section className="admin-panel-card">
                <h2>Contact Messages</h2>

                <div className="admin-search-export">
                  <input
                    type="text"
                    placeholder="Search by name, phone, email, message..."
                    value={messageSearchTerm}
                    onChange={(e) => setMessageSearchTerm(e.target.value)}
                  />

                  <button onClick={exportContactsCSV}>CSV</button>
                  <button onClick={exportContactsExcel}>Excel</button>
                  <button onClick={exportContactsPDF}>PDF</button>
                </div>

                <div className="appointment-filter-bar">
                  {["all", "new", "read", "replied"].map((status) => (
                    <button
                      key={status}
                      className={messageFilter === status ? "active" : ""}
                      onClick={() => setMessageFilter(status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredContacts.map((item) => (
                        <tr key={item._id}>
                          <td>{item.name}</td>
                          <td>{item.phone}</td>
                          <td>{item.email}</td>
                          <td className="message-cell">{item.message}</td>

                          <td>
                            <span className={`status-badge ${item.status}`}>
                              {item.status}
                            </span>
                          </td>

                          <td>
                            <div className="admin-action-buttons">
                              <button
                                className="view-btn"
                                onClick={() => setViewMessageModal(item)}
                              >
                                View
                              </button>

                              {item.status === "new" && (
                                <button
                                  className="confirm-btn"
                                  onClick={() =>
                                    updateMessageStatus(item._id, "read")
                                  }
                                >
                                  Mark Read
                                </button>
                              )}

                              {item.status !== "replied" && (
                                <button
                                  className="reschedule-btn"
                                  onClick={() =>
                                    updateMessageStatus(item._id, "replied")
                                  }
                                >
                                  Mark Replied
                                </button>
                              )}

                              <button
                                className="delete-btn"
                                onClick={() => setDeleteMessageModal(item)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {activeTab === "activity" && (
              <section className="admin-panel-card">
                <h2>Activity Logs</h2>

                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Action</th>
                        <th>Details</th>
                        <th>Type</th>
                        <th>Date & Time</th>
                      </tr>
                    </thead>

                    <tbody>
                      {activityLogs.map((log) => (
                        <tr key={log._id}>
                          <td>{log.action}</td>

                          <td>{log.details}</td>

                          <td>
                            <span className="status-badge">{log.type}</span>
                          </td>

                          <td>{new Date(log.createdAt).toLocaleString()}</td>
                        </tr>
                      ))}

                      {activityLogs.length === 0 && (
                        <tr>
                          <td colSpan="4">No activity logs found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {activeTab === "availability" && (
              <section className="admin-panel-card">
                <h2>Manage Availability</h2>

                <form
                  className="availability-form"
                  onSubmit={blockAvailability}
                >
                  <div>
                    <label>Date</label>
                    <input
                      type="date"
                      min={getTodayDate()}
                      value={availabilityData.date}
                      onChange={(e) => {
                        setAvailabilityData({
                          ...availabilityData,
                          date: e.target.value,
                          timeSlot: "",
                        });

                        fetchBlockedSlotsForDate(e.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <label>Block Type</label>
                    <select
                      value={availabilityData.type}
                      onChange={(e) =>
                        setAvailabilityData({
                          ...availabilityData,
                          type: e.target.value,
                          timeSlot: "",
                        })
                      }
                    >
                      <option value="day">Full Day</option>
                      <option value="slot">Specific Slot</option>
                    </select>
                  </div>

                  {availabilityData.type === "slot" && (
                    <div>
                      <label>Select Slot</label>
                      <select
                        value={availabilityData.timeSlot}
                        onChange={(e) =>
                          setAvailabilityData({
                            ...availabilityData,
                            timeSlot: e.target.value,
                          })
                        }
                      >
                        <option value="">Select Slot</option>

                        {availableAdminSlotsFiltered.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}

                        {availableAdminSlotsFiltered.length === 0 && (
                          <option disabled>No available slots</option>
                        )}
                      </select>
                    </div>
                  )}

                  <div>
                    <label>Reason</label>
                    <input
                      type="text"
                      placeholder="Emergency / Holiday / Doctor unavailable"
                      value={availabilityData.reason}
                      onChange={(e) =>
                        setAvailabilityData({
                          ...availabilityData,
                          reason: e.target.value,
                        })
                      }
                    />
                  </div>

                  <button type="submit" disabled={actionLoading}>
                    {actionLoading ? "Blocking..." : "Block Availability"}
                  </button>
                </form>

                <div className="admin-table-wrapper mt-4">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Time Slot</th>
                        <th>Reason</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {blockedSlots.map((item) => (
                        <tr key={item._id}>
                          <td>{item.date}</td>
                          <td>
                            {item.type === "day" ? "Full Day" : "Specific Slot"}
                          </td>
                          <td>
                            {item.type === "day" ? "All Slots" : item.timeSlot}
                          </td>
                          <td>{item.reason || "No reason"}</td>
                          <td>
                            <button
                              className="cancel-btn"
                              disabled={actionLoading}
                              onClick={() => removeBlockedSlot(item._id)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}

                      {blockedSlots.length === 0 && (
                        <tr>
                          <td colSpan="5">No blocked availability found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {activeTab === "settings" && (
              <section className="admin-panel-card">
                <h2>Change Password</h2>

                <form className="password-form" onSubmit={changePassword}>
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                  />

                  <input
                    type="password"
                    placeholder="New Password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                  />

                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />

                  <button type="submit" disabled={actionLoading}>
                    {actionLoading ? "Updating..." : "Update Password"}
                  </button>
                </form>
              </section>
            )}
          </>
        )}
      </main>

      {cancelModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>Cancel Appointment</h3>

            <p>
              Are you sure you want to cancel appointment for{" "}
              <strong>{cancelModal.name}</strong>?
            </p>

            <textarea
              rows="4"
              placeholder="Enter cancellation reason"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            ></textarea>

            <div className="admin-modal-actions">
              <button
                className="modal-close-btn"
                disabled={actionLoading}
                onClick={() => setCancelModal(null)}
              >
                Close
              </button>

              <button
                className="cancel-btn"
                disabled={actionLoading}
                onClick={() =>
                  updateAppointmentStatus(
                    cancelModal._id,
                    "cancelled",
                    cancelReason
                  )
                }
              >
                {actionLoading ? "Cancelling..." : "Cancel Appointment"}
              </button>
            </div>
          </div>
        </div>
      )}

      {rescheduleModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>Reschedule Appointment</h3>

            <label>New Date</label>
            <input
              type="date"
              min={getTodayDate()}
              value={rescheduleData.date}
              onChange={(e) => {
                setRescheduleData({
                  ...rescheduleData,
                  date: e.target.value,
                  timeSlot: "",
                });

                fetchBlockedSlotsForDate(e.target.value);
              }}
            />

            <label>New Time Slot</label>

            <div className="reschedule-slot-grid">
              {(new Date(rescheduleData.date).getDay() === 0
                ? morningSlots
                : [...morningSlots, ...eveningSlots]
              )
                .filter(
                  (slot) =>
                    !blockedSlotsForDate.includes(slot) &&
                    !(
                      convertSlotToDateTime(rescheduleData.date, slot) <=
                      new Date()
                    )
                )
                .map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={
                      rescheduleData.timeSlot === slot
                        ? "reschedule-slot-btn active"
                        : "reschedule-slot-btn"
                    }
                    onClick={() =>
                      setRescheduleData({
                        ...rescheduleData,
                        timeSlot: slot,
                      })
                    }
                  >
                    {slot}
                  </button>
                ))}

              {rescheduleData.date &&
                (new Date(rescheduleData.date).getDay() === 0
                  ? morningSlots
                  : [...morningSlots, ...eveningSlots]
                ).filter(
                  (slot) =>
                    !blockedSlotsForDate.includes(slot) &&
                    !(
                      convertSlotToDateTime(rescheduleData.date, slot) <=
                      new Date()
                    )
                ).length === 0 && (
                  <p className="no-slots-text">
                    No available slots for this date.
                  </p>
                )}
            </div>

            <label>Reason</label>

            <textarea
              rows="4"
              placeholder="Reason for reschedule"
              value={rescheduleData.reason}
              onChange={(e) =>
                setRescheduleData({
                  ...rescheduleData,
                  reason: e.target.value,
                })
              }
            />

            <div className="admin-modal-actions">
              <button
                className="modal-close-btn"
                onClick={() => setRescheduleModal(null)}
              >
                Close
              </button>

              <button
                className="reschedule-btn"
                disabled={actionLoading}
                onClick={() => rescheduleAppointment(rescheduleModal._id)}
              >
                {actionLoading ? "Rescheduling..." : "Reschedule"}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>Delete Appointment</h3>

            <p>
              Are you sure you want to permanently delete appointment for
              <strong> {deleteModal.name}</strong>?
            </p>

            <p>This action cannot be undone.</p>

            <div className="admin-modal-actions">
              <button
                className="modal-close-btn"
                onClick={() => setDeleteModal(null)}
              >
                Cancel
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteAppointment(deleteModal._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteMessageModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>Delete Contact Message</h3>

            <p>
              Are you sure you want to permanently delete message from
              <strong> {deleteMessageModal.name}</strong>?
            </p>

            <p>This action cannot be undone.</p>

            <div className="admin-modal-actions">
              <button
                className="modal-close-btn"
                onClick={() => setDeleteMessageModal(null)}
              >
                Cancel
              </button>

              <button
                className="delete-btn"
                disabled={actionLoading}
                onClick={() => deleteContactMessage(deleteMessageModal._id)}
              >
                {actionLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {viewAppointmentModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>Appointment Details</h3>

            <div className="details-list">
              <p>
                <strong>Name:</strong> {viewAppointmentModal.name}
              </p>
              <p>
                <strong>Phone:</strong> {viewAppointmentModal.phone}
              </p>
              <p>
                <strong>Email:</strong> {viewAppointmentModal.email}
              </p>
              <p>
                <strong>Service:</strong> {viewAppointmentModal.service}
              </p>
              <p>
                <strong>Date:</strong> {viewAppointmentModal.date}
              </p>
              <p>
                <strong>Time:</strong> {viewAppointmentModal.timeSlot}
              </p>
              <p>
                <strong>Doctor:</strong> {viewAppointmentModal.doctor}
              </p>
              <p>
                <strong>Status:</strong> {viewAppointmentModal.status}
              </p>
              <p>
                <strong>Message:</strong>{" "}
                {viewAppointmentModal.message || "No message"}
              </p>
            </div>

            <div className="admin-modal-actions">
              <button
                className="modal-close-btn"
                onClick={() => setViewAppointmentModal(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {viewMessageModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>Contact Message</h3>

            <div className="details-list">
              <p>
                <strong>Name:</strong> {viewMessageModal.name}
              </p>
              <p>
                <strong>Phone:</strong> {viewMessageModal.phone}
              </p>
              <p>
                <strong>Email:</strong> {viewMessageModal.email}
              </p>
              <p>
                <strong>Status:</strong> {viewMessageModal.status}
              </p>
              <p>
                <strong>Message:</strong>
              </p>
              <p>{viewMessageModal.message}</p>
            </div>

            <div className="admin-modal-actions">
              <button
                className="modal-close-btn"
                onClick={() => setViewMessageModal(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;