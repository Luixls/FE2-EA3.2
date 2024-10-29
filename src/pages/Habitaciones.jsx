// ruta: hotel-venezuela/src/pages/Habitaciones.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function Habitaciones() {
  const [habitaciones, setHabitaciones] = useState([]);
  const [error, setError] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false); // Controla si estamos en modo edición
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null); // Guarda la habitación a editar
  const [nuevaHabitacion, setNuevaHabitacion] = useState({
    descripcion: "",
    comodidades: "",
    imagen: "",
    tarifas: "",
    evaluacion: "",
  });

  const token = localStorage.getItem("token");
  const isAdmin = token && localStorage.getItem("rol") === "admin";

  useEffect(() => {
    obtenerHabitaciones();
  }, []);

  const obtenerHabitaciones = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/habitaciones");
      setHabitaciones(response.data);
    } catch (error) {
      setError("Error al obtener habitaciones");
    }
  };

  const handleChange = (e) => {
    setNuevaHabitacion({ ...nuevaHabitacion, [e.target.name]: e.target.value });
  };

  const agregarHabitacion = async () => {
    try {
      await axios.post("http://localhost:5000/api/habitaciones", {
        ...nuevaHabitacion,
        reviews: [] // Inicializar reviews como arreglo vacío
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await obtenerHabitaciones(); // Actualizar lista completa de habitaciones después de agregar
      setNuevaHabitacion({ descripcion: "", comodidades: "", imagen: "", tarifas: "", evaluacion: "" });
      setMostrarFormulario(false); // Cerrar el formulario después de agregar
    } catch (error) {
      alert("Error al agregar la habitación");
    }
  };

  const iniciarEdicion = (habitacion) => {
    setHabitacionSeleccionada(habitacion);
    setNuevaHabitacion({
      descripcion: habitacion.descripcion,
      comodidades: habitacion.comodidades,
      imagen: habitacion.imagen,
      tarifas: habitacion.tarifas,
      evaluacion: habitacion.evaluacion,
    });
    setMostrarFormulario(true);
    setModoEdicion(true);
  };

  const editarHabitacion = async () => {
    if (!habitacionSeleccionada) return;

    try {
      await axios.put(`http://localhost:5000/api/habitaciones/${habitacionSeleccionada._id}`, nuevaHabitacion, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await obtenerHabitaciones(); // Actualizar la lista de habitaciones después de editar
      setNuevaHabitacion({ descripcion: "", comodidades: "", imagen: "", tarifas: "", evaluacion: "" });
      setMostrarFormulario(false);
      setModoEdicion(false);
      setHabitacionSeleccionada(null);
    } catch (error) {
      alert("Error al editar la habitación");
    }
  };

  const eliminarHabitacion = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/habitaciones/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHabitaciones(habitaciones.filter(habitacion => habitacion._id !== id));
    } catch (error) {
      alert("Error al eliminar la habitación");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Nuestras Habitaciones</h2>
      {isAdmin && (
        <button
          onClick={() => {
            setMostrarFormulario(!mostrarFormulario);
            setModoEdicion(false); // Salir del modo edición si estamos agregando una nueva habitación
            setHabitacionSeleccionada(null);
            setNuevaHabitacion({ descripcion: "", comodidades: "", imagen: "", tarifas: "", evaluacion: "" });
          }}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {mostrarFormulario ? "Cerrar formulario" : "Agregar habitación"}
        </button>
      )}
      {mostrarFormulario && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-bold mb-4">
            {modoEdicion ? "Editar Habitación" : "Nueva Habitación"}
          </h3>
          <input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            onChange={handleChange}
            value={nuevaHabitacion.descripcion}
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          <input
            type="text"
            name="comodidades"
            placeholder="Comodidades"
            onChange={handleChange}
            value={nuevaHabitacion.comodidades}
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          <input
            type="text"
            name="imagen"
            placeholder="URL de Imagen"
            onChange={handleChange}
            value={nuevaHabitacion.imagen}
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          <input
            type="text"
            name="tarifas"
            placeholder="Tarifas"
            onChange={handleChange}
            value={nuevaHabitacion.tarifas}
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          <input
            type="number"
            name="evaluacion"
            placeholder="Evaluación (1-10)"
            min="1"
            max="10"
            onChange={handleChange}
            value={nuevaHabitacion.evaluacion}
            className="p-2 border border-gray-300 rounded mb-4 w-full"
          />
          <button
            onClick={modoEdicion ? editarHabitacion : agregarHabitacion}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {modoEdicion ? "Guardar Cambios" : "Guardar Habitación"}
          </button>
        </div>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {habitaciones.map((habitacion) => (
          <div key={habitacion._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <img
              src={habitacion.imagen}
              alt="Habitación"
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">{habitacion.descripcion}</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">Tarifa: {habitacion.tarifas}</p>
            <p className="text-gray-600 dark:text-gray-300">Evaluación: {habitacion.evaluacion}/10</p>
            <p className="text-gray-600 dark:text-gray-300">Comodidades: {habitacion.comodidades}</p>
            <div className="mt-2">
              <h4 className="font-semibold">Reviews:</h4>
              {habitacion.reviews && habitacion.reviews.length > 0 ? (
                habitacion.reviews.map((review, index) => (
                  <p key={`${habitacion._id}-review-${index}`} className="text-gray-600 dark:text-gray-300">- {review}</p>
                ))
              ) : (
                <p className="text-gray-500">No hay reviews disponibles.</p>
              )}
            </div>
            {isAdmin && (
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => iniciarEdicion(habitacion)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarHabitacion(habitacion._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Habitaciones;
