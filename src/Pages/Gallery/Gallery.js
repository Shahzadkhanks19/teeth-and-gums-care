import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Gallery.css";

import gallery1 from "./Assets/gallery2.avif";
import gallery2 from "./Assets/gallery2.avif";
import gallery3 from "./Assets/gallery2.avif";
import gallery4 from "./Assets/gallery2.avif";
import gallery5 from "./Assets/gallery2.avif";
import gallery6 from "./Assets/gallery2.avif";
import gallery7 from "./Assets/gallery2.avif";
import gallery8 from "./Assets/gallery2.avif";

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
      <section className="gallery-hero">
        <div className="container text-center">
          <span>Teeth & Gums Care</span>
          <h1>Our Clinic Gallery</h1>
          <p>
            Explore our modern dental clinic, advanced treatment spaces, and
            patient-friendly environment.
          </p>
        </div>
      </section>

      <section className="gallery-section">
        <div className="container">
          <div className="text-center mb-5">
            <span className="gallery-tag">Clinic Moments</span>
            <h2>A Glimpse Inside Our Dental Care Space</h2>
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

      {selectedImage && (
        <div className="gallery-modal" onClick={() => setSelectedImage(null)}>
          <button className="gallery-close">
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

      <section className="gallery-cta">
        <div className="container text-center">
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