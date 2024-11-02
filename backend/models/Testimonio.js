// ruta: backend/models/Testimonio.js
const mongoose = require("mongoose");

const testimonioSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  habitacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Habitacion', required: true },
  review: { type: String, required: true },
  valoracion: { type: Number, min: 1, max: 10, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Testimonio", testimonioSchema);
