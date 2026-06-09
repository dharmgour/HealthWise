import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Result from "./pages/Result";
import Contact from "./pages/Contact";
import About from "./pages/about";
import Features from "./pages/feature";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Diet from "./pages/Diet";



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/result" element={<Result />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/diet" element={<Diet />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
