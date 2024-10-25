// ruta: backend/server.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

// Modelo de Usuario
const Usuario = require("./models/Usuario");

// Verificación o Creación de Admin
async function crearAdminSiNoExiste() {
  try {
    const usuarioExistente = await Usuario.findOne({ email: process.env.ADMIN_EMAIL });
    if (!usuarioExistente) {
      const hashPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      const nuevoAdmin = new Usuario({
        nombreUsuario: process.env.ADMIN_USERNAME,
        nombre: process.env.ADMIN_NOMBRE,
        email: process.env.ADMIN_EMAIL,
        password: hashPassword,
        rol: process.env.ADMIN_ROL,
      });
      await nuevoAdmin.save();
      console.log("Cuenta de administrador creada exitosamente");
    } else {
      console.log("La cuenta de administrador ya existe");
    }
  } catch (error) {
    console.error("Error al crear la cuenta de administrador:", error);
  }
}

// Llamada a la función de creación de admin
crearAdminSiNoExiste();

// Configuración del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
