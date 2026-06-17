/* =====================================
   GALLERY PAGE IMPORTS
===================================== */

// React + state
import React, { useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import SEO from "../../Components/SEO/SEO"

// Routing
import { Link, useNavigate } from "react-router-dom";

// Empty state
import EmptyState from "../../Components/UI/EmptyState";

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
   GALLERY COUNTER CARD COMPONENT
===================================== */

function GalleryCounterCard({ end, suffix, title, delay }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div
      className="col-lg-3 col-6"
      data-aos="zoom-in"
      data-aos-delay={delay}
    >
      <div className="gallery-stat-card" ref={ref}>
        <h2>
          {inView ? (
            <CountUp end={end} duration={2.5} separator="," />
          ) : (
            "0"
          )}
          {suffix}
        </h2>

        <p>{title}</p>
      </div>
    </div>
  );
}

/* =====================================
   GALLERY PAGE COMPONENT
===================================== */

function Gallery() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  /* =====================================
     GALLERY IMAGE DATA
  ====================================== */

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

  /* =====================================
     EMPTY STATE
  ====================================== */

  if (!galleryImages.length) {
    return (
      <EmptyState
        icon="fa-solid fa-images"
        title="Gallery Coming Soon"
        message="Clinic photos and treatment images will be added soon."
        buttonText="Book Appointment"
        onButtonClick={() => navigate("/book-appointment")}
      />
    );
  }

  return (
    <>

    <SEO
  title="Clinic Gallery | Teeth amd Gums Care Jodhpur"
  description="View the clinic gallery of Teeth and Gums Care, including our dental treatment spaces, modern equipment and patient-friendly environment in Jodhpur."
  keywords="dental clinic gallery Jodhpur, Teeth and Gums Care gallery, dental clinic photos Jodhpur, modern dental clinic Jodhpur"
/>
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
            <GalleryCounterCard
              end={5000}
              suffix="+"
              title="Happy Patients"
              delay="0"
            />

            <GalleryCounterCard
              end={10}
              suffix="+"
              title="Years Experience"
              delay="100"
            />

            <GalleryCounterCard
              end={15}
              suffix="+"
              title="Dental Services"
              delay="200"
            />

            <GalleryCounterCard
              end={100}
              suffix="%"
              title="Patient Focused"
              delay="300"
            />
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