// ruta: backend/routes/testimonioRoutes.js
const express = require("express");
const {
  obtenerTestimonios,
  agregarTestimonio,
  editarTestimonio,
  eliminarTestimonio,
} = require("../controllers/testimonioController");
const autenticarToken = require("../middleware/authMiddleware");
const verificarAdmin = require("../middleware/verificarAdmin");

const router = express.Router();

// Obtener todos los testimonios
router.get("/", obtenerTestimonios);

// Agregar un testimonio (solo usuarios registrados)
router.post("/", autenticarToken, agregarTestimonio);

// Editar un testimonio (solo admin)
router.put("/:id", autenticarToken, verificarAdmin, editarTestimonio);

// Eliminar un testimonio (solo admin)
router.delete("/:id", autenticarToken, verificarAdmin, eliminarTestimonio);

module.exports = router;
