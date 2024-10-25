// ruta: hotel-venezuela/src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PaginaAnimada from "./components/PaginaAnimada";
import Inicio from "./pages/Inicio";
import Blog from "./pages/Blog";
import Testimonios from "./pages/Testimonios";
import Reservas from "./pages/Reservas";
import Registro from "./pages/Registro";
import Login from "./pages/Login";
import Servicios from "./pages/Servicios"; // Nueva página

function App() {
  const [modoNocturno, setModoNocturno] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", modoNocturno);
  }, [modoNocturno]);

  const toggleModoNocturno = () => {
    setModoNocturno(!modoNocturno);
  };

  return (
    <>
      <Header toggleModoNocturno={toggleModoNocturno} modoNocturno={modoNocturno} />
      <main className="container mx-auto p-4">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PaginaAnimada><Inicio /></PaginaAnimada>} />
            <Route path="/blog" element={<PaginaAnimada><Blog /></PaginaAnimada>} />
            <Route path="/testimonios" element={<PaginaAnimada><Testimonios /></PaginaAnimada>} />
            <Route path="/reservas" element={<PaginaAnimada><Reservas /></PaginaAnimada>} />
            <Route path="/registro" element={<PaginaAnimada><Registro /></PaginaAnimada>} />
            <Route path="/login" element={<PaginaAnimada><Login /></PaginaAnimada>} />
            <Route path="/servicios" element={<PaginaAnimada><Servicios /></PaginaAnimada>} /> {/* Nueva ruta */}
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}

export default App;
