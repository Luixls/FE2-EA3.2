// ruta: backend/controllers/testimonioController.js
const Testimonio = require("../models/Testimonio");

exports.obtenerTestimonios = async (req, res) => {
  try {
    const testimonios = await Testimonio.find().populate('usuario habitacion');
    res.json(testimonios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener testimonios" });
  }
};

exports.agregarTestimonio = async (req, res) => {
  const { habitacion, review, valoracion } = req.body;
  const nuevoTestimonio = new Testimonio({
    usuario: req.user._id, // Asumiendo que el usuario autenticado se pasa en req.user
    habitacion,
    review,
    valoracion
  });
  
  try {
    await nuevoTestimonio.save();
    res.status(201).json(nuevoTestimonio);
  } catch (error) {
    res.status(500).json({ message: "Error al agregar testimonio" });
  }
};

exports.editarTestimonio = async (req, res) => {
  const { id } = req.params;
  const { review, valoracion } = req.body;
  try {
    const testimonio = await Testimonio.findByIdAndUpdate(id, { review, valoracion }, { new: true });
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
