import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import StickyButtons from "./Components/Sticky Buttons/StickyButtons";

import About from "./Pages/About/About";
import Home from "./Pages/Home/Home";
import Contact from "./Pages/Contact/Contact";
import Services from "./Pages/Services/Services";
import ServiceDetails from "./Pages/Service Details/ServiceDetails";
import BookAppointment from "./Pages/Book Appointment/BookAppointment";
import Gallery from "./Pages/Gallery/Gallery";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
function App() {
  return (
    <>
      <Router>
        <ScrollToTop/>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />

            <Route path="/services/:slug" element={<ServiceDetails />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="book-appointment" element={<BookAppointment />} />
          </Routes>
        </div>
        <Footer />
        <StickyButtons />
      </Router>
    </>
  );
}

export default App;
