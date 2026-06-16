/* ================================
   HOME PAGE IMPORTS
================================ */

// React + routing
import React from "react";
import { useNavigate } from "react-router-dom";

// Images
import rootCanalImg from "./Assets/root canal.jpg";
import implantImg from "./Assets/dental implant.jpg";
import alignerImg from "./Assets/alignment.jpg";
import whiteningImg from "./Assets/clean.jpg";
import aboutImg from "./Assets/about image.avif";

// Components
import HeroSlider from "../../Components/Slider/Slider";
import Testimonials from "../../Components/Tesimonials/Testimonials";

// Animation counter
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

// Styles
import "./Home.css";

/* ================================
   ACHIEVEMENT CARD COMPONENT
================================ */

function AchievementCard({ icon, number, suffix, title, text, delay }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div
      className="col-lg-3 col-md-6 mb-4"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="achievement-card" ref={ref}>
        <div className="achievement-icon">
          <i className={icon}></i>
        </div>

        <h2 className="achievement-number">
          {inView && (
            <CountUp
              end={number}
              duration={2.5}
              decimals={number === 4.9 ? 1 : 0}
            />
          )}
          {suffix}
        </h2>

        <h5>{title}</h5>
        <p>{text}</p>
      </div>
    </div>
  );
}

/* ================================
   HOME PAGE COMPONENT
================================ */

function Home() {
  const navigate = useNavigate();

  /* ================================
     SERVICES DATA
  ================================ */

  const services = [
    {
      image: rootCanalImg,
      icon: "fa-solid fa-tooth",
      title: "Root Canal Treatment",
      text: "Advanced and painless root canal care to save infected teeth and restore oral health.",
    },
    {
      image: implantImg,
      icon: "fa-solid fa-teeth-open",
      title: "Dental Implants",
      text: "Permanent tooth replacement solutions that look, feel, and function like natural teeth.",
    },
    {
      image: alignerImg,
      icon: "fa-solid fa-face-smile",
      title: "Clear Aligners",
      text: "Straighten your teeth comfortably and discreetly without traditional metal braces.",
    },
    {
      image: whiteningImg,
      icon: "fa-solid fa-wand-magic-sparkles",
      title: "Teeth Whitening",
      text: "Brighten your smile with safe, professional whitening treatments.",
    },
  ];

  /* ================================
     PROCESS STEPS DATA
  ================================ */

  const processSteps = [
    {
      number: "01",
      icon: "fa-solid fa-calendar-check",
      title: "Book Appointment",
      text: "Choose your preferred date and visit time easily.",
    },
    {
      number: "02",
      icon: "fa-solid fa-stethoscope",
      title: "Dental Checkup",
      text: "Get a proper diagnosis and clear explanation.",
    },
    {
      number: "03",
      icon: "fa-solid fa-notes-medical",
      title: "Treatment Plan",
      text: "Understand your options before starting treatment.",
    },
    {
      number: "04",
      icon: "fa-solid fa-face-smile-beam",
      title: "Healthy Smile",
      text: "Enjoy better oral health and long-term confidence.",
    },
  ];

  return (
    <>
      {/* ================================
          HERO SLIDER SECTION
      ================================ */}
      <HeroSlider />

      <main className="home-page">
        <div className="container">
          {/* ================================
              ABOUT SECTION
          ================================ */}

          <section className="about-section" id="about">
            <div className="row align-items-center g-4 g-lg-5">
              <div
                className="col-lg-5"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                <div className="about-image-wrapper">
                  <img
                    src={aboutImg}
                    alt="Teeth & Gums Care"
                    className="img-fluid about-main-image"
                  />

                  <div className="about-floating-card" data-aos="zoom-in">
                    <h3>15+</h3>
                    <span>Years of Experience</span>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-7"
                data-aos="fade-left"
                data-aos-delay="150"
              >
                <span className="section-tag">About Our Clinic</span>

                <h2 className="about-heading">
                  Creating Healthy Smiles With
                  <span> Modern Dental Care</span>
                </h2>

                <p className="about-tagline">
                  Your smile is our priority, and your comfort is our
                  commitment.
                </p>

                <p className="about-text">
                  At Teeth and Gums Care, we provide advanced, compassionate,
                  and personalized dental care for patients of all ages. Our
                  goal is to help you achieve a healthy smile and lifelong oral
                  wellness.
                </p>

                <p className="about-text">
                  From preventive dentistry and gum care to cosmetic treatments,
                  smile designing, and complete oral healthcare, we combine
                  modern technology with patient-focused care.
                </p>

                <div className="about-features">
                  <div className="about-feature">
                    <i className="fa-solid fa-user-doctor"></i>
                    <span>Experienced Dental Experts</span>
                  </div>

                  <div className="about-feature">
                    <i className="fa-solid fa-tooth"></i>
                    <span>Advanced Dental Technology</span>
                  </div>

                  <div className="about-feature">
                    <i className="fa-solid fa-heart"></i>
                    <span>Patient-Centered Care</span>
                  </div>

                  <div className="about-feature">
                    <i className="fa-solid fa-shield-heart"></i>
                    <span>Safe & Comfortable Treatment</span>
                  </div>
                </div>

                <div className="about-actions">
                  <a href="/about" className="about-btn-primary">
                    Learn More
                  </a>

                  <a href="/book-appointment" className="about-btn-secondary">
                    Book Appointment
                  </a>
                </div>

                <h5 className="about-quote">
                  “Healthy Smiles, Lifelong Confidence”
                </h5>
              </div>
            </div>
          </section>

          {/* ================================
              ACHIEVEMENTS SECTION
          ================================ */}

          <section className="achievement-section" data-aos="fade-up">
            <div className="achievement-bg-shape"></div>

            <div className="section-heading text-center">
              <span className="section-badge">Trusted Dental Care</span>

              <h2 className="achievement-title">Achievements At A Glance</h2>

              <p className="achievement-subtitle">
                Building healthy smiles and lasting relationships through
                modern, ethical, and patient-first dental care.
              </p>
            </div>

            <div className="row">
              <AchievementCard
                icon="fa-solid fa-users"
                number={5000}
                suffix="+"
                title="Happy Patients"
                text="Trusted by families across Jodhpur."
                delay="100"
              />

              <AchievementCard
                icon="fa-solid fa-user-doctor"
                number={15}
                suffix="+"
                title="Years Experience"
                text="Experienced hands for confident care."
                delay="180"
              />

              <AchievementCard
                icon="fa-solid fa-face-smile"
                number={1200}
                suffix="+"
                title="Smiles Transformed"
                text="Better smiles through personalized care."
                delay="260"
              />

              <AchievementCard
                icon="fa-solid fa-star"
                number={4.9}
                suffix="★"
                title="Patient Rating"
                text="Comfortable treatment experience."
                delay="340"
              />
            </div>
          </section>

          {/* ================================
              SERVICES SECTION
          ================================ */}

          <section className="services-section" id="services">
            <div
              className="section-heading text-center"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <span className="section-badge">Our Dental Services</span>

              <h2 className="services-title">Complete Care For Every Smile</h2>

              <p className="services-subtitle">
                Premium dental treatments designed for comfort, safety, and
                long-lasting oral health.
              </p>
            </div>

            <div className="row g-4">
              {services.map((service, index) => (
                <div
                  className="col-lg-3 col-md-6"
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={100 + index * 90}
                >
                  <div className="service-card premium-service-card">
                    <div className="service-image-box">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="home-service-image"
                      />

                      <div className="service-icon-float">
                        <i className={service.icon}></i>
                      </div>
                    </div>

                    <div className="service-content">
                      <h4>{service.title}</h4>
                      <p>{service.text}</p>

                      <button
                        className="service-learn-btn"
                        onClick={() => navigate("/services")}
                      >
                        Learn More
                        <i className="fa-solid fa-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="text-center services-button-wrap"
              data-aos="zoom-in"
              data-aos-delay="150"
            >
              <button
                className="btn services-view-btn"
                onClick={() => navigate("/services")}
              >
                View More Services
              </button>
            </div>
          </section>

          {/* ================================
              PROCESS SECTION
          ================================ */}

          <section className="process-section" data-aos="fade-up">
            <div className="row align-items-center g-4 g-lg-5">
              <div className="col-lg-5" data-aos="fade-right">
                <span className="section-badge process-badge">
                  Simple Process
                </span>

                <h2 className="process-title">
                  Your Visit Made Simple And Comfortable
                </h2>

                <p className="process-text">
                  From consultation to treatment, our process is designed to
                  keep you informed, relaxed, and confident at every step.
                </p>

                <button
                  className="process-btn"
                  onClick={() => navigate("/book-appointment")}
                >
                  Book Your Visit
                </button>
              </div>

              <div className="col-lg-7">
                <div className="process-grid">
                  {processSteps.map((step, index) => (
                    <div
                      className="process-card"
                      key={index}
                      data-aos="fade-left"
                      data-aos-delay={100 + index * 90}
                    >
                      <div className="process-number">{step.number}</div>

                      <div className="process-icon">
                        <i className={step.icon}></i>
                      </div>

                      <div>
                        <h4>{step.title}</h4>
                        <p>{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ================================
              WHY CHOOSE US SECTION
          ================================ */}

          <section className="why-section">
            <div
              className="section-heading text-center"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <span className="section-badge">Why Choose Us</span>

              <h2 className="why-title">Dental Care You Can Trust</h2>

              <p className="why-subtitle">
                Combining expertise, modern technology, and compassionate care
                for healthier smiles.
              </p>
            </div>

            <div className="row g-4">
              <div className="col-lg-3 col-md-6" data-aos="zoom-in">
                <div className="why-card">
                  <div className="why-icon">
                    <i className="fa-solid fa-user-doctor"></i>
                  </div>

                  <h4>Experienced Dentists</h4>

                  <p>
                    Skilled dental professionals providing personalized
                    treatment plans for every patient.
                  </p>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-6"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <div className="why-card">
                  <div className="why-icon">
                    <i className="fa-solid fa-microscope"></i>
                  </div>

                  <h4>Modern Technology</h4>

                  <p>
                    Advanced equipment for precise diagnosis and comfortable
                    treatment experience.
                  </p>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-6"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <div className="why-card">
                  <div className="why-icon">
                    <i className="fa-solid fa-heart-circle-check"></i>
                  </div>

                  <h4>Patient Comfort</h4>

                  <p>
                    Gentle care, clear communication, and a calm environment for
                    stress-free visits.
                  </p>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-6"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <div className="why-card">
                  <div className="why-icon">
                    <i className="fa-solid fa-shield-heart"></i>
                  </div>

                  <h4>Complete Care</h4>

                  <p>
                    From checkups to smile makeovers, all dental needs are
                    covered under one roof.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ================================
              DOCTOR PREVIEW SECTION
          ================================ */}

          <section className="doctor-section" data-aos="fade-up">
            <div className="row align-items-center g-4 g-lg-5">
              <div className="col-lg-5" data-aos="fade-right">
                <span className="section-badge">Meet Our Experts</span>

                <h2 className="doctor-title">
                  Experienced Hands For Your Smile
                </h2>

                <p className="doctor-text">
                  Our dental team focuses on ethical treatment, patient comfort,
                  and long-term oral wellness.
                </p>

                <button
                  className="doctor-btn"
                  onClick={() => navigate("/about")}
                >
                  Know More About Us
                </button>
              </div>

              <div className="col-lg-7">
                <div className="row g-4">
                  <div
                    className="col-md-6"
                    data-aos="fade-left"
                    data-aos-delay="100"
                  >
                    <div className="doctor-card">
                      <div className="doctor-avatar">
                        <i className="fa-solid fa-user-doctor"></i>
                      </div>

                      <h4>Dr. Sunita Khetani</h4>
                      <p>Dental Expert</p>
                      <span>Patient-focused dental care</span>
                    </div>
                  </div>

                  <div
                    className="col-md-6"
                    data-aos="fade-left"
                    data-aos-delay="200"
                  >
                    <div className="doctor-card">
                      <div className="doctor-avatar">
                        <i className="fa-solid fa-user-doctor"></i>
                      </div>

                      <h4>Dr. Vishal Khetani</h4>
                      <p>Dental Expert</p>
                      <span>Modern dental treatment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================================
              FAQ SECTION
          ================================ */}

          <section className="faq-section">
            <div className="row align-items-center g-4 g-lg-5">
              <div className="col-lg-5" data-aos="fade-right">
                <span className="faq-badge">FAQs</span>

                <h2 className="faq-title mt-3">
                  Frequently Asked <br />
                  Questions
                </h2>

                <p className="faq-description">
                  Have questions about dental treatments, appointments, or oral
                  care? Here are answers to some common questions our patients
                  ask.
                </p>

                <div className="faq-contact-box">
                  <i className="fa-solid fa-phone"></i>

                  <div>
                    <h6>Need More Help?</h6>
                    <p>Contact our clinic for personalized assistance.</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-7" data-aos="fade-left">
                <div className="accordion custom-faq" id="faqAccordion">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq1"
                      >
                        How often should I visit a dentist?
                      </button>
                    </h2>

                    <div
                      id="faq1"
                      className="accordion-collapse collapse show"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        Most patients should schedule a dental checkup every six
                        months for preventive care and professional cleaning.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq2"
                      >
                        Are dental treatments painful?
                      </button>
                    </h2>

                    <div
                      id="faq2"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        Modern dentistry focuses on patient comfort. Most
                        procedures are performed using advanced techniques and
                        anesthesia to minimize discomfort.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq3"
                      >
                        Do you provide teeth whitening services?
                      </button>
                    </h2>

                    <div
                      id="faq3"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        Yes. We offer professional teeth whitening treatments
                        designed to safely brighten your smile.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq4"
                      >
                        How can I book an appointment?
                      </button>
                    </h2>

                    <div
                      id="faq4"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        You can book an appointment online, call our clinic
                        directly, or contact us through WhatsApp.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ================================
            TESTIMONIALS SECTION
        ================================ */}

        <div data-aos="fade-up">
          <Testimonials />
        </div>

        {/* ================================
            CTA SECTION
        ================================ */}

        <section className="cta-section">
          <div className="cta-wrapper">
            <div className="container">
              <div className="row align-items-center g-4 g-lg-5">
                <div className="col-lg-7" data-aos="fade-right">
                  <span className="cta-badge">
                    <i className="fa-solid fa-calendar-check me-2"></i>
                    Book Your Visit Today
                  </span>

                  <h2 className="cta-title">
                    Ready for a Healthier,
                    <br />
                    Brighter Smile?
                  </h2>

                  <p className="cta-description">
                    Whether you need a routine dental checkup, cosmetic
                    treatment, gum care, dental implants, orthodontic care, or a
                    complete smile makeover, our experienced team is here to
                    help.
                  </p>

                  <div className="cta-features">
                    <div>
                      <i className="fa-solid fa-check"></i>
                      Experienced Dentists
                    </div>

                    <div>
                      <i className="fa-solid fa-check"></i>
                      Modern Technology
                    </div>

                    <div>
                      <i className="fa-solid fa-check"></i>
                      Patient-Centered Care
                    </div>
                  </div>
                </div>

                <div className="col-lg-5" data-aos="zoom-in">
                  <div className="cta-action-box">
                    <h3>Book Your Appointment</h3>

                    <p>
                      Get personalized dental care from our experienced team.
                    </p>

                    <button
                      className="cta-book-btn"
                      onClick={() => navigate("/book-appointment")}
                    >
                      <i className="fa-solid fa-calendar-check me-2"></i>
                      Book Appointment
                    </button>

                    <a
                      href="https://wa.me/919829824356"
                      className="cta-whatsapp-btn"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa-brands fa-whatsapp me-2"></i>
                      WhatsApp Us
                    </a>

                    <a href="tel:+919829824356" className="cta-call-btn">
                      <i className="fa-solid fa-phone me-2"></i>
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================
            EMERGENCY SECTION
        ================================ */}

        <section className="emergency-section" data-aos="fade-up">
          <div className="container">
            <div className="emergency-box">
              <div>
                <span>Dental Emergency?</span>
                <h3>Call us for quick dental assistance</h3>
              </div>

              <a href="tel:+919829824356">
                <i className="fa-solid fa-phone me-2"></i>
                +91 98298 24356
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;