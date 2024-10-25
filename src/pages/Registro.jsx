// ruta: hotel-venezuela/src/pages/Registro.jsx
import React, { useState } from "react";
import axios from "axios";

function Registro() {
  const [formData, setFormData] = useState({ username: "", nombre: "", email: "", password: "" });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/registro", formData);
      setMensaje(res.data.mensaje);
    } catch (error) {
      setMensaje(error.response.data.mensaje);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Registro de Usuario</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          name="username"
          placeholder="Nombre de usuario"
          onChange={handleChange}
          value={formData.username}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <input
          name="nombre"
          placeholder="Nombre completo"
          onChange={handleChange}
          value={formData.nombre}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          onChange={handleChange}
          value={formData.email}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          onChange={handleChange}
          value={formData.password}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Registrar
        </button>
      </form>
      {mensaje && <p className="mt-4 text-center text-green-600">{mensaje}</p>}
    </div>
  );
}

export default Registro;
