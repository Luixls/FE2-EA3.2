// ruta: backend/models/Habitacion.js
const mongoose = require("mongoose");

const HabitacionSchema = new mongoose.Schema({
  descripcion: { type: String, required: true },
  comodidades: { type: String, required: true },
  imagen: { type: String, required: true },
  tarifas: { type: String, required: true },
  reviews: { type: [String], default: [] },
  evaluacion: { type: Number, min: 1, max: 10, required: true },
  maximoHuespedes: { type: Number, required: true }, // Nuevo campo
});

module.exports = mongoose.model("Habitacion", HabitacionSchema);
