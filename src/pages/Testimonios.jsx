// ruta: hotel-venezuela/src/pages/Testimonios.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/testimonios";
const API_HABITACIONES_URL = "http://localhost:5000/api/habitaciones";

const isAuthenticated = () => localStorage.getItem("token") !== null;
const isAdmin = () => localStorage.getItem("rol") === "admin";

function Testimonios() {
  const [testimonios, setTestimonios] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  const [nuevoTestimonio, setNuevoTestimonio] = useState({
    habitacionId: "",
    rating: 5,
    comentario: ""
  });
  const [editandoTestimonioId, setEditandoTestimonioId] = useState(null);
  const [testimonioEditado, setTestimonioEditado] = useState({ rating: 5, comentario: "" });

  useEffect(() => {
    fetchTestimonios();
    fetchHabitaciones();
  }, []);

  const fetchTestimonios = async () => {
    try {
      const response = await axios.get(API_URL);
      setTestimonios(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error al obtener testimonios:", error);
    }
  };

  const fetchHabitaciones = async () => {
    try {
      const response = await axios.get(API_HABITACIONES_URL);
      setHabitaciones(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error al obtener habitaciones:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoTestimonio({ ...nuevoTestimonio, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, nuevoTestimonio, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      fetchTestimonios();
      resetForm();
    } catch (error) {
      console.error("Error al agregar testimonio:", error);
    }
  };

  const resetForm = () => {
    setNuevoTestimonio({ habitacionId: "", rating: 5, comentario: "" });
    setEditandoTestimonioId(null);
    setTestimonioEditado({ rating: 5, comentario: "" });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      fetchTestimonios();
    } catch (error) {
      console.error("Error al eliminar testimonio:", error);
    }
  };

  const iniciarEdicion = (testimonio) => {
    setEditandoTestimonioId(testimonio._id);
    setTestimonioEditado({ rating: testimonio.rating, comentario: testimonio.comentario });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setTestimonioEditado({ ...testimonioEditado, [name]: value });
  };

  const guardarEdicion = async () => {
    try {
      await axios.put(`${API_URL}/${editandoTestimonioId}`, testimonioEditado, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      fetchTestimonios();
      resetForm();
    } catch (error) {
      console.error("Error al editar testimonio:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-800 dark:text-gray-100">
      <h2 className="text-4xl font-bold text-blue-600 mb-4 text-center dark:text-blue-400">Testimonios</h2>

      {isAuthenticated() && (
        <form onSubmit={handleSubmit} className="mb-4 w-full max-w-md">
          <select
            name="habitacionId"
            value={nuevoTestimonio.habitacionId}
            onChange={handleInputChange}
            required
            className="border p-2 mb-2 w-full"
          >
            <option value="">Selecciona una habitación</option>
            {habitaciones.map((habitacion) => (
              <option key={habitacion._id} value={habitacion._id}>{habitacion.descripcion}</option>
            ))}
          </select>
          <input
            type="number"
            name="rating"
            value={nuevoTestimonio.rating}
            onChange={handleInputChange}
            min="1"
            max="10"
            required
            className="border p-2 mb-2 w-full"
            placeholder="Calificación (1-10)"
          />
          <textarea
            name="comentario"
            value={nuevoTestimonio.comentario}
            onChange={handleInputChange}
            placeholder="Comentario"
            required
            className="border p-2 mb-2 w-full"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 w-full">Agregar Testimonio</button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {testimonios.map((testimonio) => (
          <div key={testimonio._id} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-full">
            <h3 className="font-bold text-xl mb-2">Habitación: {testimonio.habitacionId.descripcion}</h3>
            <p>Autor: {testimonio.userId.nombre}</p> {/* Muestra el nombre completo del usuario */}
            <p>Calificación: {testimonio.rating}/10</p>
            <p>Comentario: {testimonio.comentario}</p>

            {isAdmin() && (
              <div className="flex space-x-2 mt-4">
                {editandoTestimonioId === testimonio._id ? (
                  <div className="flex flex-col space-y-2">
                    <input
                      type="number"
                      name="rating"
                      value={testimonioEditado.rating}
                      onChange={handleEditChange}
                      min="1"
                      max="10"
                      className="border p-2"
                      placeholder="Calificación (1-10)"
                    />
                    <textarea
                      name="comentario"
                      value={testimonioEditado.comentario}
                      onChange={handleEditChange}
                      className="border p-2"
                      placeholder="Comentario"
                    />
                    <button onClick={guardarEdicion} className="bg-green-500 text-white p-2 rounded">Guardar</button>
                    <button onClick={resetForm} className="bg-gray-500 text-white p-2 rounded">Cancelar</button>
                  </div>
                ) : (
                  <>
                    <button onClick={() => iniciarEdicion(testimonio)} className="bg-yellow-500 text-white p-2 rounded">Editar</button>
                    <button onClick={() => handleDelete(testimonio._id)} className="bg-red-500 text-white p-2 rounded">Eliminar</button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonios;
