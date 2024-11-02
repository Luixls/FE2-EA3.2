// ruta: hotel-venezuela/src/pages/Servicios.jsx
import React from "react";

function Servicios() {
  const servicios = [
    {
      nombre: "Gym",
      descripcion: "Un gimnasio totalmente equipado para satisfacer todas tus necesidades de ejercicio durante tu estancia.",
      imagen: "https://images.squarespace-cdn.com/content/v1/5696733025981d28a35ef8ab/954e09df-1889-4c41-906d-e857673711d9/new+123+1.jpg",
    },
    {
      nombre: "Spa",
      descripcion: "Relájate y renueva tu energía en nuestro spa, con masajes y tratamientos de alta calidad.",
      imagen: "https://www.hilton.com/im/en/PPTHIHH/19343689/double-treatment-cabin-hilton-hotel-tahiti.jpg?impolicy=crop&cw=5000&ch=3333&gravity=NorthWest&xposition=0&yposition=208&rw=1280&rh=854",
    },
    {
      nombre: "Piscina",
      descripcion: "Disfruta de nuestra piscina al aire libre con un ambiente relajante y vistas panorámicas.",
      imagen: "https://www.cibotoday.it/~media/horizontal-hi/11429080508368/bventuno-hotel-bari.jpg",
    },
    {
      nombre: "Restaurante",
      descripcion: "Gastronomía de primera clase en nuestro restaurante, con un menú que abarca platos locales e internacionales.",
      imagen: "https://www.lepalme.it/img-file/pag/large/it_cover-ristorante-hotel-eaf17efec488420896743d12ad87a7ea.jpg",
    },
    {
      nombre: "Salón de Fiestas",
      descripcion: "Ideal para eventos, celebraciones y reuniones, con todo lo que necesitas para una ocasión inolvidable.",
      imagen: "https://image-tc.galaxy.tf/wijpeg-8jvp42zdpureq2yq1qzlgtkwl/hermosillo-araiza8.jpg?width=1920",
    },    {
      nombre: "Tours Guiados",
      descripcion: "Explora los alrededores de Mérida con nuestros tours guiados, visitando las principales atracciones turísticas con la ayuda de un guía local.",
      imagen: "https://www.mageba-group.com/cz/data/docs/en/4864/Refsheet-Teleferico-de-Merid-mainimg.webp?variant=75611&v=1.0", // Cambia esta URL a una imagen adecuada para el tour
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-800 dark:text-gray-100">
      <h2 className="text-4xl font-bold text-blue-600 mb-8 text-center dark:text-blue-400">
        Nuestros Servicios
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl">
        {servicios.map((servicio, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 duration-300"
          >
            <img
              src={servicio.imagen}
              alt={servicio.nombre}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
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
