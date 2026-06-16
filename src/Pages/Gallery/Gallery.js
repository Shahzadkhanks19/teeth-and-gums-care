/* =====================================
   GALLERY PAGE IMPORTS
===================================== */

// React + state
import React, { useState } from "react";

// Routing
import { Link } from "react-router-dom";

// Page styles
import "./Gallery.css";

// Gallery images
import gallery1 from "./Assets/gallery2.avif";
import gallery2 from "./Assets/gallery2.avif";
import gallery3 from "./Assets/gallery2.avif";
import gallery4 from "./Assets/gallery2.avif";
import gallery5 from "./Assets/gallery2.avif";
import gallery6 from "./Assets/gallery2.avif";
import gallery7 from "./Assets/gallery2.avif";
import gallery8 from "./Assets/gallery2.avif";

/* =====================================
   GALLERY PAGE COMPONENT
===================================== */

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    { img: gallery1, title: "Clinic Interior", category: "Clinic" },
    { img: gallery2, title: "Treatment Room", category: "Care" },
    { img: gallery3, title: "Reception Area", category: "Clinic" },
    { img: gallery4, title: "Dental Equipment", category: "Technology" },
    { img: gallery5, title: "Patient Care", category: "Care" },
    { img: gallery6, title: "Smile Care", category: "Smile" },
    { img: gallery7, title: "Sterilization Area", category: "Safety" },
    { img: gallery8, title: "Comfortable Space", category: "Clinic" },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="gallery-hero">
        <div className="gallery-hero-shape shape-one"></div>
        <div className="gallery-hero-shape shape-two"></div>

        <div className="container text-center" data-aos="fade-up">
          <span>Teeth & Gums Care</span>

          <h1>Our Clinic Gallery</h1>

          <p>
            Explore our modern dental clinic, advanced treatment spaces, and
            patient-friendly environment.
          </p>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="gallery-stats">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-lg-3 col-6" data-aos="zoom-in">
              <div className="gallery-stat-card">
                <h2>5000+</h2>
                <p>Happy Patients</p>
              </div>
            </div>

            <div className="col-lg-3 col-6" data-aos="zoom-in" data-aos-delay="100">
              <div className="gallery-stat-card">
                <h2>10+</h2>
                <p>Years Experience</p>
              </div>
            </div>

            <div className="col-lg-3 col-6" data-aos="zoom-in" data-aos-delay="200">
              <div className="gallery-stat-card">
                <h2>15+</h2>
                <p>Dental Services</p>
              </div>
            </div>

            <div className="col-lg-3 col-6" data-aos="zoom-in" data-aos-delay="300">
              <div className="gallery-stat-card">
                <h2>100%</h2>
                <p>Patient Focused</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY GRID SECTION */}
      <section className="gallery-section">
        <div className="container">
          <div className="text-center gallery-heading" data-aos="fade-up">
            <span className="gallery-tag">Clinic Moments</span>

            <h2>A Glimpse Inside Our Dental Care Space</h2>

            <div className="gallery-heading-line"></div>

            <p>
              Designed for comfort, hygiene, safety, and advanced dental care.
            </p>
          </div>

          <div className="gallery-grid">
            {galleryImages.map((item, index) => (
              <div
                className={`gallery-card gallery-card-${index + 1}`}
                key={index}
                onClick={() => setSelectedImage(item)}
                data-aos="fade-up"
                data-aos-delay={(index % 4) * 80}
              >
                <img src={item.img} alt={item.title} />

                <div className="gallery-gradient"></div>

                <div className="gallery-content">
                  <span>{item.category}</span>
                  <h5>{item.title}</h5>
                </div>

                <div className="gallery-view">
                  <i className="fa-solid fa-plus"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE MODAL */}
      {selectedImage && (
        <div className="gallery-modal" onClick={() => setSelectedImage(null)}>
          <button className="gallery-close" aria-label="Close gallery image">
            <i className="fa-solid fa-xmark"></i>
          </button>

          <div
            className="gallery-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedImage.img} alt={selectedImage.title} />
            <h4>{selectedImage.title}</h4>
          </div>
        </div>
      )}

      {/* CTA SECTION */}
      <section className="gallery-cta">
        <div className="container text-center" data-aos="zoom-in">
          <span>Visit Teeth & Gums Care</span>

          <h2>Experience Comfortable Dental Care</h2>

          <p>
            Book your appointment and visit our clinic for personalized dental
            care in Jodhpur.
          </p>

          <Link to="/book-appointment" className="gallery-cta-btn">
            Book Appointment
          </Link>
        </div>
      </section>
    </>
  );
}

export default Gallery;