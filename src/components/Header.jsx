// ruta: hotel-venezuela/src/components/Header.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header({ toggleModoNocturno, modoNocturno })  {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("");

  // Verificar si el usuario está autenticado
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar el token de autenticación
    setMensaje("Sesión cerrada correctamente.");

    // Redirigir al usuario después de 2 segundos
    setTimeout(() => {
      setMensaje("");
      navigate("/login");
    }, 2000);
  };

  return (
    <header className="bg-gray-800 text-white p-4 dark:bg-gray-900">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">Hotel Venezuela</Link>
        </h1>
        <nav className="flex items-center">
          <Link to="/" className="mx-2 hover:underline">Inicio</Link>
          <Link to="/blog" className="mx-2 hover:underline">Blog</Link>
          <Link to="/testimonios" className="mx-2 hover:underline">Testimonios</Link>
          <Link to="/reservas" className="mx-2 hover:underline">Reservas</Link>
          <Link to="/registro" className="mx-2 hover:underline">Registro</Link>
          <Link to="/login" className="mx-2 hover:underline">Iniciar Sesión</Link>
          <button
            onClick={toggleModoNocturno}
            className="ml-4 px-2 py-1 border border-gray-300 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {modoNocturno ? "Modo Claro" : "Modo Nocturno"}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
