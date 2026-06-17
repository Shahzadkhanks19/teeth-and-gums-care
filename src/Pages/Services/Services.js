/* =====================================
   SERVICES PAGE IMPORTS
===================================== */

// React + routing
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

import SEO from "../../Components/SEO/SEO";

// Page styles
import "./Services.css";

// Services data
import servicesData from "../../data/serviceData";

/* =====================================
   SERVICES COUNTER CARD
===================================== */

function ServicesCounterCard({ end, suffix = "", title, delay }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div
      className="col-lg-3 col-md-6"
      data-aos="zoom-in"
      data-aos-delay={delay}
    >
      <div className="highlight-card" ref={ref}>
        <h3>
          {inView ? (
            <CountUp end={end} duration={2.5} decimals={end === 4.9 ? 1 : 0} />
          ) : (
            "0"
          )}
          {suffix}
        </h3>

        <p>{title}</p>
      </div>
    </div>
  );
}

/* =====================================
   SERVICES PAGE COMPONENT
===================================== */

function Services() {
  return (
    <>
      <SEO
        title="Dental Services in Jodhpur | Teeth and Gums Care"
        description="Explore complete dental services including Dental Implants, Cosmetic Dentistry, Smile Designing, Dental Veneers, Root Canal Treatment, Dental Aligners, Teeth Whitening, Braces, Dental Bridges and more in Jodhpur."
        keywords="
  dental services Jodhpur,
  dental implants Jodhpur,
  cosmetic dentistry Jodhpur,
  smile designing Jodhpur,
  dental veneers Jodhpur,
  root canal treatment Jodhpur,
  single sitting root canal Jodhpur,
  dental aligners Jodhpur,
  braces treatment Jodhpur,
  teeth whitening Jodhpur,
  dental bridge Jodhpur,
  dental filling Jodhpur,
  apicectomy Jodhpur"
      />

      {/* =====================================
          HERO SECTION
      ====================================== */}
      <section className="services-hero">
        <div className="services-hero-shape shape-one"></div>
        <div className="services-hero-shape shape-two"></div>

        <div
          className="container text-center services-hero-content"
          data-aos="fade-up"
        >
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
    SERVICES HIGHLIGHTS
===================================== */}

      <section className="services-highlights">
        <div className="container">
          <div className="row g-4">
            <ServicesCounterCard
              end={15}
              suffix="+"
              title="Dental Treatments"
              delay="0"
            />

            <ServicesCounterCard
              end={5000}
              suffix="+"
              title="Happy Patients"
              delay="100"
            />

            <ServicesCounterCard
              end={15}
              suffix="+"
              title="Years Experience"
              delay="200"
            />

            <ServicesCounterCard
              end={4.9}
              suffix="★"
              title="Patient Rating"
              delay="300"
            />
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
              15 Specialized Dental Treatments Under One Roof
            </h2>

            <p className="services-section-subtitle">
              From routine dental care and smile enhancement to advanced root
              canal procedures, dental implants, aligners, braces and cosmetic
              dentistry — we provide complete oral healthcare for patients of
              every age.
            </p>
          </div>

          <div className="row g-4">
            {servicesData.map((service, index) => (
              <div
                className="col-xl-4 col-lg-4 col-md-6"
                key={service.slug}
                data-aos="fade-up"
                data-aos-delay={(index % 3) * 100}
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
