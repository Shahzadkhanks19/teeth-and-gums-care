import React from "react";
import { useNavigate } from "react-router-dom";
import rootCanalImg from "./Assets/root canal.jpg";
import implantImg from "./Assets/dental implant.jpg";
import alignerImg from "./Assets/alignment.jpg";
import whiteningImg from "./Assets/clean.jpg";
import HeroSlider from "../../Components/Slider/Slider";
import "./Home.css";
import aboutImg from "./Assets/about image.avif";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Testimonials from "../../Components/Tesimonials/Testimonials";

function AchievementCard({ icon, number, suffix, title }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <div className="achievement-card" ref={ref}>
        <div className="achievement-icon">
          <i className={icon}></i>
        </div>

        <h2 className="achievement-number">
          {inView && <CountUp end={number} duration={2.5} />}
          {suffix}
        </h2>

        <p>{title}</p>
      </div>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <HeroSlider />
      <div className="container">
        {/* About Section */}
        <section
          className="about-section container mt-5 pt-5 pb-5 mb-5"
          id="about"
        >
          <div className="row align-items-center">
            <div className="col-md-4 col-sm-12 mb-4 mb-md-0">
              <div className="about-card card card-body">
                <img
                  src={aboutImg}
                  alt="Teeth & Gums Care"
                  className="img-fluid rounded"
                />
              </div>
            </div>

            <div className="col-md-8 col-sm-12">
              <div className="px-md-4">
                <h1 className="about-heading">
                  Welcome to <br />
                  <span className="about-heading-highlight">
                    Teeth & Gums Care
                  </span>
                </h1>

                <p className="about-tagline mt-4">
                  <strong>
                    Your smile is our priority, and your comfort is our
                    commitment.
                  </strong>
                </p>

                <p className="about-text">
                  At Teeth & Gums Care, we provide advanced, compassionate, and
                  personalized dental care for patients of all ages. Our goal is
                  to help you achieve a healthy smile and long-lasting oral
                  wellness in a comfortable and friendly environment.
                </p>

                <p className="about-text">
                  From preventive dentistry and gum care to cosmetic treatments,
                  smile designing, and complete oral healthcare solutions, we
                  combine modern technology with patient-focused care to deliver
                  exceptional dental treatment you can trust.
                </p>

                <h4 className="about-quote mt-4">
                  "Healthy Smiles, Lifelong Confidence"
                </h4>
              </div>
            </div>
          </div>
        </section>

        <section className="achievement-section">
          <div className="container">
            <div className="text-center mb-5">
              <span className="section-badge">Trusted Dental Care</span>

              <h2 className="achievement-title">Achievements At A Glance</h2>

              <p className="achievement-subtitle">
                Building healthy smiles and lasting relationships through
                quality dental care.
              </p>
            </div>

            <div className="row">
              <AchievementCard
                icon="fa-solid fa-users"
                number={5000}
                suffix="+"
                title="Happy Patients"
              />

              <AchievementCard
                icon="fa-solid fa-user-doctor"
                number={15}
                suffix="+"
                title="Years Experience"
              />

              <AchievementCard
                icon="fa-solid fa-face-smile"
                number={1200}
                suffix="+"
                title="Smiles Transformed"
              />

              <AchievementCard
                icon="fa-solid fa-star"
                number={4.9}
                suffix="★"
                title="Patient Rating"
              />
            </div>
          </div>
        </section>

        <section className="services-section container py-5 mb-5" id="services">
          <div className="text-center mb-5">
            <h2 className="services-title">Our Services</h2>
            <p className="services-subtitle">
              Comprehensive dental solutions for a healthy and confident smile.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="service-card">
                <img
                  src={rootCanalImg}
                  alt="Root Canal Treatment"
                  className="home-service-image"
                />
                <div className="service-content">
                  <h4>Root Canal Treatment</h4>
                  <p>
                    Advanced and painless root canal procedures to save infected
                    teeth and restore oral health.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="service-card">
                <img
                  src={implantImg}
                  alt="Dental Implants"
                  className="home-service-image"
                />
                <div className="service-content">
                  <h4>Dental Implants</h4>
                  <p>
                    Permanent tooth replacement solutions that look, feel and
                    function like natural teeth.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="service-card">
                <img
                  src={alignerImg}
                  alt="Clear Aligners"
                  className="home-service-image"
                />
                <div className="service-content">
                  <h4>Clear Aligners</h4>
                  <p>
                    Straighten your teeth comfortably and discreetly without
                    traditional metal braces.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="service-card">
                <img
                  src={whiteningImg}
                  alt="Teeth Whitening"
                  className="home-service-image"
                />
                <div className="service-content">
                  <h4>Teeth Whitening</h4>
                  <p>
                    Brighten your smile with safe, professional whitening
                    treatments.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <button
              className="btn services-view-btn"
              onClick={() => navigate("/services")}
            >
              View More Services
            </button>
          </div>
        </section>

        {/* <section className="why-choose-section container py-5 mb-5">
  <div className="text-center mb-5">
    <h2 className="why-choose-title">Why Choose Us</h2>
    <p className="why-choose-subtitle">
      Providing exceptional dental care with expertise, compassion, and
      advanced technology.
    </p>
  </div>

  <div className="row g-4">
    <div className="col-md-6 col-lg-3">
      <div className="why-card">
        <div className="why-icon">
          <i className="fas fa-user-md"></i>
        </div>
        <h4>Experienced Dentists</h4>
        <p>
          Our skilled dental professionals provide personalized treatment
          plans tailored to your oral health needs.
        </p>
      </div>
    </div>

    <div className="col-md-6 col-lg-3">
      <div className="why-card">
        <div className="why-icon">
          <i className="fas fa-microscope"></i>
        </div>
        <h4>Advanced Technology</h4>
        <p>
          We use modern dental equipment and techniques to ensure accurate
          diagnosis and effective treatment.
        </p>
      </div>
    </div>

    <div className="col-md-6 col-lg-3">
      <div className="why-card">
        <div className="why-icon">
          <i className="fas fa-heart"></i>
        </div>
        <h4>Patient-Centered Care</h4>
        <p>
          Your comfort, safety, and satisfaction are our priorities at every
          stage of your treatment journey.
        </p>
      </div>
    </div>

    <div className="col-md-6 col-lg-3">
      <div className="why-card">
        <div className="why-icon">
          <i className="fas fa-smile"></i>
        </div>
        <h4>Comprehensive Solutions</h4>
        <p>
          From preventive dentistry to smile makeovers, we offer complete
          oral healthcare under one roof.
        </p>
      </div>
    </div>
  </div>
</section> */}

        <section className="why-section container py-5 mb-5">
          <div className="text-center mb-5">
            <h2 className="why-title">Why Choose Teeth & Gums Care?</h2>
            <p className="why-subtitle">
              Combining expertise, advanced technology, and compassionate care
              for healthier smiles.
            </p>
          </div>

          <div className="row g-5">
            <div className="col-md-6">
              <div className="why-item">
                <div className="why-icon">
                  <i className="fa-solid fa-user-doctor"></i>
                </div>
                <div>
                  <h4>Experienced Dental Professionals</h4>
                  <p>
                    Skilled dentists providing personalized treatment plans for
                    patients of all ages.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="why-item">
                <div className="why-icon">
                  <i className="fa-solid fa-microscope"></i>
                </div>
                <div>
                  <h4>Modern Technology</h4>
                  <p>
                    Advanced diagnostic and treatment equipment for precise and
                    effective dental care.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="why-item">
                <div className="why-icon">
                  <i className="fa-solid fa-heart-circle-check"></i>
                </div>
                <div>
                  <h4>Patient-Centered Approach</h4>
                  <p>
                    We focus on comfort, transparency, and long-term oral health
                    for every patient.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="why-item">
                <div className="why-icon">
                  <i className="fa-solid fa-tooth"></i>
                </div>
                <div>
                  <h4>Comprehensive Dental Care</h4>
                  <p>
                    From preventive checkups to smile makeovers, all your dental
                    needs are covered under one roof.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="faq-section container py-5 mb-5">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-4 mb-lg-0">
              <span className="faq-badge">FAQs</span>

              <h2 className="faq-title mt-3">
                Frequently Asked <br />
                Questions
              </h2>

              <p className="faq-description">
                Have questions about dental treatments, appointments, or oral
                care? Here are answers to some of the most common questions our
                patients ask.
              </p>

              <div className="faq-contact-box">
                <i className="fa-solid fa-phone"></i>
                <div>
                  <h6>Need More Help?</h6>
                  <p>Contact our clinic for personalized assistance.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
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
      <div>
        <Testimonials/>
        <section className="cta-section">
          <div className="cta-wrapper">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-7">
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
                    help. Schedule your consultation today and take the first
                    step toward better oral health.
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

                <div className="col-lg-5">
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
                      href="https://wa.me/919876543210"
                      className="cta-whatsapp-btn"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa-brands fa-whatsapp me-2"></i>
                      WhatsApp Us
                    </a>

                    <a href="tel:+919876543210" className="cta-call-btn">
                      <i className="fa-solid fa-phone me-2"></i>
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
