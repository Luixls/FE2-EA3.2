// ruta: hotel-venezuela/src/pages/Blog.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function Blog() {
  const [articulos, setArticulos] = useState([]);
  const [nuevoArticulo, setNuevoArticulo] = useState({ title: '', content: '' });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchArticulos();
  }, []);

  const fetchArticulos = async () => {
    try {
      const response = await axios.get('/api/articulos'); // Cambia la ruta según tu configuración
      setArticulos(response.data);
    } catch (error) {
      console.error("Error al obtener artículos:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoArticulo({ ...nuevoArticulo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateArticulo();
    } else {
      await createArticulo();
    }
  };

  const createArticulo = async () => {
    try {
      await axios.post('/api/articulos', nuevoArticulo); // Cambia la ruta según tu configuración
      fetchArticulos();
      resetForm();
    } catch (error) {
      console.error("Error al crear artículo:", error);
    }
  };

  const updateArticulo = async () => {
    try {
      await axios.put(`/api/articulos/${editId}`, nuevoArticulo); // Cambia la ruta según tu configuración
      fetchArticulos();
      resetForm();
    } catch (error) {
      console.error("Error al actualizar artículo:", error);
    }
  };

  const handleEdit = (articulo) => {
    setNuevoArticulo({ title: articulo.title, content: articulo.content });
    setEditing(true);
    setEditId(articulo.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/articulos/${id}`); // Cambia la ruta según tu configuración
      fetchArticulos();
    } catch (error) {
      console.error("Error al eliminar artículo:", error);
    }
  };

  const resetForm = () => {
    setNuevoArticulo({ title: '', content: '' });
    setEditing(false);
    setEditId(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-800 dark:text-gray-100">
      <h2 className="text-4xl font-bold text-blue-600 mb-4 text-center dark:text-blue-400">Blog de Viajes y Turismo</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="title"
          value={nuevoArticulo.title}
          onChange={handleInputChange}
          placeholder="Título"
          required
          className="border p-2 mb-2"
        />
        <textarea
          name="content"
          value={nuevoArticulo.content}
          onChange={handleInputChange}
          placeholder="Contenido"
          required
          className="border p-2 mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">{editing ? 'Actualizar' : 'Crear'} Artículo</button>
      </form>
      <ul>
        {articulos.map(articulo => (
          <li key={articulo.id} className="mb-4">
            <h3 className="font-bold">{articulo.title}</h3>
            <p>{articulo.content}</p>
            <button onClick={() => handleEdit(articulo)} className="bg-yellow-500 text-white p-1 mr-2">Editar</button>
            <button onClick={() => handleDelete(articulo.id)} className="bg-red-500 text-white p-1">Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Blog;
