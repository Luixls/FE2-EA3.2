// ruta: backend/models/Usuario.js

const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  nombreUsuario: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ["usuario", "admin"], default: "usuario" },
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
