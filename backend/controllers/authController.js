// ruta: backend/controllers/authController.js
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Función para crear el admin si no existe
async function crearAdminSiNoExiste() {
  try {
    const usuarioExistente = await Usuario.findOne({ email: process.env.ADMIN_EMAIL });
    if (!usuarioExistente) {
      const hashPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      const nuevoAdmin = new Usuario({
        username: process.env.ADMIN_USERNAME,
        nombre: process.env.ADMIN_NOMBRE,
        email: process.env.ADMIN_EMAIL,
        password: hashPassword,
        rol: process.env.ADMIN_ROL,
      });
      await nuevoAdmin.save();
      console.log("Cuenta de administrador creada exitosamente");
      console.log("Datos de cuenta admin:", "Username:", process.env.ADMIN_USERNAME, "| Contraseña:", process.env.ADMIN_PASSWORD)
      console.log("")
    } else {
      console.log("La cuenta de administrador ya existe");
      console.log("Datos de cuenta admin:", "Username:", process.env.ADMIN_USERNAME, "| Contraseña:", process.env.ADMIN_PASSWORD)
      console.log("")
    }
  } catch (error) {
    console.error("Error al crear la cuenta de administrador:", error);
  }
}

// Controlador para registrar un nuevo usuario
async function registrarUsuario(req, res) {
  const { username, nombre, email, password } = req.body;
  try {
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) return res.status(400).json({ mensaje: "El usuario ya existe" });

    const hashPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = new Usuario({
      username,
      nombre,
      email,
      password: hashPassword,
      rol: "usuario",
    });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: "Usuario registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el registro" });
  }
}

// Controlador para iniciar sesión
async function iniciarSesion(req, res) {
    const { emailOrUsername, password } = req.body; 
    try {
      const usuario = await Usuario.findOne({
        $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
      });
      if (!usuario) return res.status(400).json({ mensaje: "Credenciales incorrectas" });
  
      const esValido = await bcrypt.compare(password, usuario.password);
      if (!esValido) return res.status(400).json({ mensaje: "Credenciales incorrectas" });
  
      const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
      res.json({ token, mensaje: "Inicio de sesión exitoso" });
    } catch (error) {
      res.status(500).json({ mensaje: "Error en el inicio de sesión" });
    }
  }

module.exports = { registrarUsuario, iniciarSesion, crearAdminSiNoExiste };
