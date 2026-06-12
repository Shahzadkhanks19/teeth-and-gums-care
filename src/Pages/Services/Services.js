import React from "react";
import { Link } from "react-router-dom";
import "./Services.css";
import servicesData from "../../data/serviceData";

function Services() {
  return (
    <>
      {/* HERO */}
      <section className="services-hero">
        <div className="container text-center">
          <span className="services-tag">Advanced Dental Care</span>

          <h1>Our Dental Services</h1>

          <p>
            Comprehensive dental treatments designed to keep your smile healthy,
            beautiful, and confident.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-section">
        <div className="container">
          <div className="row g-4">
            {servicesData.map((service) => (
              <div className="col-lg-4 col-md-6" key={service.slug}>
                <div className="service-card">
                  <div className="service-image-wrapper">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="service-image"
                    />

                    <div className="service-title-badge">{service.title}</div>
                  </div>

                  <div className="service-content">
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

      {/* CTA */}
      <section className="services-cta">
        <div className="container text-center">
          <h2>Ready To Transform Your Smile?</h2>

          <p>
            Book your consultation today and let our experts help you achieve
            optimal oral health.
          </p>

          <Link to="/book-appointment" className="services-cta-btn">
            Book Appointment
          </Link>
        </div>
      </section>
    </>
  );
}

export default Services;
