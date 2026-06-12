import React from "react";
import CountUp from "react-countup";
import "./About.css";

import aboutImg from "../About/Assets/about image.avif"
import doctor1 from "../About/Assets/sunita.jpg";
import doctor2 from "../About/Assets/vishal.jpg";

function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container text-center">
          <h1>About Teeth & Gums Care</h1>

          <p>
            Dedicated to creating healthy smiles through compassionate,
            advanced, and patient-focused dental care.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="about-story">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <img
                src={aboutImg}
                alt="Clinic"
                className="img-fluid story-img"
              />
            </div>

            <div className="col-lg-7">
              <span className="section-tag">Our Story</span>

              <h2>Committed To Your Smile & Oral Health</h2>

              <p>
                At Teeth & Gums Care, we are committed to providing advanced,
                compassionate, and personalized dental care for patients of all
                ages.
              </p>

              <p>
                We combine modern dental technology, evidence-based treatment
                methods, and patient-focused care to deliver comfortable,
                effective, and long-lasting oral healthcare solutions.
              </p>

              <p>
                Our goal is not only to treat dental problems but to help every
                patient maintain a healthy smile and lifelong confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Section */}
      {/* Doctors Section */}
      <section className="doctor-section">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-tag">Our Dental Experts</span>

            <h2>Meet Our Doctors</h2>

            <p className="doctor-subtitle">
              Our experienced dental professionals are committed to providing
              compassionate, personalized, and advanced dental care for every
              patient.
            </p>
          </div>

          <div className="row g-4">
            {/* Doctor 1 */}
            <div className="col-lg-6">
              <div className="doctor-card">
                <img
                  src={doctor1}
                  alt="Dr. Sunita Khetani"
                  className="img-fluid doctor-img"
                />

                <div className="doctor-content">
                  <h3>Dr. Sunita Khetani</h3>

                  <h6>Dental Surgeon</h6>

                  <p>
                    Dr. Sunita Khetani is passionate about preventive,
                    restorative, and cosmetic dentistry. Her patient-first
                    approach focuses on delivering comfortable treatments while
                    helping patients achieve long-term oral health and beautiful
                    smiles.
                  </p>
                </div>
              </div>
            </div>

            {/* Doctor 2 */}
            <div className="col-lg-6">
              <div className="doctor-card">
                <img
                  src={doctor2}
                  alt="Dr. Vishal Khetani"
                  className="img-fluid doctor-img"
                />

                <div className="doctor-content">
                  <h3>Dr. Vishal Khetani</h3>

                  <h6>Periodontist & Implantologist</h6>

                  <p>
                    Dr. Vishal Khetani specializes in advanced gum care,
                    periodontics, dental implants, preventive dentistry, and
                    comprehensive oral healthcare. He is dedicated to providing
                    precise, evidence-based treatments that help patients
                    achieve healthy gums and confident smiles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision */}
      <section className="mission-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2>Mission & Vision</h2>
          </div>

          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="mission-card">
                <i className="fa-solid fa-bullseye"></i>

                <h3>Our Mission</h3>

                <p>
                  To provide high-quality dental care with compassion,
                  integrity, and excellence while ensuring every patient feels
                  comfortable and confident.
                </p>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="mission-card">
                <i className="fa-solid fa-eye"></i>

                <h3>Our Vision</h3>

                <p>
                  To become the most trusted dental care destination by
                  delivering advanced treatments and outstanding patient
                  experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="about-choose">
        <div className="container">
          <div className="text-center mb-5">
            <h2>Why Choose Us</h2>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="choose-card">
                <i className="fa-solid fa-user-doctor"></i>
                <h5>Experienced Dentists</h5>
              </div>
            </div>

            <div className="col-md-4">
              <div className="choose-card">
                <i className="fa-solid fa-tooth"></i>
                <h5>Advanced Technology</h5>
              </div>
            </div>

            <div className="col-md-4">
              <div className="choose-card">
                <i className="fa-solid fa-heart"></i>
                <h5>Patient-Centered Care</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      {/* Achievements */}
      <section className="about-achievements">
        <div className="container">
          <div className="text-center mb-5">
            <h2>Teeth & Gums Care At A Glance</h2>
            <p>
              Building trust through quality dental care and patient
              satisfaction.
            </p>
          </div>

          <div className="row text-center">
            <div className="col-md-3 col-6 mb-4">
              <div className="about-achievement-card">
                <i className="fa-solid fa-users"></i>

                <h2>
                  <CountUp end={1500} duration={3} separator="," />+
                </h2>

                <p>Happy Patients</p>
              </div>
            </div>

            <div className="col-md-3 col-6 mb-4">
              <div className="about-achievement-card">
                <i className="fa-solid fa-user-doctor"></i>

                <h2>
                  <CountUp end={2} duration={2} />+
                </h2>

                <p>Expert Dentists</p>
              </div>
            </div>

            <div className="col-md-3 col-6 mb-4">
              <div className="about-achievement-card">
                <i className="fa-solid fa-star"></i>

                <h2>
                  <CountUp end={4.9} decimals={1} duration={3} />★
                </h2>

                <p>Google Rating</p>
              </div>
            </div>

            <div className="col-md-3 col-6 mb-4">
              <div className="about-achievement-card">
                <i className="fa-solid fa-heart"></i>

                <h2>
                  <CountUp end={100} duration={3} />%
                </h2>

                <p>Patient Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="gallery-preview">
        <div className="container">
          <div className="text-center mb-5">
            <h2>Our Clinic</h2>
          </div>

          <div className="row g-4">
            {[1, 2, 3, 4].map((item) => (
              <div className="col-md-3" key={item}>
                <div className="gallery-placeholder">
                  <img src= {aboutImg} alt={`Clinic ${item}`} className="img-fluid" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container text-center">
          <h2>Ready To Transform Your Smile?</h2>

          <p>
            Schedule your consultation today and take the first step towards
            healthier teeth and gums.
          </p>

          <a href="/book-appointment" className="about-cta-btn">
            Book Appointment
          </a>
        </div>
      </section>
    </>
  );
}

export default About;
