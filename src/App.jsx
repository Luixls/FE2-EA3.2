// ruta: hotel-venezuela/src/App.jsx
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PaginaAnimada from "./components/PaginaAnimada";
import Inicio from "./pages/Inicio";
import Blog from "./pages/Blog";
import Testimonios from "./pages/Testimonios";
import Reservas from "./pages/Reservas";

function App() {
  const location = useLocation();

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PaginaAnimada>
                  <Inicio />
                </PaginaAnimada>
              }
            />
            <Route
              path="/blog"
              element={
                <PaginaAnimada>
                  <Blog />
                </PaginaAnimada>
              }
            />
            <Route
              path="/testimonios"
              element={
                <PaginaAnimada>
                  <Testimonios />
                </PaginaAnimada>
              }
            />
            <Route
              path="/reservas"
              element={
                <PaginaAnimada>
                  <Reservas />
                </PaginaAnimada>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}

export default App;
