// ruta: backend/models/Reserva.js
const mongoose = require("mongoose");

const ReservaSchema = new mongoose.Schema({
  nombreReserva: { type: String, required: true },
  email: { type: String, required: true },
  fechaCheckIn: { type: Date, required: true },
  fechaCheckOut: { type: Date, required: true },
  habitacionId: { type: mongoose.Schema.Types.ObjectId, ref: "Habitacion", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
});

module.exports = mongoose.model("Reserva", ReservaSchema);
