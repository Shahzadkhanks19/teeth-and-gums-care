import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../api/api";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [appointments, setAppointments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [blockedSlots, setBlockedSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoading] = useState(false);
  const [cancelModal, setCancelModal] = useState(null);
  const [rescheduleModal, setRescheduleModal] = useState(null);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  const token = localStorage.getItem("adminToken");
  const adminEmail = localStorage.getItem("adminEmail");

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  const showError = (text) => {
    setErrorMessage(text);
    setTimeout(() => setErrorMessage(""), 3000);
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [appointmentsRes, contactsRes, blockedRes] = await Promise.all([
        fetch(`${API_BASE_URL}/appointments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),

        fetch(`${API_BASE_URL}/contact`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),

        fetch(`${API_BASE_URL}/blocked-slots`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const appointmentsData = await appointmentsRes.json();
      const contactsData = await contactsRes.json();
      const blockedData = await blockedRes.json();

      if (appointmentsData.success) {
        setAppointments(appointmentsData.appointments);
      }

      if (contactsData.success) {
        setContacts(contactsData.contacts);
      }

      if (blockedData.success) {
        setBlockedSlots(blockedData.blockedSlots);
      }
    } catch (error) {
      showError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    navigate("/admin/login");
  };

  const updateAppointmentStatus = async (id, status, reason = "") => {
    try {
      setActionLoading(true);

      const response = await fetch(`${API_BASE_URL}/appointments/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status,
          cancelReason: reason,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showError(data.message || "Failed to update appointment");
        return;
      }

      showMessage(`Appointment ${status} successfully`);

      setCancelModal(null);
      setCancelReason("");

      fetchDashboardData();
    } catch (error) {
      showError("Server error. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const rescheduleAppointment = async (id) => {
    if (!rescheduleData.date || !rescheduleData.timeSlot) {
      showError("Please enter new date and time slot");
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
        showError(data.message || "Failed to reschedule appointment");
        return;
      }

      showMessage("Appointment rescheduled successfully");

      setRescheduleModal(null);

      setRescheduleData({
        date: "",
        timeSlot: "",
        reason: "",
      });

      fetchDashboardData();
    } catch (error) {
      showError("Server error. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const blockAvailability = async (e) => {
    e.preventDefault();

    if (!availabilityData.date) {
      showError("Please select a date");
      return;
    }

    if (availabilityData.type === "slot" && !availabilityData.timeSlot) {
      showError("Please enter a time slot");
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
        showError(data.message || "Failed to block availability");
        return;
      }

      showMessage("Availability blocked successfully");

      setAvailabilityData({
        date: "",
        timeSlot: "",
        type: "day",
        reason: "",
      });

      fetchDashboardData();
    } catch (error) {
      showError("Server error. Please try again.");
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
        showError(data.message || "Failed to remove block");
        return;
      }

      showMessage("Block removed successfully");
      fetchDashboardData();
    } catch (error) {
      showError("Server error. Please try again.");
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

  return (
    <div className="admin-dashboard">
      {message && <div className="admin-toast success">{message}</div>}
      {errorMessage && <div className="admin-toast error">{errorMessage}</div>}

      <aside className="admin-sidebar">
        <div className="admin-logo">
          <i className="fa-solid fa-tooth"></i>

          <div>
            <h3>Admin Panel</h3>
            <p>Teeth & Gums Care</p>
          </div>
        </div>

        <nav className="admin-menu">
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
            className={activeTab === "availability" ? "active" : ""}
            onClick={() => setActiveTab("availability")}
          >
            <i className="fa-solid fa-calendar-xmark"></i>
            Availability
          </button>
        </nav>

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
                      {appointments.map((item) => (
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

                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {contacts.map((item) => (
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {activeTab === "availability" && (
              <section className="admin-panel-card">
                <h2>Manage Availability</h2>

                <form className="availability-form" onSubmit={blockAvailability}>
                  <div>
                    <label>Date</label>
                    <input
                      type="date"
                      value={availabilityData.date}
                      onChange={(e) =>
                        setAvailabilityData({
                          ...availabilityData,
                          date: e.target.value,
                        })
                      }
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
                      <label>Time Slot</label>
                      <input
                        type="text"
                        placeholder="Example: 06:30 PM"
                        value={availabilityData.timeSlot}
                        onChange={(e) =>
                          setAvailabilityData({
                            ...availabilityData,
                            timeSlot: e.target.value,
                          })
                        }
                      />
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
                          <td>{item.type === "day" ? "Full Day" : "Slot"}</td>
                          <td>{item.timeSlot || "All Slots"}</td>
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
              value={rescheduleData.date}
              onChange={(e) =>
                setRescheduleData({
                  ...rescheduleData,
                  date: e.target.value,
                })
              }
            />

            <label>New Time Slot</label>
            <input
              type="text"
              placeholder="Example: 06:30 PM"
              value={rescheduleData.timeSlot}
              onChange={(e) =>
                setRescheduleData({
                  ...rescheduleData,
                  timeSlot: e.target.value,
                })
              }
            />

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
            ></textarea>

            <div className="admin-modal-actions">
              <button
                className="modal-close-btn"
                disabled={actionLoading}
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
    </div>
  );
}

export default AdminDashboard;