/* =====================================
   404 PAGE
===================================== */

import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";
import SEO from "../../Components/SEO/SEO";

function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found | Teeth and Gums Care"
        description="The page you are looking for does not exist. Return to Teeth and Gums Care dental clinic website."
        keywords="Teeth and Gums Care, dental clinic Jodhpur, page not found"
      />

      <section className="not-found-page">
        <div className="container">
          <div className="not-found-content">
            <h1>404</h1>

            <h2>Page Not Found</h2>

            <p>
              Sorry, the page you are looking for does not exist or has been
              moved.
            </p>

            <Link to="/" className="not-found-btn">
              Back To Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFound;
