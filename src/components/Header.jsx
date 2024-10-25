// ruta: hotel-venezuela/src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">Hotel Venezuela</Link>
        </h1>
        <nav>
          <Link to="/" className="mx-2 hover:underline">Inicio</Link>
          <Link to="/blog" className="mx-2 hover:underline">Blog</Link>
          <Link to="/testimonios" className="mx-2 hover:underline">Testimonios</Link>
          <Link to="/reservas" className="mx-2 hover:underline">Reservas</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
