/* =====================================
   BOOK APPOINTMENT PAGE IMPORTS
===================================== */

// React hooks
import React, { useEffect, useState } from "react";

// Page styles
import "./BookAppointment.css";

import SEO from "../../Components/SEO/SEO"

import servicesData from "../../data/serviceData";

// API base URL
import API_BASE_URL from "../../api/api";

// Toast notifications
import toast from "react-hot-toast";

// UI states
import EmptyState from "../../Components/UI/EmptyState";
import ErrorState from "../../Components/UI/ErrorState";

/* =====================================
   BOOK APPOINTMENT PAGE COMPONENT
===================================== */

function BookAppointment() {
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loading, setLoading] = useState(false);
  const [slotLoading, setSlotLoading] = useState(false);

  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [unavailableSlots, setUnavailableSlots] = useState([]);
  const [isFullDayBlocked, setIsFullDayBlocked] = useState(false);
  const [blockedReason, setBlockedReason] = useState("");
  const [blockedSlotReasons, setBlockedSlotReasons] = useState({});

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

  /* =====================================
     AVAILABLE CLINIC TIME SLOTS
  ====================================== */

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

  /* =====================================
     DATE + SLOT HELPERS
  ====================================== */

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

  /* =====================================
     FETCH UNAVAILABLE SLOTS
  ====================================== */

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
      toast.error("Failed to load available slots");
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
      isFullDayBlocked || unavailableSlots.includes(slot) || isPastSlot(slot)
    );
  };

  /* =====================================
     FORM VALIDATION
  ====================================== */

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

  /* =====================================
     FORM CHANGE HANDLERS
  ====================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSubmitError("");

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

  const handleDoctorSelect = (doctor) => {
    if (loading) return;

    setSubmitError("");
    setFormData({ ...formData, doctor });
    setErrors({ ...errors, doctor: "" });
  };

  const handleSlotClick = (slot) => {
    if (loading || isSlotUnavailable(slot)) return;

    setSubmitError("");
    setSelectedSlot(slot);
    setErrors({ ...errors, slot: "" });
  };

  /* =====================================
     SUBMIT APPOINTMENT REQUEST
  ====================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      toast.error("Please complete all required fields");
      return;
    }

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
        const errorMessage =
          data.message || "Unable to submit appointment request.";

        setSubmitError(errorMessage);
        toast.error(errorMessage);
        return;
      }

      toast.success("Appointment request submitted successfully!");

      setSuccess(true);

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
      const errorMessage = "Server error. Please try again later.";

      setSubmitError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /* =====================================
     SLOT BUTTON RENDERER
  ====================================== */

  const renderSlotButton = (slot) => {
    const unavailable = isSlotUnavailable(slot);
    const blockedReasonForSlot = blockedSlotReasons[slot];

    return (
      <button
        type="button"
        key={slot}
        disabled={unavailable || slotLoading || loading}
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

        {unavailable ? (
          <small
  title={blockedReasonForSlot}
>
  {isPastSlot(slot)
    ? "Time Passed"
    : blockedReasonForSlot
    ? `Blocked • ${blockedReasonForSlot}`
    : "Already Booked"}
</small>
        ) : (
          <small>Available</small>
        )}
      </button>
    );
  };

  /* =====================================
     SUCCESS STATE
  ====================================== */

  if (success) {
    return (
      <EmptyState
        icon="fa-solid fa-calendar-check"
        title="Appointment Request Submitted"
        message="Thank you for booking with Teeth & Gums Care. Our team will contact you shortly to confirm your appointment."
        buttonText="Book Another Appointment"
        onButtonClick={() => setSuccess(false)}
      />
    );
  }

  /* =====================================
     ERROR STATE
  ====================================== */

  if (submitError) {
    return (
      <ErrorState
        icon="fa-solid fa-circle-exclamation"
        title="Booking Failed"
        message={submitError}
        buttonText="Try Again"
        onButtonClick={() => setSubmitError("")}
      />
    );
  }

  return (
    <>

<SEO
  title="Book Dental Appointment in Jodhpur | Teeth and Gums Care"
  description="Book your dental appointment online with Teeth and Gums Care in Jodhpur. Choose your preferred doctor, date and available appointment slot."
  keywords="book dentist appointment Jodhpur, dental appointment Jodhpur, Teeth and Gums Care appointment, dentist booking Jodhpur"
/>

      {/* =====================================
          HERO SECTION
      ====================================== */}
      <section className="appointment-hero">
        <div className="appointment-hero-shape shape-one"></div>
        <div className="appointment-hero-shape shape-two"></div>

        <div className="container text-center" data-aos="fade-up">
          <span>Teeth & Gums Care</span>

          <h1>Book Appointment</h1>

          <p>
            Schedule your visit with our dental experts for comfortable,
            advanced, and personalized dental care.
          </p>

          <div className="appointment-hero-points">
            <div>
              <i className="fa-solid fa-circle-check"></i>
              Experienced Dentists
            </div>

            <div>
              <i className="fa-solid fa-circle-check"></i>
              Easy Slot Booking
            </div>

            <div>
              <i className="fa-solid fa-circle-check"></i>
              Patient First Care
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          APPOINTMENT STEPS
      ====================================== */}
      <section className="appointment-steps">
        <div className="container">
          <div className="steps-wrapper" data-aos="fade-up">
            <div className="step-item">
              <span>01</span>
              <p>Fill Details</p>
            </div>

            <div className="step-item">
              <span>02</span>
              <p>Choose Date</p>
            </div>

            <div className="step-item">
              <span>03</span>
              <p>Select Slot</p>
            </div>

            <div className="step-item">
              <span>04</span>
              <p>Submit Request</p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          APPOINTMENT FORM SECTION
      ====================================== */}
      <section className="appointment-section">
        <div className="container">
          <div className="row g-4 align-items-start">
            {/* LEFT INFO COLUMN */}
            <div className="col-lg-5" data-aos="fade-right">
              <div className="appointment-info-card">
                <span className="appointment-badge">Clinic Information</span>

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

                <div className="appointment-stats">
                  <div>
                    <h4>5000+</h4>
                    <p>Patients</p>
                  </div>

                  <div>
                    <h4>15+</h4>
                    <p>Services</p>
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

              <div className="appointment-summary-card" data-aos="fade-up">
                <h3>Appointment Summary</h3>

                <p>
                  <strong>Service:</strong>{" "}
                  {formData.service || "Not selected yet"}
                </p>

                <p>
                  <strong>Date:</strong> {formData.date || "Not selected yet"}
                </p>

                <p>
                  <strong>Time:</strong> {selectedSlot || "Not selected yet"}
                </p>

                <p>
                  <strong>Doctor:</strong>{" "}
                  {formData.doctor || "Not selected yet"}
                </p>
              </div>
            </div>

            {/* RIGHT FORM COLUMN */}
            <div className="col-lg-7" data-aos="fade-left">
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
                        disabled={loading}
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
                        disabled={loading}
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
                        disabled={loading}
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
  disabled={loading}
>
  <option value="">Select Service</option>

  {servicesData.map((service) => (
    <option key={service.slug} value={service.title}>
      {service.title}
    </option>
  ))}
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
                        disabled={loading}
                      />

                      {errors.date && (
                        <small className="form-error">{errors.date}</small>
                      )}
                    </div>

                    <div className="col-12 mb-4">
                      <label className="appointment-field-label">
                        Preferred Doctor
                      </label>

                      <div className="doctor-select-grid">
                        {[
                          "Dr. Sunita Khetani",
                          "Dr. Vishal Khetani",
                          "No Preference",
                        ].map((doctor) => (
                          <button
                            type="button"
                            key={doctor}
                            disabled={loading}
                            className={
                              formData.doctor === doctor
                                ? "doctor-select-card active-doctor"
                                : "doctor-select-card"
                            }
                            onClick={() => handleDoctorSelect(doctor)}
                          >
                            <i className="fa-solid fa-user-doctor"></i>
                            <span>{doctor}</span>
                          </button>
                        ))}
                      </div>

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
                              <div className="blocked-reason">
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
                        disabled={loading}
                      ></textarea>
                    </div>

                    <div className="col-12">
                      <button
                        type="submit"
                        className="appointment-submit"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <i className="fa-solid fa-spinner fa-spin me-2"></i>
                            Submitting Appointment...
                          </>
                        ) : (
                          <>
                            <i className="fa-solid fa-paper-plane me-2"></i>
                            Submit Appointment Request
                          </>
                        )}
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