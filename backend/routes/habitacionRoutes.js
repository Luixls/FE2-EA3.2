// ruta: backend/routes/habitacionRoutes.js
const express = require("express");
const router = express.Router();
const {
  obtenerHabitaciones,
  agregarHabitacion,
  editarHabitacion,
  eliminarHabitacion,
} = require("../controllers/habitacionController");
const verificarAdmin = require("../middleware/verificarAdmin");

// Obtener todas las habitaciones
router.get("/", obtenerHabitaciones);

// Agregar una habitación (solo admin)
router.post("/", verificarAdmin, agregarHabitacion);

// Editar una habitación (solo admin)
router.put("/:id", verificarAdmin, editarHabitacion);

// Eliminar una habitación (solo admin)
router.delete("/:id", verificarAdmin, eliminarHabitacion);

module.exports = router;
