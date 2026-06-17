/* =====================================
   CONTACT PAGE IMPORTS
===================================== */

// React hooks
import React, { useState } from "react";

import SEO from "../../Components/SEO/SEO"

// Page styles
import "./Contact.css";

// API base URL
import API_BASE_URL from "../../api/api";

// Toast notifications
import toast from "react-hot-toast";

// UI states
import EmptyState from "../../Components/UI/EmptyState";

/* =====================================
   CONTACT PAGE COMPONENT
===================================== */

function Contact() {
  /* =====================================
     FORM STATE
  ====================================== */

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  /* =====================================
     FORM VALIDATION
  ====================================== */

  const validateForm = () => {
    const newErrors = {};
    const indianPhoneRegex = /^[6-9]\d{9}$/;

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name should be at least 2 characters";
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

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* =====================================
     HANDLE INPUT CHANGE
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

    setErrors({ ...errors, [name]: "" });
  };

  /* =====================================
     HANDLE FORM SUBMIT
  ====================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      toast.error("Please fix the highlighted fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone,
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message || "Failed to submit message";
        setSubmitError(errorMessage);
        toast.error(errorMessage);
        return;
      }

      toast.success("Thank you! Your message has been sent successfully.");

      setSuccess(true);

      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });

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
     SUCCESS STATE
  ====================================== */

  if (success) {
    return (
      <EmptyState
        icon="fa-solid fa-circle-check"
        title="Message Sent Successfully"
        message="Thank you for contacting Teeth & Gums Care. Our team will get back to you shortly."
        buttonText="Send Another Message"
        onButtonClick={() => setSuccess(false)}
      />
    );
  }

  return (
    <>

    <SEO
  title="Contact Teeth and Gums Care | Dental Clinic in Jodhpur"
  description="Contact Teeth and Gums Care dental clinic in Jodhpur for appointments, clinic timings, location details and dental treatment enquiries."
  keywords="contact dentist Jodhpur, dental clinic contact Jodhpur, Teeth and Gums Care contact, dentist Shastri Nagar Jodhpur"
/>
      {/* =====================================
          HERO SECTION
      ====================================== */}
      <section className="contact-hero">
        <div className="container text-center" data-aos="fade-up">
          <span className="contact-hero-badge">Teeth & Gums Care</span>

          <h1>Contact Us</h1>

          <p>We're here to help you achieve a healthy, confident smile.</p>
        </div>
      </section>

      {/* =====================================
          CONTACT FORM + INFO SECTION
      ====================================== */}
      <section className="contact-section">
        <div className="container">
          <div className="row g-4">
            {/* Contact Info */}
            <div className="col-lg-5" data-aos="fade-right">
              <div className="contact-info-card">
                <h2>Get In Touch</h2>

                <div className="contact-item">
                  <i className="fa-solid fa-location-dot"></i>

                  <div>
                    <h6>Address</h6>
                    <p>
                      Teeth & Gums Care
                      <br />
                      Pal Road, Jodhpur, Rajasthan
                    </p>
                  </div>
                </div>

                <div className="contact-item">
                  <i className="fa-solid fa-phone"></i>

                  <div>
                    <h6>Phone</h6>
                    <p>+91 98298 24356</p>
                  </div>
                </div>

                <div className="contact-item">
                  <i className="fa-solid fa-envelope"></i>

                  <div>
                    <h6>Email</h6>
                    <p>info@teethandgumscare.in</p>
                  </div>
                </div>

                <div className="contact-item">
                  <i className="fa-solid fa-clock"></i>

                  <div>
                    <h6>Clinic Hours</h6>
                    <p>
                      Mon–Sat: 10AM–3PM & 5:30PM–8:30PM
                      <br />
                      Sun: 10AM–3PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-7" data-aos="fade-left">
              <div className="contact-form-card">
                <div className="response-badge">
                  <i className="fa-solid fa-clock me-2"></i>
                  Average Response Time: Under 24 Hours
                </div>

                <h2>Send Us a Message</h2>

                <p className="subtitle">
                  Have questions about our treatments or want to schedule an
                  appointment? Fill out the form below and our team will get
                  back to you shortly.
                </p>

                {submitError && (
                  <div className="contact-error-alert">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    {submitError}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="input-group-custom">
                    <i className="fa-solid fa-user"></i>

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

                  <div className="input-group-custom">
                    <i className="fa-solid fa-phone"></i>

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

                  <div className="input-group-custom">
                    <i className="fa-solid fa-envelope"></i>

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

                  <div className="input-group-custom">
                    <i className="fa-solid fa-comment-medical"></i>

                    <textarea
                      rows="5"
                      name="message"
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={handleChange}
                      disabled={loading}
                    ></textarea>

                    {errors.message && (
                      <small className="form-error">{errors.message}</small>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="contact-submit-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin me-2"></i>
                        Sending...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-paper-plane me-2"></i>
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          WHY VISIT SECTION
      ====================================== */}
      <section className="why-visit">
        <div className="container">
          <div className="text-center section-heading" data-aos="fade-up">
            <span className="contact-section-badge">Why Visit Us</span>

            <h2>Why Visit Teeth & Gums Care?</h2>

            <p>Trusted dental solutions for every smile.</p>
          </div>

          <div className="row g-4">
            <div className="col-md-3 col-6" data-aos="zoom-in">
              <div className="visit-card">
                <i className="fa-solid fa-user-doctor"></i>
                <h5>Experienced Dentists</h5>
              </div>
            </div>

            <div
              className="col-md-3 col-6"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <div className="visit-card">
                <i className="fa-solid fa-tooth"></i>
                <h5>Advanced Treatments</h5>
              </div>
            </div>

            <div
              className="col-md-3 col-6"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="visit-card">
                <i className="fa-solid fa-heart"></i>
                <h5>Patient-Centered Care</h5>
              </div>
            </div>

            <div
              className="col-md-3 col-6"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <div className="visit-card">
                <i className="fa-solid fa-shield-heart"></i>
                <h5>Comfort & Safety</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          MAP SECTION
      ====================================== */}
      <section className="map-section" data-aos="fade-up">
        <iframe
          title="Teeth & Gums Care Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.637792058533!2d73.0042884!3d26.2734165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418d34fadbdd11%3A0x664ab9eb47182845!2sTeeth%20and%20Gums%20Care%20Dental%20Clinic%20in%20jodhpur!5e0!3m2!1sen!2sin!4v1781185522279!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      {/* =====================================
          CTA SECTION
      ====================================== */}
      <section className="contact-cta">
        <div className="container text-center" data-aos="zoom-in">
          <span className="contact-cta-badge">Book Your Visit Today</span>

          <h2>Ready To Book Your Appointment?</h2>

          <p>
            Schedule your consultation today and take the first step towards a
            healthier smile.
          </p>

          <div className="cta-buttons">
            <a href="tel:+919829824356" className="cta-call">
              <i className="fa-solid fa-phone me-2"></i>
              Call Now
            </a>

            <a
              href="https://wa.me/919829824356"
              className="cta-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-whatsapp me-2"></i>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;