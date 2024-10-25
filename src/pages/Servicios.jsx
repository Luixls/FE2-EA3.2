// ruta: hotel-venezuela/src/pages/Servicios.jsx
import React from "react";

function Servicios() {
  const servicios = [
    { nombre: "Gym", descripcion: "Un gimnasio totalmente equipado para satisfacer todas tus necesidades de ejercicio durante tu estancia." },
    { nombre: "Spa", descripcion: "Relájate y renueva tu energía en nuestro spa, con masajes y tratamientos de alta calidad." },
    { nombre: "Piscina", descripcion: "Disfruta de nuestra piscina al aire libre con un ambiente relajante y vistas panorámicas." },
    { nombre: "Restaurante", descripcion: "Gastronomía de primera clase en nuestro restaurante, con un menú que abarca platos locales e internacionales." },
    { nombre: "Salón de Fiestas", descripcion: "Ideal para eventos, celebraciones y reuniones, con todo lo que necesitas para una ocasión inolvidable." },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-800 dark:text-gray-100">
      <h2 className="text-4xl font-bold text-blue-600 mb-8 text-center dark:text-blue-400">Nuestros Servicios</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl">
        {servicios.map((servicio, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg text-center"
          >
            <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-300 mb-2">
              {servicio.nombre}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{servicio.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Servicios;
