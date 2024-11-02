// ruta: backend/routes/articuloRoutes.js
const express = require("express");
const {
  obtenerArticulos,
  agregarArticulo,
  editarArticulo,
  eliminarArticulo,
} = require("../controllers/articuloController");
const verificarAdmin = require("../middleware/verificarAdmin");
const autenticarToken = require("../middleware/authMiddleware");

const router = express.Router();

// Obtener todos los artículos
router.get("/", obtenerArticulos);

// Agregar un artículo (solo admin)
router.post("/", autenticarToken, verificarAdmin, agregarArticulo);

// Editar un artículo (solo admin)
router.put("/:id", autenticarToken, verificarAdmin, editarArticulo);

// Eliminar un artículo (solo admin)
router.delete("/:id", autenticarToken, verificarAdmin, eliminarArticulo);

module.exports = router;
