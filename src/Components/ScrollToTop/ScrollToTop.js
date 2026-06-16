/* =====================================
   IMPORTS
===================================== */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* =====================================
   SCROLL TO TOP COMPONENT

   Purpose:
   - Automatically scrolls to the top
     whenever the route changes.
   - Creates a smoother page transition
     experience between routes.
===================================== */

function ScrollToTop() {
  
  /* =====================================
     GET CURRENT ROUTE PATH
  ====================================== */

  const { pathname } = useLocation();

  /* =====================================
     SCROLL TO TOP ON PAGE CHANGE
  ====================================== */

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  /* =====================================
     NO UI TO RENDER
  ====================================== */

  return null;
}

export default ScrollToTop;