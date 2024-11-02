// ruta: backend/models/Testimonio.js
const mongoose = require("mongoose");

const testimonioSchema = new mongoose.Schema({
  habitacionId: { type: mongoose.Schema.Types.ObjectId, ref: "Habitacion", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  rating: { type: Number, required: true, min: 1, max: 10 },
  comentario: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Testimonio", testimonioSchema);
