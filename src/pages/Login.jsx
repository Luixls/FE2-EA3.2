// ruta: hotel-venezuela/src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ emailOrUsername: "", password: "" });
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      setMensaje("Inicio de sesión exitoso. Bienvenido/a!");
      
      setTimeout(() => {
        setMensaje("");
        navigate("/");
      }, 2000);
    } catch (error) {
      setMensaje(error.response.data.mensaje);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white dark:bg-gray-900 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4 dark:text-gray-100">Inicio de Sesión</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          name="emailOrUsername"
          placeholder="Nombre de usuario o correo"
          onChange={handleChange}
          value={formData.emailOrUsername}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          onChange={handleChange}
          value={formData.password}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Iniciar Sesión
        </button>
      </form>
      {mensaje && <p className="mt-4 text-center text-green-600">{mensaje}</p>}
    </div>
  );
}

export default Login;
