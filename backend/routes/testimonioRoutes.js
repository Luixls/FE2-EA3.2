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

// Agregar un testimonio (usuarios y admin)
router.post("/", autenticarToken, agregarTestimonio);

// Editar un testimonio (solo admin)
router.put("/:id", verificarAdmin, editarTestimonio);

// Eliminar un testimonio (solo admin)
router.delete("/:id", verificarAdmin, eliminarTestimonio);

module.exports = router;
