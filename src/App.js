import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import StickyButtons from "./Components/Sticky Buttons/StickyButtons";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

import About from "./Pages/About/About";
import Home from "./Pages/Home/Home";
import Contact from "./Pages/Contact/Contact";
import Services from "./Pages/Services/Services";
import ServiceDetails from "./Pages/Service Details/ServiceDetails";
import BookAppointment from "./Pages/Book Appointment/BookAppointment";
import Gallery from "./Pages/Gallery/Gallery";
import AdminLogin from "./Pages/AdminLogin/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import ForgotPassword from "./Pages/AdminLogin/ForgotPassword";
import ResetPassword from "./Pages/AdminLogin/ResetPassword";

function AppLayout() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

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

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <div className={isAdminRoute ? "AdminApp" : "App"}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/services" element={<Services />} />

          <Route path="/services/:slug" element={<ServiceDetails />} />

          <Route path="/gallery" element={<Gallery />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/book-appointment" element={<BookAppointment />} />

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
  path="/admin/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/admin/reset-password/:token"
  element={<ResetPassword />}
/>
        </Routes>
      </div>

      {!isAdminRoute && <Footer />}

      {!isAdminRoute && <StickyButtons />}
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppLayout />
    </Router>
  );
}

export default App;