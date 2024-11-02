// ruta: backend/models/Articulo.js
const mongoose = require("mongoose");

const articuloSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  imageUrl: { type: String }, // Nuevo campo para la URL de la imagen
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Articulo", articuloSchema);
