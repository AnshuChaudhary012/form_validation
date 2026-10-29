import { useEffect } from "react";
import AOS from "aos";
import { BrowserRouter, Route, Routes } from "react-router";
import "aos/dist/aos.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function ScrollAnimations() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
      offset: 80,
      easing: "ease-out-cubic",
    });
  }, []);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollAnimations />
      <div className="min-h-screen overflow-hidden bg-slate-950 text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
