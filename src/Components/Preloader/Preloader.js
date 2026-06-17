/* =====================================
   PRELOADER COMPONENT
===================================== */

import React from "react";
import "./Preloader.css";
import logo from "../Navbar/Assets/logo.png";

function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader-content">

        <img
          src={logo}
          alt="Teeth & Gums Care"
          className="preloader-logo"
        />

        <div className="preloader-spinner"></div>

        <h3>Teeth & Gums Care</h3>

        <p>Loading Dental Excellence...</p>

      </div>
    </div>
  );
}

export default Preloader;