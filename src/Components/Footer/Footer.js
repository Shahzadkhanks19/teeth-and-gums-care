import React from "react";
import { Link } from "react-router-dom";
import "../Footer/Footer.css";
import navlogo from "./Assets/logo.png";

function Footer() {
  return (
    <footer className="footer mt-5">
      <div className="container">

        <div className="row">

          {/* About */}
          <div className="col-lg-4 col-md-6 mb-4">
            <a className="navbar-brand" href="/">
              <div className="logo-icon">
                <img src={navlogo} alt="Teeth & Gums Care" className="logo-img" />
              </div>
              <div>
                <div className="logo-name text-white">Teeth &amp; Gums Care</div>
                <div className="logo-tagline text-white">Dental Clinic · Jodhpur</div>
              </div>
            </a>

            <p className="footer-about mt-1">
              Providing advanced dental care with compassion,
              expertise, and modern technology. Our goal is to
              help every patient achieve a healthy and confident smile.
            </p>

    <div className="footer-highlights">
  <span>
    <i className="fa-solid fa-check"></i> Trusted Care
  </span>

  <span>
    <i className="fa-solid fa-check"></i> Modern Technology
  </span>

  <span>
    <i className="fa-solid fa-check"></i> Experienced Dentists
  </span>
</div>

            <div className="footer-social">
              <a href="/">
                <i className="fab fa-facebook-f"></i>
              </a>

              <a href="/">
                <i className="fab fa-instagram"></i>
              </a>

              <a href="/">
                <i className="fab fa-youtube"></i>
              </a>

              <a href="/">
                <i className="fab fa-google"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5>Quick Links</h5>

            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5>Our Services</h5>

            <ul className="footer-links">
              <li>Root Canal Treatment</li>
              <li>Dental Implants</li>
              <li>Teeth Whitening</li>
              <li>Clear Aligners</li>
              <li>Smile Designing</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5>Contact Info</h5>

            <div className="footer-contact">

              <p>
                <i className="fa-solid fa-location-dot"></i>
                Jodhpur, Rajasthan
              </p>

              <p>
                <i className="fa-solid fa-phone"></i>
                +91 XXXXX XXXXX
              </p>

              <p>
                <i className="fa-solid fa-envelope"></i>
                info@teethandgumscare.in
              </p>

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

        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">

          <p>
            © {new Date().getFullYear()} Teeth & Gums Care.
            All Rights Reserved.
          </p>

          <p>
            Designed & Developed by Teeth & Gums Care
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;