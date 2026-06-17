/* =====================================
   SERVICE DETAILS PAGE IMPORTS
===================================== */

// React Router
import { useParams, Link, useNavigate } from "react-router-dom";

// Services data
import servicesData from "../../data/serviceData";

// Page styles
import "./ServiceDetails.css";

// Error state
import ErrorState from "../../Components/UI/ErrorState";

import SEO from "../../Components/SEO/SEO";

/* =====================================
   SERVICE DETAILS PAGE COMPONENT
===================================== */

function ServiceDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const service = servicesData.find((item) => item.slug === slug);

  /* =====================================
     SERVICE NOT FOUND STATE
  ====================================== */

  if (!service) {
  return (
    <ErrorState
      icon="fa-solid fa-tooth"
      title="Service Not Found"
      message="The dental service you are looking for does not exist or may have been moved."
      buttonText="Back to Services"
      onButtonClick={() => navigate("/services")}
    />
  );
}

  return (
    <>

  <SEO
  title={`${service.title} | Teeth and Gums Care Jodhpur`}
  description={
    service.shortDesc ||
    `Learn about ${service.title} at Teeth and Gums Care, Jodhpur. Get expert dental care with modern treatment and patient-focused service.`
  }
  keywords={`${service.title}, ${service.title} Jodhpur, dental clinic Jodhpur, dentist in Jodhpur, Teeth and Gums Care`}
/>
      {/* =====================================
          HERO SECTION
      ====================================== */}
      <section className="service-hero">
  <div className="service-hero-shape shape-one"></div>
  <div className="service-hero-shape shape-two"></div>

  <div className="service-hero-content" data-aos="fade-up">
    <span className="service-hero-tag">Teeth & Gums Care</span>

    <h1>{service.title}</h1>

    <p>{service.shortDesc}</p>

    <div className="service-hero-actions">
      <Link to="/book-appointment" className="service-hero-btn">
        Book Appointment
      </Link>

      <button
        className="service-hero-outline-btn"
        onClick={() => navigate("/services")}
      >
        View All Services
      </button>
    </div>
  </div>
</section>

      {/* =====================================
          BACK BUTTON SECTION
      ====================================== */}
      <div className="container service-back-container" data-aos="fade-up">
        <button
          className="back-to-services-btn"
          onClick={() => navigate("/services")}
        >
          <i className="fa-solid fa-arrow-left"></i>
          Back to Services
        </button>
      </div>

      {/* =====================================
          ABOUT TREATMENT SECTION
      ====================================== */}
      <section className="service-about">
        <div className="container">
          <div className="row align-items-center g-4 g-lg-5">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="service-main-image-wrap">
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-main-img"
                />

                <div className="service-image-badge" data-aos="zoom-in">
                  <i className="fa-solid fa-tooth"></i>
                  <span>Advanced Dental Care</span>
                </div>
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-left">
              <span className="service-tag">About Treatment</span>

              <h2>About {service.title}</h2>

              <p>{service.description}</p>

              <div className="service-definition-box">
                <h4>What is it?</h4>
                <p>{service.definition}</p>
              </div>

              <ul className="service-benefit-list">
                {service.benefits.map((benefit, index) => (
                  <li key={index}>
                    <i className="fa-solid fa-circle-check"></i>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          CAUSES + REQUIRED SECTION
      ====================================== */}
      <section className="service-info-section">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="service-info-card causes-card">
                <div className="service-info-icon">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                </div>

                <h3>Common Causes</h3>

                <ul>
                  {service.causes.map((cause, index) => (
                    <li key={index}>
                      <i className="fa-solid fa-angle-right"></i>
                      {cause}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-left">
              <div className="service-info-card required-card">
                <div className="service-info-icon">
                  <i className="fa-solid fa-notes-medical"></i>
                </div>

                <h3>When Is It Required?</h3>

                <ul>
                  {service.whenRequired.map((item, index) => (
                    <li key={index}>
                      <i className="fa-solid fa-angle-right"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          TREATMENT PROCESS SECTION
      ====================================== */}
      <section className="service-process">
        <div className="container">
          <div className="text-center section-heading" data-aos="fade-up">
            <span className="service-tag">Treatment Journey</span>

            <h2>Treatment Process</h2>

            <p className="service-section-subtitle">
              A simple, comfortable, and guided treatment experience from
              consultation to care.
            </p>
          </div>

          <div className="service-process-grid">
            {service.procedure.map((step, index) => (
              <div
                className="process-card"
                key={index}
                data-aos="fade-up"
                data-aos-delay={index % 3 * 100}
              >
                <div className="step-number">{index + 1}</div>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================
          AFTER CARE + PREVENTION SECTION
      ====================================== */}
      <section className="service-care-section">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="care-card">
                <div className="care-icon">
                  <i className="fa-solid fa-shield-heart"></i>
                </div>

                <h3>Precautions After Treatment</h3>

                <ul>
                  {service.precautions.map((item, index) => (
                    <li key={index}>
                      <i className="fa-solid fa-check"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-left">
              <div className="care-card prevention-card">
                <div className="care-icon">
                  <i className="fa-solid fa-heart-circle-check"></i>
                </div>

                <h3>Prevention Tips</h3>

                <ul>
                  {service.prevention.map((item, index) => (
                    <li key={index}>
                      <i className="fa-solid fa-check"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          WHY CHOOSE US SECTION
      ====================================== */}
      <section className="service-why">
        <div className="container">
          <div className="text-center section-heading" data-aos="fade-up">
            <span className="service-tag">Why Choose Us</span>

            <h2>Why Choose Teeth & Gums Care?</h2>

            <p>
              We combine expert dental care, modern technology, and a
              patient-first approach.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-3 col-6" data-aos="zoom-in">
              <div className="why-service-card">
                <i className="fa-solid fa-user-doctor"></i>
                <h5>Expert Dentists</h5>
              </div>
            </div>

            <div className="col-md-3 col-6" data-aos="zoom-in" data-aos-delay="100">
              <div className="why-service-card">
                <i className="fa-solid fa-microscope"></i>
                <h5>Modern Equipment</h5>
              </div>
            </div>

            <div className="col-md-3 col-6" data-aos="zoom-in" data-aos-delay="200">
              <div className="why-service-card">
                <i className="fa-solid fa-heart"></i>
                <h5>Comfort Care</h5>
              </div>
            </div>

            <div className="col-md-3 col-6" data-aos="zoom-in" data-aos-delay="300">
              <div className="why-service-card">
                <i className="fa-solid fa-tooth"></i>
                <h5>Personalized Plans</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          FAQ SECTION
      ====================================== */}
      <section className="service-faq">
        <div className="container">
          <div className="text-center section-heading" data-aos="fade-up">
            <span className="service-tag">Questions & Answers</span>

            <h2>Frequently Asked Questions</h2>
          </div>

          <div
            className="accordion service-faq-box"
            id="serviceFaqAccordion"
            data-aos="fade-up"
          >
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

      {/* =====================================
          CTA SECTION
      ====================================== */}
      <section className="service-cta">
        <div className="container text-center">
          <div className="service-cta-box" data-aos="zoom-in">
            <span>Book Your Consultation</span>

            <h2>Ready To Improve Your Smile?</h2>

            <p>Schedule your consultation today with Teeth & Gums Care.</p>

            <Link to="/book-appointment" className="service-cta-btn">
              Book Appointment
              <i className="fa-solid fa-calendar-check"></i>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServiceDetails;