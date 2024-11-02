// ruta: backend/controllers/testimonioController.js
const Testimonio = require("../models/Testimonio");

exports.obtenerTestimonios = async (req, res) => {
  try {
    const testimonios = await Testimonio.find()
      .populate("habitacionId", "descripcion")
      .populate("userId", "nombre"); // Popular el campo 'nombre' del usuario
    res.json(testimonios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener testimonios" });
  }
};

exports.agregarTestimonio = async (req, res) => {
  const { habitacionId, rating, comentario } = req.body;
  const userId = req.user.id;

  try {
    const nuevoTestimonio = new Testimonio({ habitacionId, userId, rating, comentario });
    await nuevoTestimonio.save();
    res.status(201).json(nuevoTestimonio);
  } catch (error) {
    res.status(500).json({ message: "Error al agregar testimonio" });
  }
};

exports.editarTestimonio = async (req, res) => {
  const { id } = req.params;
  const { rating, comentario } = req.body;

  try {
    const testimonio = await Testimonio.findByIdAndUpdate(id, { rating, comentario }, { new: true });
    res.json(testimonio);
  } catch (error) {
    res.status(500).json({ message: "Error al editar testimonio" });
  }
};

exports.eliminarTestimonio = async (req, res) => {
  const { id } = req.params;

  try {
    await Testimonio.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar testimonio" });
  }
};
