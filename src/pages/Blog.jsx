// ruta: hotel-venezuela/src/pages/Blog.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/articulos";

const isAdmin = () => {
  return localStorage.getItem("rol") === "admin";
};

function Blog() {
  const [articulos, setArticulos] = useState([]);
  const [nuevoArticulo, setNuevoArticulo] = useState({ title: '', content: '', imageUrl: '' });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchArticulos();
  }, []);

  const fetchArticulos = async () => {
    try {
      const response = await axios.get(API_URL);
      setArticulos(Array.isArray(response.data) ? response.data : []);
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
      await axios.post(API_URL, nuevoArticulo, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      fetchArticulos();
      resetForm();
    } catch (error) {
      console.error("Error al crear artículo:", error);
    }
  };

  const updateArticulo = async () => {
    try {
      await axios.put(`${API_URL}/${editId}`, nuevoArticulo, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      fetchArticulos();
      resetForm();
    } catch (error) {
      console.error("Error al actualizar artículo:", error);
    }
  };

  const handleEdit = (articulo) => {
    setNuevoArticulo({ title: articulo.title, content: articulo.content, imageUrl: articulo.imageUrl });
    setEditing(true);
    setEditId(articulo._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      fetchArticulos();
    } catch (error) {
      console.error("Error al eliminar artículo:", error);
    }
  };

  const resetForm = () => {
    setNuevoArticulo({ title: '', content: '', imageUrl: '' });
    setEditing(false);
    setEditId(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-800 dark:text-gray-100">
      <h2 className="text-4xl font-bold text-blue-600 mb-4 text-center dark:text-blue-400">Blog de Viajes y Turismo</h2>
      
      {isAdmin() && (
        <form onSubmit={handleSubmit} className="mb-4 w-full max-w-md">
          <input
            type="text"
            name="title"
            value={nuevoArticulo.title}
            onChange={handleInputChange}
            placeholder="Título"
            required
            className="border p-2 mb-2 w-full"
          />
          <textarea
            name="content"
            value={nuevoArticulo.content}
            onChange={handleInputChange}
            placeholder="Contenido"
            required
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="imageUrl"
            value={nuevoArticulo.imageUrl}
            onChange={handleInputChange}
            placeholder="URL de la Imagen"
            className="border p-2 mb-2 w-full"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 w-full">{editing ? 'Actualizar' : 'Crear'} Artículo</button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {Array.isArray(articulos) ? (
          articulos.map(articulo => (
            <div
              key={articulo._id}
              className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg max-w-3xl w-full mx-auto"
            >
              {articulo.imageUrl && (
                <img src={articulo.imageUrl} alt="Imagen del artículo" className="w-full h-64 object-cover mb-4 rounded" />
              )}
              <h3 className="font-bold text-2xl mb-2 text-center">{articulo.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-justify">{articulo.content}</p>
              {isAdmin() && (
                <div className="flex space-x-2 mt-4 justify-center">
                  <button onClick={() => handleEdit(articulo)} className="bg-yellow-500 text-white p-2 rounded">Editar</button>
                  <button onClick={() => handleDelete(articulo._id)} className="bg-red-500 text-white p-2 rounded">Eliminar</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No hay artículos disponibles o ha ocurrido un error.</p>
        )}
      </div>
    </div>
  );
}

export default Blog;
