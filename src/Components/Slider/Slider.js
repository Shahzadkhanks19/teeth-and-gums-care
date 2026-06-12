import { useState, useEffect, useRef, useCallback } from "react";
import "../Slider/Slider.css";
import sliderImage1 from "./Assets/slider1.jpg";
import sliderImage2 from "./Assets/slider2.jpg";
import sliderImage3 from "./Assets/slider3.jpg";

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
    subHeadline: "From routine check-ups to smile makeovers — all under one roof.",
    ctaText: "Book Appointment",
    ctaLink: "/book-appointment",
  },
  {
    id: 3,
    image: sliderImage3,
    eyebrow: "Our Clinic",
    headline: "Treated in the Best Hands, in the Best Space",
    bullets: ["Fully Sterilised Equipment", "Modern Treatment Chairs", "Relaxing Environment"],
    ctaText: "Book Appointment",
    ctaLink: "/book-appointment",
  },
];

export default function HeroSlider({ slides = DEFAULT_SLIDES, autoPlayInterval = 5000 }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [textVisible, setTextVisible] = useState(true);
  const timerRef = useRef(null);
  const total = slides.length;

  const goTo = useCallback(
    (index) => {
      if (animating) return;
      setAnimating(true);
      setTextVisible(false);
      setTimeout(() => {
        setCurrent((index + total) % total);
        setAnimating(false);
        setTextVisible(true);
      }, 600);
    },
    [animating, total]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    timerRef.current = setInterval(next, autoPlayInterval);
    return () => clearInterval(timerRef.current);
  }, [next, autoPlayInterval]);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, autoPlayInterval);
  };

  const handlePrev = () => { resetTimer(); goTo(current - 1); };
  const handleNext = () => { resetTimer(); next(); };
  const handleDot  = (i) => { resetTimer(); goTo(i); };

  const slide = slides[current];

  return (
    <section className="hero-slider">

      {/* Slides — opacity on wrapper, scale/zoom on the img itself */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="hero-slide"
          style={{
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 1 : 0,
            transition: "opacity 0.7s ease",
          }}
        >
          {/* Scale lives on the img so it works on all screen sizes */}
          <img
            src={s.image}
            alt={s.headline}
            style={{
              transform: i === current ? "scale(1.06)" : "scale(1)",
              transition: i === current
                ? "transform 6s ease"
                : "transform 0.7s ease",
            }}
          />
          <div className="hero-overlay" />
        </div>
      ))}

      {/* Text content */}
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
            {slide.bullets.map((b, idx) => (
              <li key={idx} className="hero-bullet">
                <span className="hero-bullet-dot" />
                {b}
              </li>
            ))}
          </ul>
        )}

        <a href={slide.ctaLink} className="hero-cta">
          {slide.ctaText}
        </a>
      </div>

      {/* Arrows */}
      <button onClick={handlePrev} className="hero-arrow hero-arrow-prev" aria-label="Previous">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button onClick={handleNext} className="hero-arrow hero-arrow-next" aria-label="Next">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dots */}
      <div className="hero-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDot(i)}
            className={`hero-dot${i === current ? " active" : ""}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

    </section>
  );
}