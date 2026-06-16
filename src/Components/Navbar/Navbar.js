/* =====================================
   IMPORTS
===================================== */

import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import navlogo from "./Assets/logo.png";

/* =====================================
   NAVBAR COMPONENT
===================================== */

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* =====================================
          TOP HEADER BAR
      ====================================== */}
      <div className="top-bar">
        <div className="header-container">
          <div className="top-bar-inner">
            <div className="top-bar-left">
              <div className="info-item">
                <i className="fa-solid fa-location-dot"></i>
                <span>Pal Road, Jodhpur, Rajasthan</span>
              </div>

              <div className="top-bar-divider"></div>

              <div className="info-item top-bar-timing">
                <i className="fa-solid fa-clock"></i>
                <span>Mon–Sat 10am–3pm & 5:30pm–8:30pm | Sun 10am–3pm</span>
              </div>

              <div className="top-bar-divider top-bar-timing"></div>

              <div className="info-item">
                <i className="fa-solid fa-phone"></i>
                <a href="tel:+919829824356">+91 98298 24356</a>
              </div>
            </div>

            <div className="top-bar-right">
              <div className="info-item top-bar-email">
                <i className="fa-solid fa-envelope"></i>
                <a href="mailto:info@teethandgumscare.in">
                  info@teethandgumscare.in
                </a>
              </div>

              <div className="top-bar-divider top-bar-email"></div>

              <div className="top-bar-socials">
                <a href="#!" className="soc-btn" aria-label="Facebook">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>

                <a href="#!" className="soc-btn" aria-label="Instagram">
                  <i className="fa-brands fa-instagram"></i>
                </a>

                <a
                  href="https://wa.me/919829824356"
                  className="soc-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================
          MAIN NAVBAR
      ====================================== */}
      <nav className="main-navbar">
        <div className="header-container">
          <div className="nav-inner">
            {/* LOGO */}
            <Link
              className="navbar-brand"
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              <div className="logo-icon">
                <img
                  src={navlogo}
                  alt="Teeth & Gums Care"
                  className="logo-img"
                />
              </div>

              <div className="logo-content">
                <div className="logo-name">Teeth & Gums Care</div>
                <div className="logo-tagline">Dental Clinic · Jodhpur</div>
              </div>
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              className={`nav-toggler${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
              type="button"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            {/* NAV LINKS + CTA BUTTONS */}
            <div className={`nav-collapse${menuOpen ? " show" : ""}`}>
              <ul className="nav-menu">
                <li>
                  <NavLink
                    to="/"
                    end
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive ? "nav-link active-nav" : "nav-link"
                    }
                  >
                    Home
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/about"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive ? "nav-link active-nav" : "nav-link"
                    }
                  >
                    About
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/services"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive ? "nav-link active-nav" : "nav-link"
                    }
                  >
                    Services
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/gallery"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive ? "nav-link active-nav" : "nav-link"
                    }
                  >
                    Gallery
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/contact"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive ? "nav-link active-nav" : "nav-link"
                    }
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>

              <div className="nav-ctas">
                <a
                  href="https://wa.me/919829824356"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                  WhatsApp
                </a>

                <Link
                  to="/book-appointment"
                  className="btn-book"
                  onClick={() => setMenuOpen(false)}
                >
                  <i className="fa-solid fa-calendar-check"></i>
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;