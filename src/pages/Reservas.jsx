// ruta: hotel-venezuela/src/pages/Reservas.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function Reservas() {
  const [habitaciones, setHabitaciones] = useState([]);
  const [formData, setFormData] = useState({
    nombreReserva: "",
    email: "",
    fechaCheckIn: "",
    fechaCheckOut: "",
    habitacionId: "",
  });
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const obtenerHabitaciones = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/habitaciones");
        setHabitaciones(response.data);
      } catch (error) {
        console.error("Error al obtener habitaciones:", error);
      }
    };
    obtenerHabitaciones();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/reservas", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMensaje("Reserva realizada exitosamente. Revisa tu correo para la confirmación.");
      setFormData({
        nombreReserva: "",
        email: "",
        fechaCheckIn: "",
        fechaCheckOut: "",
        habitacionId: "",
      });
    } catch (error) {
      setMensaje("Error al realizar la reserva.");
      console.error("Error en la reserva:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Realizar una Reserva</h2>
      {mensaje && <p className="text-center text-green-600 mb-4">{mensaje}</p>}
      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block font-semibold mb-2">Nombre para la reserva:</label>
          <input
            type="text"
            name="nombreReserva"
            value={formData.nombreReserva}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Correo electrónico:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Fecha de Check-In:</label>
          <input
            type="date"
            name="fechaCheckIn"
            value={formData.fechaCheckIn}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Fecha de Check-Out:</label>
          <input
            type="date"
            name="fechaCheckOut"
            value={formData.fechaCheckOut}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Selecciona una habitación:</label>
          <select
            name="habitacionId"
            value={formData.habitacionId}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          >
            <option value="">Selecciona una habitación</option>
            {habitaciones.map((habitacion) => (
              <option key={habitacion._id} value={habitacion._id}>
                {habitacion.descripcion} - Máx. Huéspedes: {habitacion.maximoHuespedes}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Reservar
        </button>
      </form>
    </div>
  );
}

export default Reservas;
