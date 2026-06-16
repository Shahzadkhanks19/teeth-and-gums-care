/* =====================================
   IMPORTS
===================================== */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Sticky Buttons/StickyButtons.css";

/* =====================================
   STICKY ACTION BUTTONS

   Features:
   - Book Appointment Button
   - WhatsApp Button
   - Back To Top Button
===================================== */

function StickyButtons() {
  
  /* =====================================
     SHOW / HIDE TOP BUTTON
  ====================================== */

  const [showTopBtn, setShowTopBtn] = useState(false);

  /* =====================================
     SCROLL LISTENER
  ====================================== */

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =====================================
     SCROLL TO TOP FUNCTION
  ====================================== */

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="sticky-buttons">

      {/* ================================
          BOOK APPOINTMENT BUTTON
      ================================= */}
      <Link
        to="/book-appointment"
        className="sticky-btn sticky-book"
        title="Book Appointment"
        aria-label="Book Appointment"
      >
        <i className="fa-solid fa-calendar-check"></i>
      </Link>

      {/* ================================
          WHATSAPP BUTTON
      ================================= */}
      <a
        href="https://wa.me/919829824356"
        target="_blank"
        rel="noopener noreferrer"
        className="sticky-btn sticky-whatsapp"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>

      {/* ================================
          BACK TO TOP BUTTON
      ================================= */}
      {showTopBtn && (
        <button
          className="sticky-btn sticky-top-btn"
          onClick={scrollToTop}
          title="Back To Top"
          aria-label="Back To Top"
        >
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      )}

    </div>
  );
}

export default StickyButtons;