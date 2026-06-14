import React, { useEffect, useState } from "react";
import "./BookAppointment.css";
import API_BASE_URL from "../../api/api";

function BookAppointment() {
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loading, setLoading] = useState(false);
  const [slotLoading, setSlotLoading] = useState(false);

  const [unavailableSlots, setUnavailableSlots] = useState([]);
  const [isFullDayBlocked, setIsFullDayBlocked] = useState(false);
  const [blockedReason, setBlockedReason] = useState("");
  const [blockedSlotReasons, setBlockedSlotReasons] = useState({});

  const [customAlert, setCustomAlert] = useState({
    show: false,
    type: "",
    message: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    doctor: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

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

  const isSunday = formData.date
    ? new Date(formData.date).getDay() === 0
    : false;

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

  const isPastSlot = (slot) => {
    if (!formData.date) return false;

    const slotDateTime = convertSlotToDateTime(formData.date, slot);

    return slotDateTime && slotDateTime <= new Date();
  };

  const showAlert = (type, message) => {
    setCustomAlert({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setCustomAlert({
        show: false,
        type: "",
        message: "",
      });
    }, 3500);
  };

  const fetchUnavailableSlots = async (date) => {
    if (!date) return;

    try {
      setSlotLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/blocked-slots/unavailable?date=${date}`
      );

      const data = await response.json();

      if (data.success) {
        setUnavailableSlots(data.unavailableSlots || []);
        setIsFullDayBlocked(data.isFullDayBlocked || false);

        const fullDayBlock = data.blockedSlots?.find(
          (item) => item.type === "day"
        );

        setBlockedReason(data.fullDayReason || fullDayBlock?.reason || "");

        const reasonsMap = {};

        data.blockedSlots
          ?.filter((item) => item.type === "slot")
          .forEach((item) => {
            reasonsMap[item.timeSlot] = item.reason;
          });

        setBlockedSlotReasons(reasonsMap);
      }
    } catch (error) {
      showAlert("error", "Failed to load available slots");
    } finally {
      setSlotLoading(false);
    }
  };

  useEffect(() => {
    if (formData.date) {
      fetchUnavailableSlots(formData.date);
    } else {
      setUnavailableSlots([]);
      setIsFullDayBlocked(false);
      setBlockedReason("");
      setBlockedSlotReasons({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.date]);

  const isSlotUnavailable = (slot) => {
    return (
      isFullDayBlocked ||
      unavailableSlots.includes(slot) ||
      isPastSlot(slot)
    );
  };

  const validateForm = () => {
    const newErrors = {};
    const indianPhoneRegex = /^[6-9]\d{9}$/;

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!indianPhoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.service) {
      newErrors.service = "Please select a service";
    }

    if (!formData.date) {
      newErrors.date = "Please select a date";
    }

    if (!formData.doctor) {
      newErrors.doctor = "Please select preferred doctor";
    }

    if (isFullDayBlocked) {
      newErrors.slot = "Appointments are closed for this date.";
    } else if (!selectedSlot) {
      newErrors.slot = "Please select a time slot";
    } else if (isSlotUnavailable(selectedSlot)) {
      newErrors.slot = "This slot is already booked, blocked, or passed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const onlyNums = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, phone: onlyNums });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (name === "date") {
      setSelectedSlot("");
      setUnavailableSlots([]);
      setIsFullDayBlocked(false);
      setBlockedReason("");
      setBlockedSlotReasons({});
    }

    setErrors({ ...errors, [name]: "" });
  };

  const handleSlotClick = (slot) => {
    if (isSlotUnavailable(slot)) return;

    setSelectedSlot(slot);
    setErrors({ ...errors, slot: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const appointmentData = {
      ...formData,
      timeSlot: selectedSlot,
    };

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      const data = await response.json();

      if (!response.ok) {
        showAlert("error", data.message || "Failed to book appointment");
        return;
      }

      showAlert("success", "Appointment request submitted successfully!");

      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        date: "",
        doctor: "",
        message: "",
      });

      setSelectedSlot("");
      setUnavailableSlots([]);
      setIsFullDayBlocked(false);
      setBlockedReason("");
      setBlockedSlotReasons({});
      setErrors({});
    } catch (error) {
      showAlert("error", "Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const renderSlotButton = (slot) => {
    const unavailable = isSlotUnavailable(slot);
    const blockedReasonForSlot = blockedSlotReasons[slot];

    return (
      <button
        type="button"
        key={slot}
        disabled={unavailable || slotLoading}
        className={
          unavailable
            ? "slot-btn booked-slot"
            : selectedSlot === slot
            ? "slot-btn active-slot"
            : "slot-btn"
        }
        onClick={() => handleSlotClick(slot)}
      >
        <span>{slot}</span>

        {unavailable && (
          <small>
            {isPastSlot(slot)
              ? "Time passed"
              : blockedReasonForSlot
              ? `Blocked: ${blockedReasonForSlot}`
              : "Booked"}
          </small>
        )}
      </button>
    );
  };

  return (
    <>
      {customAlert.show && (
        <div className={`appointment-alert ${customAlert.type}`}>
          <i
            className={
              customAlert.type === "success"
                ? "fa-solid fa-circle-check"
                : "fa-solid fa-circle-xmark"
            }
          ></i>
          <span>{customAlert.message}</span>
        </div>
      )}

      <section className="appointment-hero">
        <div className="container text-center">
          <span>Teeth & Gums Care</span>
          <h1>Book Appointment</h1>
          <p>
            Schedule your visit with our dental experts for comfortable and
            personalized care.
          </p>
        </div>
      </section>

      <section className="appointment-section">
        <div className="container">
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-5">
              <div className="appointment-info-card">
                <h2>Clinic Details</h2>

                <div className="appointment-info-item">
                  <i className="fa-solid fa-location-dot"></i>
                  <div>
                    <h5>Address</h5>
                    <p>Pal Road, Jodhpur, Rajasthan</p>
                  </div>
                </div>

                <div className="appointment-info-item">
                  <i className="fa-solid fa-phone"></i>
                  <div>
                    <h5>Phone</h5>
                    <p>+91 98298 24356</p>
                  </div>
                </div>

                <div className="appointment-info-item">
                  <i className="fa-solid fa-clock"></i>
                  <div>
                    <h5>Clinic Hours</h5>
                    <p>
                      Mon–Sat: 10:00 AM – 3:00 PM
                      <br />
                      5:30 PM – 8:30 PM
                      <br />
                      Sun: 10:00 AM – 3:00 PM
                    </p>
                  </div>
                </div>

                <a
                  href="https://wa.me/919829824356"
                  target="_blank"
                  rel="noreferrer"
                  className="appointment-whatsapp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="appointment-form-card">
                <span className="appointment-badge">
                  <i className="fa-solid fa-calendar-check me-2"></i>
                  Request Appointment
                </span>

                <h2>Fill Your Details</h2>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <small className="form-error">{errors.name}</small>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Indian Mobile Number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      {errors.phone && (
                        <small className="form-error">{errors.phone}</small>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <small className="form-error">{errors.email}</small>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                      >
                        <option value="">Select Service</option>
                        <option>Root Canal Treatment</option>
                        <option>Dental Implants</option>
                        <option>Teeth Cleaning</option>
                        <option>Teeth Whitening</option>
                        <option>Smile Designing</option>
                        <option>Gum Treatment</option>
                        <option>Dental Veneers</option>
                        <option>Tooth Extraction</option>
                      </select>
                      {errors.service && (
                        <small className="form-error">{errors.service}</small>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="appointment-field-label">
                        Select Appointment Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        min={getTodayDate()}
                        value={formData.date}
                        onChange={handleChange}
                      />
                      {errors.date && (
                        <small className="form-error">{errors.date}</small>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <select
                        name="doctor"
                        value={formData.doctor}
                        onChange={handleChange}
                      >
                        <option value="">Preferred Doctor</option>
                        <option>Dr. Sunita Khetani</option>
                        <option>Dr. Vishal Khetani</option>
                        <option>No Preference</option>
                      </select>
                      {errors.doctor && (
                        <small className="form-error">{errors.doctor}</small>
                      )}
                    </div>

                    <div className="col-12 mb-4">
                      <div className="slot-status-row">
                        <h5 className="slot-heading">Morning Slots</h5>

                        {slotLoading && (
                          <span className="slot-loading">
                            Checking availability...
                          </span>
                        )}
                      </div>

                      {isFullDayBlocked && (
                        <div className="clinic-closed-note">
                          <i className="fa-solid fa-circle-exclamation"></i>

                          <div>
                            <strong>
                              Appointments are closed for this date.
                            </strong>

                            {blockedReason && (
                              <div style={{ marginTop: "6px" }}>
                                Reason: {blockedReason}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="slot-wrapper">
                        {morningSlots.map((slot) => renderSlotButton(slot))}
                      </div>

                      {!isSunday && (
                        <>
                          <h5 className="slot-heading mt-4">Evening Slots</h5>

                          <div className="slot-wrapper">
                            {eveningSlots.map((slot) =>
                              renderSlotButton(slot)
                            )}
                          </div>
                        </>
                      )}

                      {isSunday && (
                        <p className="sunday-note">
                          Sunday clinic hours are 10:00 AM – 3:00 PM only.
                        </p>
                      )}

                      {errors.slot && (
                        <small className="form-error">{errors.slot}</small>
                      )}
                    </div>

                    <div className="col-12 mb-3">
                      <textarea
                        rows="4"
                        name="message"
                        placeholder="Message / Dental Concern"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <div className="col-12">
                      <button
                        type="submit"
                        className="appointment-submit"
                        disabled={loading}
                      >
                        <i className="fa-solid fa-paper-plane me-2"></i>
                        {loading
                          ? "Submitting..."
                          : "Submit Appointment Request"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BookAppointment;