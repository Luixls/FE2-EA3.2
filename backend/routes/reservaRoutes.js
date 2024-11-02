// ruta: backend/routes/reservaRoutes.js
const express = require("express");
const { crearReserva } = require("../controllers/reservaController");
const router = express.Router();
const autenticarToken = require("../middleware/authMiddleware"); 

router.post("/", autenticarToken, crearReserva);

module.exports = router;
