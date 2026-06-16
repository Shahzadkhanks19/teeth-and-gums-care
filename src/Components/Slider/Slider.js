/* =====================================
   IMPORTS
===================================== */

import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import "../Slider/Slider.css";

import sliderImage1 from "./Assets/slider1.jpg";
import sliderImage2 from "./Assets/slider2.jpg";
import sliderImage3 from "./Assets/slider3.jpg";

/* =====================================
   HERO SLIDES DATA
===================================== */

const DEFAULT_SLIDES = [
  {
    id: 1,
    image: sliderImage1,
    eyebrow: "Perfect Healthy Smile",
    headline: "Transform Your Smile with Expert Dental Care",
    bullets: ["Painless Treatments", "Advanced Technology", "Trusted Dentists"],
    ctaText: "Book Appointment",
    ctaLink: "/book-appointment",
  },
  {
    id: 2,
    image: sliderImage2,
    eyebrow: "Advanced Dental Treatments",
    headline: "Modern Dentistry You Can Trust",
    subHeadline:
      "From routine check-ups to smile makeovers — all under one roof.",
    ctaText: "Book Appointment",
    ctaLink: "/book-appointment",
  },
  {
    id: 3,
    image: sliderImage3,
    eyebrow: "Our Clinic",
    headline: "Treated in the Best Hands, in the Best Space",
    bullets: [
      "Fully Sterilised Equipment",
      "Modern Treatment Chairs",
      "Relaxing Environment",
    ],
    ctaText: "Book Appointment",
    ctaLink: "/book-appointment",
  },
];

/* =====================================
   HERO SLIDER COMPONENT
===================================== */

export default function HeroSlider({
  slides = DEFAULT_SLIDES,
  autoPlayInterval = 5000,
}) {
  const [current, setCurrent] = useState(0);
  const [textVisible, setTextVisible] = useState(true);

  const timerRef = useRef(null);
  const total = slides.length;

  /* =====================================
     CHANGE SLIDE
  ====================================== */

  const goTo = useCallback(
    (index) => {
      setTextVisible(false);

      setTimeout(() => {
        setCurrent((index + total) % total);
        setTextVisible(true);
      }, 450);
    },
    [total]
  );

  const next = useCallback(() => {
    goTo(current + 1);
  }, [current, goTo]);

  /* =====================================
     AUTO PLAY
  ====================================== */

  useEffect(() => {
    timerRef.current = setInterval(next, autoPlayInterval);

    return () => clearInterval(timerRef.current);
  }, [next, autoPlayInterval]);

  /* =====================================
     RESET TIMER AFTER MANUAL ACTION
  ====================================== */

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, autoPlayInterval);
  };

  /* =====================================
     SLIDER CONTROLS
  ====================================== */

  const handlePrev = () => {
    resetTimer();
    goTo(current - 1);
  };

  const handleNext = () => {
    resetTimer();
    next();
  };

  const handleDot = (index) => {
    resetTimer();
    goTo(index);
  };

  const slide = slides[current];

  return (
    <section className="hero-slider">
      {/* =====================================
          BACKGROUND SLIDES
      ====================================== */}
      {slides.map((item, index) => (
        <div
          key={item.id}
          className="hero-slide"
          style={{
            opacity: index === current ? 1 : 0,
            zIndex: index === current ? 1 : 0,
            transition: "opacity 0.7s ease",
          }}
        >
          <img
            src={item.image}
            alt={item.headline}
            style={{
              transform: index === current ? "scale(1.06)" : "scale(1)",
              transition:
                index === current ? "transform 6s ease" : "transform 0.7s ease",
            }}
          />

          <div className="hero-overlay" />
        </div>
      ))}

      {/* =====================================
          HERO TEXT CONTENT
      ====================================== */}
      <div
        className="hero-content"
        style={{
          opacity: textVisible ? 1 : 0,
          transform: textVisible ? "translateY(0)" : "translateY(20px)",
        }}
      >
        {slide.eyebrow && (
          <span className="hero-eyebrow">{slide.eyebrow}</span>
        )}

        <h1 className="hero-headline">{slide.headline}</h1>

        {slide.subHeadline && (
          <h2 className="hero-subheadline">{slide.subHeadline}</h2>
        )}

        {slide.bullets && slide.bullets.length > 0 && (
          <ul className="hero-bullets">
            {slide.bullets.map((bullet, index) => (
              <li key={index} className="hero-bullet">
                <span className="hero-bullet-dot" />
                {bullet}
              </li>
            ))}
          </ul>
        )}

        <Link to={slide.ctaLink} className="hero-cta">
          {slide.ctaText}
        </Link>
      </div>

      {/* =====================================
          ARROW CONTROLS
      ====================================== */}
      <button
        onClick={handlePrev}
        className="hero-arrow hero-arrow-prev"
        aria-label="Previous slide"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="hero-arrow hero-arrow-next"
        aria-label="Next slide"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* =====================================
          DOT CONTROLS
      ====================================== */}
      <div className="hero-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDot(index)}
            className={`hero-dot${index === current ? " active" : ""}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* =====================================
          SCROLL INDICATOR
      ====================================== */}
      <div className="hero-scroll-indicator">
        <span></span>
      </div>
    </section>
  );
}