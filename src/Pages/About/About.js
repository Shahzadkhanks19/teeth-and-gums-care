/* =====================================
   ABOUT PAGE IMPORTS
===================================== */

// React
import React from "react";
import { useInView } from "react-intersection-observer";

// Counter animation
import CountUp from "react-countup";

// Page styles
import "./About.css";

import SEO from "../../Components/SEO/SEO";

// Images
import aboutImg from "../About/Assets/about image.avif";
import doctor1 from "../About/Assets/sunita.jpg";
import doctor2 from "../About/Assets/vishal.jpg";

// ABOUT COUNTER CARD

function AboutCounterCard({ icon, end, suffix, decimals = 0, title, delay }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div
      className="col-md-3 col-6 mb-4"
      data-aos="zoom-in"
      data-aos-delay={delay}
    >
      <div className="about-achievement-card" ref={ref}>
        <i className={icon}></i>

        <h2>
          {inView ? (
            <CountUp
              end={end}
              duration={2.5}
              decimals={decimals}
              separator=","
            />
          ) : (
            decimals > 0 ? "0.0" : "0"
          )}
          {suffix}
        </h2>

        <p>{title}</p>
      </div>
    </div>
  );
}

/* =====================================
   ABOUT PAGE COMPONENT
===================================== */

function About() {
  return (
    <>

    <SEO
  title="About Us | Teeth and Gums Care Jodhpur"
  description="Learn about Teeth and Gums Care, our experienced dentists, modern dental care approach and patient-first dental treatments in Jodhpur."
  keywords="about teeth and gums care, dentist Jodhpur, dental experts Jodhpur, dental clinic Shastri Nagar Jodhpur"
/>
      {/* =====================================
          HERO SECTION
      ====================================== */}
      <section className="about-hero">
        <div className="about-hero-shape shape-1"></div>
        <div className="about-hero-shape shape-2"></div>

        <div className="container text-center" data-aos="fade-up">
          <span className="about-hero-badge">Teeth & Gums Care</span>

          <h1>About Teeth and Gums Care</h1>

          <p>
            Dedicated to creating healthy smiles through compassionate,
            advanced, and patient-focused dental care.
          </p>

          <div className="about-hero-points">
            <div data-aos="zoom-in" data-aos-delay="100">
              <i className="fa-solid fa-circle-check"></i>
              Modern Dentistry
            </div>

            <div data-aos="zoom-in" data-aos-delay="200">
              <i className="fa-solid fa-circle-check"></i>
              Gentle Care
            </div>

            <div data-aos="zoom-in" data-aos-delay="300">
              <i className="fa-solid fa-circle-check"></i>
              Trusted Experts
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          OUR STORY SECTION
      ====================================== */}
      <section className="about-story">
        <div className="container">
          <div className="row align-items-center g-4 g-lg-5">
            <div className="col-lg-5" data-aos="fade-right">
              <div className="story-image-wrap">
                <img
                  src={aboutImg}
                  alt="Teeth and Gums Care Clinic"
                  className="img-fluid story-img"
                />

                <div className="story-experience-card" data-aos="zoom-in">
                  <h3>15+</h3>
                  <p>Years of Trusted Dental Care</p>
                </div>
              </div>
            </div>

            <div className="col-lg-7" data-aos="fade-left">
              <div className="story-content">
                <span className="section-tag">Our Story</span>

                <h2>Committed To Your Smile & Oral Health</h2>

                <p>
                  At Teeth and Gums Care, we are committed to providing
                  advanced, compassionate, and personalized dental care for
                  patients of all ages.
                </p>

                <p>
                  We combine modern dental technology, evidence-based treatment
                  methods, and patient-focused care to deliver comfortable,
                  effective, and long-lasting oral healthcare solutions.
                </p>

                <div className="story-highlight-box">
                  <i className="fa-solid fa-tooth"></i>

                  <div>
                    <h5>Patient-First Dental Experience</h5>

                    <p>
                      Our goal is not only to treat dental problems but to help
                      every patient maintain a healthy smile and lifelong
                      confidence.
                    </p>
                  </div>
                </div>

                <div className="story-points">
                  <div>
                    <i className="fa-solid fa-circle-check"></i>
                    Modern Dental Technology
                  </div>

                  <div>
                    <i className="fa-solid fa-circle-check"></i>
                    Gentle & Comfortable Care
                  </div>

                  <div>
                    <i className="fa-solid fa-circle-check"></i>
                    Personalized Treatment Plans
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          DOCTOR SECTION
      ====================================== */}
      <section className="doctor-section">
        <div className="container">
          <div className="text-center section-heading" data-aos="fade-up">
            <span className="section-tag">Our Dental Experts</span>

            <h2>Meet Our Doctors</h2>

            <p className="doctor-subtitle">
              Our experienced dental professionals are committed to providing
              compassionate, personalized, and advanced dental care for every
              patient.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            <div className="col-lg-10" data-aos="fade-up">
              <div className="doctor-card premium-doctor-card">
                <div className="doctor-image-wrapper">
                  <img
                    src={doctor1}
                    alt="Dr. Sunita Khetani"
                    className="doctor-img"
                  />

                  <div className="doctor-badge">
  <span>15+ Years Experience</span>
</div>
                </div>

                <div className="doctor-content">
                  <span className="doctor-label">Dental Surgeon</span>

                  <h3>Dr. Sunita Khetani</h3>

                  <p className="doctor-qualification">
                    BDS • Cosmetic Dentistry • Preventive Dentistry
                  </p>

                  <p>
                    Dr. Sunita Khetani is passionate about preventive,
                    restorative, and cosmetic dentistry. Her patient-first
                    approach focuses on delivering comfortable treatments while
                    helping patients achieve long-term oral health and beautiful
                    smiles.
                  </p>

                  <div className="doctor-specialties">
                    <span>Smile Makeover</span>
                    <span>Root Canal</span>
                    <span>Cosmetic Care</span>
                  </div>

                  <div className="doctor-footer">
                    <div className="doctor-socials">
                      <a href="!#" aria-label="Facebook">
                        <i className="fa-brands fa-facebook-f"></i>
                      </a>

                      <a href="!#" aria-label="Instagram">
                        <i className="fa-brands fa-instagram"></i>
                      </a>

                      <a href="!#" aria-label="LinkedIn">
                        <i className="fa-brands fa-linkedin-in"></i>
                      </a>
                    </div>

                    <a href="/book-appointment" className="doctor-btn">
                      Book Appointment
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-10" data-aos="fade-up" data-aos-delay="120">
              <div className="doctor-card premium-doctor-card reverse">
                <div className="doctor-image-wrapper">
                  <img
                    src={doctor2}
                    alt="Dr. Vishal Khetani"
                    className="doctor-img"
                  />

                  <div className="doctor-badge">
  <span>15+ Years Experience</span>
</div>
                </div>

                <div className="doctor-content">
                  <span className="doctor-label">
                    Periodontist & Implantologist
                  </span>

                  <h3>Dr. Vishal Khetani</h3>

                  <p className="doctor-qualification">
                    MDS • Periodontics • Dental Implants
                  </p>

                  <p>
                    Dr. Vishal Khetani specializes in advanced gum care,
                    periodontics, dental implants, preventive dentistry, and
                    comprehensive oral healthcare with precise, evidence-based
                    treatments.
                  </p>

                  <div className="doctor-specialties">
                    <span>Dental Implants</span>
                    <span>Gum Surgery</span>
                    <span>Periodontics</span>
                  </div>

                  <div className="doctor-footer">
                    <div className="doctor-socials">
                      <a href="!#" aria-label="Facebook">
                        <i className="fa-brands fa-facebook-f"></i>
                      </a>

                      <a href="!#" aria-label="Instagram">
                        <i className="fa-brands fa-instagram"></i>
                      </a>

                      <a href="!#" aria-label="LinkedIn">
                        <i className="fa-brands fa-linkedin-in"></i>
                      </a>
                    </div>

                    <a href="/book-appointment" className="doctor-btn">
                      Book Appointment
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          MISSION & VISION SECTION
      ====================================== */}
      <section className="mission-section">
        <div className="container">
          <div className="text-center section-heading" data-aos="fade-up">
            <span className="section-tag">Our Purpose</span>

            <h2>Mission & Vision</h2>

            <p className="mission-subtitle">
              We believe dental care should be comfortable, transparent, and
              focused on long-term oral wellness.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6" data-aos="fade-right">
              <div className="mission-card">
                <div className="mission-icon">
                  <i className="fa-solid fa-bullseye"></i>
                </div>

                <h3>Our Mission</h3>

                <p>
                  To provide high-quality dental care with compassion,
                  integrity, and excellence while ensuring every patient feels
                  comfortable and confident.
                </p>

                <ul>
                  <li>Gentle treatment approach</li>
                  <li>Honest guidance</li>
                  <li>Long-term oral health focus</li>
                </ul>
              </div>
            </div>

            <div className="col-md-6" data-aos="fade-left">
              <div className="mission-card">
                <div className="mission-icon">
                  <i className="fa-solid fa-eye"></i>
                </div>

                <h3>Our Vision</h3>

                <p>
                  To become the most trusted dental care destination by
                  delivering advanced treatments and outstanding patient
                  experiences.
                </p>

                <ul>
                  <li>Modern dental solutions</li>
                  <li>Patient-first experience</li>
                  <li>Trusted family dental care</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          VALUES SECTION
      ====================================== */}
      <section className="about-values-section">
        <div className="container">
          <div className="row align-items-center g-4 g-lg-5">
            <div className="col-lg-5" data-aos="fade-right">
              <span className="section-tag">Our Values</span>

              <h2>What Makes Our Care Different?</h2>

              <p>
                Every treatment at Teeth and Gums Care is guided by trust,
                comfort, clarity, and clinical excellence.
              </p>
            </div>

            <div className="col-lg-7">
              <div className="values-grid">
                <div className="value-card" data-aos="zoom-in">
                  <i className="fa-solid fa-hand-holding-heart"></i>
                  <h5>Compassion</h5>
                  <p>We treat every patient with care, respect, and empathy.</p>
                </div>

                <div className="value-card" data-aos="zoom-in" data-aos-delay="100">
                  <i className="fa-solid fa-shield-heart"></i>
                  <h5>Safety</h5>
                  <p>Clean, hygienic, and comfortable treatment environment.</p>
                </div>

                <div className="value-card" data-aos="zoom-in" data-aos-delay="200">
                  <i className="fa-solid fa-comments"></i>
                  <h5>Transparency</h5>
                  <p>Clear explanation of treatment options and procedures.</p>
                </div>

                <div className="value-card" data-aos="zoom-in" data-aos-delay="300">
                  <i className="fa-solid fa-microscope"></i>
                  <h5>Precision</h5>
                  <p>Modern methods for accurate and reliable dental care.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          WHY CHOOSE US SECTION
      ====================================== */}
      <section className="about-choose">
        <div className="container">
          <div className="text-center section-heading" data-aos="fade-up">
            <span className="section-tag">Why Choose Us</span>

            <h2>Dental Care Designed Around You</h2>

            <p className="choose-subtitle">
              From consultation to treatment, we focus on your comfort, safety,
              and smile confidence.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-lg-3 col-md-6" data-aos="fade-up">
              <div className="choose-card">
                <i className="fa-solid fa-user-doctor"></i>
                <h5>Experienced Dentists</h5>
                <p>Skilled professionals focused on personalized care.</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div className="choose-card">
                <i className="fa-solid fa-tooth"></i>
                <h5>Advanced Technology</h5>
                <p>Modern tools for precise and comfortable treatments.</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
              <div className="choose-card">
                <i className="fa-solid fa-heart"></i>
                <h5>Patient-Centered Care</h5>
                <p>Gentle approach with clear communication.</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <div className="choose-card">
                <i className="fa-solid fa-syringe"></i>
                <h5>Comfortable Treatment</h5>
                <p>Stress-free experience with modern techniques.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          ACHIEVEMENTS SECTION
      ====================================== */}
      <section className="about-achievements">
        <div className="container">
          <div className="text-center section-heading" data-aos="fade-up">
            <span className="achievement-badge">Clinic At A Glance</span>

            <h2>Teeth & Gums Care At A Glance</h2>

            <p>
              Building trust through quality dental care and patient
              satisfaction.
            </p>
          </div>

          <div className="row text-center">
  <AboutCounterCard
    icon="fa-solid fa-users"
    end={1500}
    suffix="+"
    title="Happy Patients"
    delay="0"
  />

  <AboutCounterCard
    icon="fa-solid fa-user-doctor"
    end={2}
    suffix="+"
    title="Expert Dentists"
    delay="100"
  />

  <AboutCounterCard
    icon="fa-solid fa-star"
    end={4.9}
    suffix="★"
    decimals={1}
    title="Google Rating"
    delay="200"
  />

  <AboutCounterCard
    icon="fa-solid fa-heart"
    end={100}
    suffix="%"
    title="Patient Satisfaction"
    delay="300"
  />
</div>
        </div>
      </section>

      {/* =====================================
          GALLERY PREVIEW SECTION
      ====================================== */}
      <section className="gallery-preview">
        <div className="container">
          <div className="text-center section-heading" data-aos="fade-up">
            <span className="section-tag">Clinic Gallery</span>

            <h2>Inside Our Clinic</h2>

            <p className="gallery-subtitle">
              A glimpse of our clean, comfortable, and patient-friendly dental
              clinic environment.
            </p>
          </div>

          <div className="clinic-gallery-grid">
            <div className="clinic-gallery-card large" data-aos="fade-right">
              <img src={aboutImg} alt="Clinic Interior" />

              <div className="gallery-overlay">
                <span>Modern Clinic Setup</span>
              </div>
            </div>

            <div className="clinic-gallery-card" data-aos="fade-up" data-aos-delay="100">
              <img src={aboutImg} alt="Dental Treatment Area" />

              <div className="gallery-overlay">
                <span>Treatment Area</span>
              </div>
            </div>

            <div className="clinic-gallery-card" data-aos="fade-up" data-aos-delay="200">
              <img src={aboutImg} alt="Patient Care Area" />

              <div className="gallery-overlay">
                <span>Patient Care</span>
              </div>
            </div>

            <div className="clinic-gallery-card wide" data-aos="fade-left" data-aos-delay="300">
              <img src={aboutImg} alt="Clinic Reception" />

              <div className="gallery-overlay">
                <span>Comfortable Environment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          CTA SECTION
      ====================================== */}
      <section className="about-cta">
        <div className="container">
          <div className="about-cta-box" data-aos="zoom-in">
            <div>
              <span className="about-cta-badge">Book Your Visit Today</span>

              <h2>Ready To Transform Your Smile?</h2>

              <p>
                Schedule your consultation today and take the first step towards
                healthier teeth and gums.
              </p>
            </div>

            <a href="/book-appointment" className="about-cta-btn">
              Book Appointment
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;