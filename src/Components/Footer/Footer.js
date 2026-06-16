/* =====================================
   IMPORTS
===================================== */

import React from "react";
import { Link } from "react-router-dom";
import "../Footer/Footer.css";
import navlogo from "./Assets/logo.png";

/* =====================================
   FOOTER COMPONENT
===================================== */

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-bg-shape footer-shape-one"></div>
      <div className="footer-bg-shape footer-shape-two"></div>

      <div className="container">
        {/* =====================================
            FOOTER TOP GRID
        ====================================== */}
        <div className="footer-grid">
          {/* =====================================
              BRAND / ABOUT SECTION
          ====================================== */}
          <div className="footer-brand">
            <Link className="footer-logo" to="/">
              <div className="footer-logo-icon">
                <img
                  src={navlogo}
                  alt="Teeth & Gums Care"
                  className="footer-logo-img"
                />
              </div>

              <div>
                <div className="footer-logo-name">Teeth &amp; Gums Care</div>
                <div className="footer-logo-tagline">
                  Dental Clinic · Jodhpur
                </div>
              </div>
            </Link>

            <p className="footer-about">
              Providing advanced dental care with compassion, expertise, and
              modern technology. Our goal is to help every patient achieve a
              healthy and confident smile.
            </p>

            <div className="footer-highlights">
              <span>
                <i className="fa-solid fa-check"></i>
                Trusted Care
              </span>

              <span>
                <i className="fa-solid fa-check"></i>
                Modern Technology
              </span>

              <span>
                <i className="fa-solid fa-check"></i>
                Experienced Dentists
              </span>
            </div>

            <div className="footer-social">
              <a href="#!" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </a>

              <a href="#!" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>

              <a
                href="https://wa.me/919829824356"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>

              <a href="#!" aria-label="Google">
                <i className="fa-brands fa-google"></i>
              </a>
            </div>
          </div>

          {/* =====================================
              QUICK LINKS
          ====================================== */}
          <div className="footer-column">
            <h5>Quick Links</h5>

            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/about">About Us</Link>
              </li>

              <li>
                <Link to="/services">Services</Link>
              </li>

              <li>
                <Link to="/gallery">Gallery</Link>
              </li>

              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* =====================================
              SERVICES
          ====================================== */}
          <div className="footer-column">
            <h5>Our Services</h5>

            <ul className="footer-links footer-service-list">
              <li>Root Canal Treatment</li>
              <li>Dental Implants</li>
              <li>Teeth Whitening</li>
              <li>Clear Aligners</li>
              <li>Smile Designing</li>
            </ul>
          </div>

          {/* =====================================
              CONTACT INFORMATION
          ====================================== */}
          <div className="footer-column footer-contact-column">
            <h5>Contact Info</h5>

            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <i className="fa-solid fa-location-dot"></i>

                <div>
                  <span>Address</span>
                  <p>Pal Road, Jodhpur, Rajasthan</p>
                </div>
              </div>

              <div className="footer-contact-item">
                <i className="fa-solid fa-phone"></i>

                <div>
                  <span>Phone</span>
                  <p>
                    <a href="tel:+919829824356">+91 98298 24356</a>
                  </p>
                </div>
              </div>

              <div className="footer-contact-item">
                <i className="fa-solid fa-envelope"></i>

                <div>
                  <span>Email</span>
                  <p>
                    <a href="mailto:info@teethandgumscare.in">
                      info@teethandgumscare.in
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="footer-hours">
              <div className="hours-heading">
                <i className="fa-solid fa-clock"></i>
                <span>Clinic Hours</span>
              </div>

              <div className="hours-item">
                <span>Mon - Sat</span>
                <strong>
                  10:00 AM - 3:00 PM
                  <br />
                  5:30 PM - 8:30 PM
                </strong>
              </div>

              <div className="hours-item">
                <span>Sunday</span>
                <strong>10:00 AM - 3:00 PM</strong>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================
            FOOTER CTA STRIP
        ====================================== */}
        <div className="footer-cta-strip">
          <div>
            <span>Need dental help?</span>
            <h4>Book your appointment today</h4>
          </div>

          <div className="footer-cta-actions">
            <Link to="/book-appointment" className="footer-book-btn">
              Book Appointment
            </Link>

            <a href="tel:+919829824356" className="footer-call-btn">
              Call Now
            </a>
          </div>
        </div>

        {/* =====================================
            COPYRIGHT SECTION
        ====================================== */}
        <div className="footer-bottom">
          <p>© {currentYear} Teeth &amp; Gums Care. All Rights Reserved.</p>

          <p>Designed & Developed by Shahzad Khan</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;