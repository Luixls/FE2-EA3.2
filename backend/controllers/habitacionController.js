// ruta: backend/controllers/habitacionController.js
const Habitacion = require("../models/Habitacion");

// Obtener todas las habitaciones
const obtenerHabitaciones = async (req, res) => {
  try {
    const habitaciones = await Habitacion.find();
    res.json(habitaciones);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener habitaciones" });
  }
};

// Agregar una habitación (solo admin)
const agregarHabitacion = async (req, res) => {
  const { descripcion, comodidades, imagen, tarifas, evaluacion, maximoHuespedes } = req.body;
  
  try {
    const nuevaHabitacion = new Habitacion({
      descripcion,
      comodidades,
      imagen,
      tarifas,
      evaluacion,
      maximoHuespedes,
      reviews: [], // Inicializa reviews como un arreglo vacío
    });
    await nuevaHabitacion.save();
    res.status(201).json(nuevaHabitacion);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al agregar la habitación" });
  }
};

// Editar una habitación (solo admin)
const editarHabitacion = async (req, res) => {
  const { descripcion, comodidades, imagen, tarifas, evaluacion, maximoHuespedes } = req.body;

  try {
    const habitacionActualizada = await Habitacion.findByIdAndUpdate(
      req.params.id,
      { descripcion, comodidades, imagen, tarifas, evaluacion, maximoHuespedes },
      { new: true }
    );
    res.json(habitacionActualizada);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al editar la habitación" });
  }
};

// Eliminar una habitación (solo admin)
const eliminarHabitacion = async (req, res) => {
  try {
    await Habitacion.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Habitación eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la habitación" });
  }
};

module.exports = {
  obtenerHabitaciones,
  agregarHabitacion,
  editarHabitacion,
  eliminarHabitacion,
};
