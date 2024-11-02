// ruta: backend/controllers/articuloController.js
const Articulo = require("../models/Articulo"); // Asegúrate de tener este modelo creado

exports.obtenerArticulos = async (req, res) => {
  try {
    const articulos = await Articulo.find();
    res.json(articulos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener artículos" });
  }
};

exports.agregarArticulo = async (req, res) => {
  const { title, content, imageUrl } = req.body;
  const userId = req.user.id;

  const nuevoArticulo = new Articulo({ 
    title, 
    content, 
    imageUrl, // Agregar la URL de la imagen
    author: userId 
  });

  try {
    await nuevoArticulo.save();
    res.status(201).json(nuevoArticulo);
  } catch (error) {
    res.status(500).json({ message: "Error al agregar artículo" });
  }
};

exports.editarArticulo = async (req, res) => {
  const { id } = req.params;
  const { title, content, imageUrl } = req.body;

  try {
    const articulo = await Articulo.findByIdAndUpdate(id, { title, content, imageUrl }, { new: true });
    res.json(articulo);
  } catch (error) {
    res.status(500).json({ message: "Error al editar artículo" });
  }
};

exports.eliminarArticulo = async (req, res) => {
  const { id } = req.params;
  try {
    await Articulo.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar artículo" });
  }
};
