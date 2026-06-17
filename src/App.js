/* =====================================
   APP IMPORTS
===================================== */

import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { useEffect, useState } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

/* =====================================
   GLOBAL COMPONENTS
===================================== */

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import StickyButtons from "./Components/Sticky Buttons/StickyButtons";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Preloader from "./Components/Preloader/Preloader";

/* =====================================
   PAGE COMPONENTS
===================================== */

import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Services from "./Pages/Services/Services";
import ServiceDetails from "./Pages/Service Details/ServiceDetails";
import BookAppointment from "./Pages/Book Appointment/BookAppointment";
import Gallery from "./Pages/Gallery/Gallery";

import AdminLogin from "./Pages/AdminLogin/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import ForgotPassword from "./Pages/AdminLogin/ForgotPassword";
import ResetPassword from "./Pages/AdminLogin/ResetPassword";

import NotFound from "./Pages/NotFound/NotFound";

/* =====================================
   APP LAYOUT
===================================== */

function AppLayout() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  const [loading, setLoading] = useState(true);

  /* =====================================
     AOS INITIALIZATION
  ====================================== */

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }, []);

  /* =====================================
     WEBSITE PRELOADER
  ====================================== */

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  /* =====================================
     ADMIN BODY CLASS HANDLER
  ====================================== */

  useEffect(() => {
    if (isAdminRoute) {
      document.body.classList.add("admin-page");
    } else {
      document.body.classList.remove("admin-page");
    }

    return () => {
      document.body.classList.remove("admin-page");
    };
  }, [isAdminRoute]);

  /* =====================================
     SHOW PRELOADER BEFORE WEBSITE LOADS
  ====================================== */

  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <div className={isAdminRoute ? "AdminApp" : "App"}>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/services" element={<Services />} />

          <Route path="/services/:slug" element={<ServiceDetails />} />

          <Route path="/gallery" element={<Gallery />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/book-appointment" element={<BookAppointment />} />

          {/* ADMIN ROUTES */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/admin/forgot-password" element={<ForgotPassword />} />

          <Route
            path="/admin/reset-password/:token"
            element={<ResetPassword />}
          />

          {/* 404 ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {!isAdminRoute && <Footer />}

      {!isAdminRoute && <StickyButtons />}
    </>
  );
}

/* =====================================
   ROOT APP COMPONENT
===================================== */

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppLayout />
    </Router>
  );
}

export default App;