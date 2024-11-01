// ruta: backend/routes/articuloRoutes.js
const express = require("express");
const {
  obtenerArticulos,
  agregarArticulo,
  editarArticulo,
  eliminarArticulo,
} = require("../controllers/articuloController");
const verificarAdmin = require("../middleware/verificarAdmin");

const router = express.Router();

// Obtener todos los artículos
router.get("/", obtenerArticulos);

// Agregar un artículo (solo admin)
router.post("/", verificarAdmin, agregarArticulo);

// Editar un artículo (solo admin)
router.put("/:id", verificarAdmin, editarArticulo);

// Eliminar un artículo (solo admin)
router.delete("/:id", verificarAdmin, eliminarArticulo);

module.exports = router;
