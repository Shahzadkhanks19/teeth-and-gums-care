import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import servicesData from "../../data/serviceData";
import "./ServiceDetails.css";

function ServiceDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const service = servicesData.find((item) => item.slug === slug);

  if (!service) {
    return (
      <div className="container py-5 text-center">
        <h2>Service Not Found</h2>
      </div>
    );
  }

  return (
    <>
      {/* HERO */}
      <section className="service-hero">
        <div className="service-hero-overlay"></div>

        <img
          src={service.image}
          alt={service.title}
          className="service-hero-img"
        />

        <div className="service-hero-content">
          <span className="service-hero-tag">Teeth & Gums Care</span>
          <h1>{service.title}</h1>
          <p>{service.shortDesc}</p>
        </div>
      </section>

      <div className="container service-back-container mt-4 mb-4">
        <button
          className="back-to-services-btn"
          onClick={() => navigate("/services")}
        >
          <i className="fa-solid fa-arrow-left me-2"></i>
          Back to Services
        </button>
      </div>

      {/* ABOUT */}
      <section className="service-about">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <img
                src={service.image}
                alt={service.title}
                className="service-main-img"
              />
            </div>

            <div className="col-lg-6">
              <span className="service-tag">Advanced Dental Care</span>

              <h2>About {service.title}</h2>

              <p>{service.description}</p>

              <h4 className="service-small-heading">What is it?</h4>
              <p>{service.definition}</p>

              <ul className="service-benefit-list">
                {service.benefits.map((benefit, index) => (
                  <li key={index}>
                    <i className="fa-solid fa-check"></i>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CAUSES + WHEN REQUIRED */}
      <section className="service-info-section">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="service-info-card">
                <div className="service-info-icon">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                </div>

                <h3>Common Causes</h3>

                <ul>
                  {service.causes.map((cause, index) => (
                    <li key={index}>{cause}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="service-info-card">
                <div className="service-info-icon">
                  <i className="fa-solid fa-notes-medical"></i>
                </div>

                <h3>When Is It Required?</h3>

                <ul>
                  {service.whenRequired.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="service-process">
        <div className="container">
          <div className="text-center mb-5">
            <span className="service-tag">Treatment Journey</span>
            <h2>Treatment Process</h2>
          </div>

          <div className="row g-4">
            {service.procedure.map((step, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <div className="process-card">
                  <div className="step-number">{index + 1}</div>
                  <p>{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRECAUTIONS + PREVENTION */}
      <section className="service-care-section">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="care-card">
                <div className="care-icon">
                  <i className="fa-solid fa-shield-heart"></i>
                </div>

                <h3>Precautions After Treatment</h3>

                <ul>
                  {service.precautions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="care-card">
                <div className="care-icon">
                  <i className="fa-solid fa-heart-circle-check"></i>
                </div>

                <h3>Prevention Tips</h3>

                <ul>
                  {service.prevention.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="service-why">
        <div className="container">
          <div className="text-center mb-5">
            <h2>Why Choose Teeth & Gums Care?</h2>
            <p>
              We combine expert dental care, modern technology, and a
              patient-first approach.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-3 col-6">
              <div className="why-service-card">
                <i className="fa-solid fa-user-doctor"></i>
                <h5>Expert Dentists</h5>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="why-service-card">
                <i className="fa-solid fa-microscope"></i>
                <h5>Modern Equipment</h5>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="why-service-card">
                <i className="fa-solid fa-heart"></i>
                <h5>Comfort Care</h5>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="why-service-card">
                <i className="fa-solid fa-tooth"></i>
                <h5>Personalized Plans</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="service-faq">
        <div className="container">
          <div className="text-center mb-5">
            <span className="service-tag">Questions & Answers</span>
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="accordion" id="serviceFaqAccordion">
            {service.faqs.map((faq, index) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button ${
                      index !== 0 ? "collapsed" : ""
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#serviceFaq${index}`}
                  >
                    {faq.question}
                  </button>
                </h2>

                <div
                  id={`serviceFaq${index}`}
                  className={`accordion-collapse collapse ${
                    index === 0 ? "show" : ""
                  }`}
                  data-bs-parent="#serviceFaqAccordion"
                >
                  <div className="accordion-body">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="service-cta">
        <div className="container text-center">
          <h2>Ready To Improve Your Smile?</h2>

          <p>Schedule your consultation today with Teeth & Gums Care.</p>

          <Link to="/book-appointment" className="service-cta-btn">
            Book Appointment
          </Link>
        </div>
      </section>
    </>
  );
}

export default ServiceDetails;
