// ruta: backend/server.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Conexión exitosa a MongoDB"))
.catch((error) => console.error("Error al conectar a MongoDB:", error));

// Rutas
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
const habitacionRoutes = require("./routes/habitacionRoutes");
app.use("/api/habitaciones", habitacionRoutes);
const articuloRoutes = require("./routes/articuloRoutes");
app.use("/api/articulos", articuloRoutes);
const testimonioRoutes = require("./routes/testimonioRoutes");
app.use("/api/testimonios", testimonioRoutes);
const reservaRoutes = require("./routes/reservaRoutes");
app.use("/api/reservas", reservaRoutes);


// Configuración del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
