/* =====================================
   SERVICES PAGE IMPORTS
===================================== */

// React + routing
import React from "react";
import { Link } from "react-router-dom";

// Page styles
import "./Services.css";

// Services data
import servicesData from "../../data/serviceData";

/* =====================================
   SERVICES PAGE COMPONENT
===================================== */

function Services() {
  return (
    <>
      {/* =====================================
          HERO SECTION
      ====================================== */}
      <section className="services-hero">
        <div className="services-hero-shape shape-one"></div>
        <div className="services-hero-shape shape-two"></div>

        <div className="container text-center services-hero-content" data-aos="fade-up">
          <span className="services-tag">Advanced Dental Care</span>

          <h1>Our Dental Services</h1>

          <p>
            Comprehensive dental treatments designed to keep your smile healthy,
            beautiful, comfortable, and confident.
          </p>

          <div className="services-hero-actions">
            <Link to="/book-appointment" className="services-primary-btn">
              Book Appointment
            </Link>

            <Link to="/contact" className="services-outline-btn">
              Contact Clinic
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================
          INTRO CARDS SECTION
      ====================================== */}
      <section className="services-intro">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4 col-md-6" data-aos="fade-up">
              <div className="services-intro-card">
                <i className="fa-solid fa-user-doctor"></i>
                <h4>Expert Dentists</h4>
                <p>Personalized care from experienced dental professionals.</p>
              </div>
            </div>

            <div
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="services-intro-card">
                <i className="fa-solid fa-tooth"></i>
                <h4>Complete Care</h4>
                <p>From preventive care to advanced smile treatments.</p>
              </div>
            </div>

            <div
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="services-intro-card">
                <i className="fa-solid fa-shield-heart"></i>
                <h4>Comfort First</h4>
                <p>Safe, hygienic, and comfortable dental experience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          SERVICES GRID SECTION
      ====================================== */}
      <section className="services-section">
        <div className="container">
          <div className="section-heading text-center" data-aos="fade-up">
            <span className="services-mini-tag">What We Offer</span>

            <h2 className="services-section-title">
              Treatments Designed For Every Smile
            </h2>

            <p className="services-section-subtitle">
              Explore our complete range of dental services delivered with
              modern techniques, gentle care, and long-lasting results.
            </p>
          </div>

          <div className="row g-4">
            {servicesData.map((service, index) => (
              <div
                className="col-xl-4 col-lg-4 col-md-6"
                key={service.slug}
                data-aos="fade-up"
                data-aos-delay={index % 3 * 100}
              >
                <div className="service-card">
                  <div className="service-image-wrapper">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="service-image"
                    />

                    <div className="service-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="service-content">
                    <div className="service-icon">
                      <i className="fa-solid fa-tooth"></i>
                    </div>

                    <h3>{service.title}</h3>

                    <p>{service.shortDesc}</p>

                    <Link
                      to={`/services/${service.slug}`}
                      className="service-btn"
                    >
                      Learn More
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================
          CARE STRIP SECTION
      ====================================== */}
      <section className="services-care-strip">
        <div className="container">
          <div className="care-strip-box" data-aos="zoom-in">
            <div>
              <span>Why Choose Us?</span>

              <h2>Dental Care That Feels Comfortable & Reliable</h2>
            </div>

            <div className="care-strip-points">
              <p>
                <i className="fa-solid fa-circle-check"></i>
                Modern equipment
              </p>

              <p>
                <i className="fa-solid fa-circle-check"></i>
                Personalized treatment planning
              </p>

              <p>
                <i className="fa-solid fa-circle-check"></i>
                Clean and patient-friendly clinic
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          CTA SECTION
      ====================================== */}
      <section className="services-cta">
        <div className="container">
          <div className="services-cta-box text-center" data-aos="fade-up">
            <span className="services-mini-tag">Book Your Visit</span>

            <h2>Ready To Transform Your Smile?</h2>

            <p>
              Book your consultation today and let our experts help you achieve
              optimal oral health with confidence.
            </p>

            <Link to="/book-appointment" className="services-cta-btn">
              Book Appointment
              <i className="fa-solid fa-calendar-check"></i>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;