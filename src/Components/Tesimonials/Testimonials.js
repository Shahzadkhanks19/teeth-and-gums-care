/* =====================================
   IMPORTS
===================================== */

import React from "react";
import Slider from "react-slick";
import "./Testimonials.css";
import googleIcon from "../Tesimonials/Assets/google.svg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* =====================================
   TESTIMONIALS DATA
===================================== */

const testimonials = [
  {
    name: "Soniya Ranga",
    location: "Jodhpur",
    date: "Google Review",
    rating: 5,
    review:
      "Excellent gentle care. The doctors are very caring and considerate. Highly recommended for dental and gum care.",
  },
  {
    name: "Komal Shinde",
    location: "Jodhpur",
    date: "Google Review",
    rating: 5,
    review: "Excellent service and a very good experience.",
  },
  {
    name: "Anita Sharma",
    location: "Jodhpur",
    date: "Google Review",
    rating: 5,
    review:
      "The care and attention I received here truly eased my dental anxiety. Friendly staff and gentle treatment made all the difference.",
  },
  {
    name: "Rahul Jain",
    location: "Jodhpur",
    date: "Google Review",
    rating: 5,
    review:
      "Modern equipment and patient care made the treatment experience comfortable and smooth.",
  },
  {
    name: "Priya Mehta",
    location: "Jodhpur",
    date: "Google Review",
    rating: 5,
    review:
      "My treatment was comfortable and quick. The clinic team explained everything properly.",
  },
  {
    name: "Amit Singh",
    location: "Jodhpur",
    date: "Google Review",
    rating: 5,
    review:
      "Very clean clinic, polite doctors, and professional dental care. I had a smooth experience.",
  },
];

/* =====================================
   TESTIMONIALS COMPONENT
===================================== */

function Testimonials() {
  const googleReviewsLink = "https://share.google/X1DeFzBmXM8WkGAuc";

  const getInitials = (name) =>
    name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();

  /* =====================================
     SLIDER SETTINGS
  ====================================== */

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 3500,
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: true,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        {/* =====================================
            SECTION HEADING
        ====================================== */}
        <div className="testimonial-heading text-center" data-aos="fade-up">
          <span className="testimonial-tag">Patient Testimonials</span>

          <h2>What Our Patients Say</h2>

          <p>
            Real patient experiences reflecting our commitment to gentle,
            advanced, and comfortable dental care.
          </p>

          <div className="google-rating-banner" data-aos="zoom-in">
            <div className="google-g">
              <img src={googleIcon} alt="Google" />
            </div>

            <div>
              <h4>4.9 ★ Google Rating</h4>
              <span>Based on patient reviews</span>
            </div>
          </div>
        </div>

        {/* =====================================
            REVIEWS SLIDER
        ====================================== */}
        <Slider {...settings}>
          {testimonials.map((item, index) => (
            <div className="testimonial-slide" key={index}>
              <a
                href={googleReviewsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="google-review-card"
              >
                <div className="review-top">
                  <div className="review-user">
                    <div className="review-avatar">
                      {getInitials(item.name)}
                    </div>

                    <div>
                      <h5>{item.name}</h5>
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <div className="google-icon-box">
                    <img src={googleIcon} alt="Google" />
                  </div>
                </div>

                <div className="review-stars">
                  {[...Array(item.rating)].map((_, i) => (
                    <i className="fa-solid fa-star" key={i}></i>
                  ))}

                  <span>{item.date}</span>
                </div>

                <p className="review-text">"{item.review}"</p>

                <div className="verified-review">
                  <i className="fa-solid fa-circle-check"></i>
                  Verified Google Review
                </div>
              </a>
            </div>
          ))}
        </Slider>

        {/* =====================================
            REVIEWS BUTTON
        ====================================== */}
        <div className="reviews-footer" data-aos="fade-up">
          <a
            href={googleReviewsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="view-google-reviews-btn"
          >
            <i className="fa-brands fa-google"></i>
            View All Google Reviews
          </a>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;