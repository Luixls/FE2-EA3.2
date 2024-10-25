// ruta: hotel-venezuela/src/pages/Inicio.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function Inicio() {
  const [clima, setClima] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerClima = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Merida,VE&units=metric&lang=es&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
        );
        setClima(response.data);
      } catch (error) {
        console.error("Error al obtener el clima:", error);
        setError("No se pudo obtener el clima en este momento.");
      }
    };

    obtenerClima();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-800 dark:text-gray-100">
      <h2 className="text-4xl font-bold text-blue-600 mb-4 text-center dark:text-blue-400">Bienvenidos al Hotel Venezuela</h2>
      <p className="text-lg text-gray-700 text-center max-w-2xl dark:text-gray-300 mb-8">
        Ubicado en la Avenida Principal, Calle 3, Estado Mérida, Venezuela. Disfruta de una estancia inolvidable rodeado de belleza natural y comodidades de primera clase. ¡Esperamos darte la bienvenida pronto!
      </p>
      
      {clima ? (
        <div className="text-center bg-blue-200 dark:bg-blue-900 p-4 rounded-lg">
          <h3 className="text-2xl font-semibold">Clima en Mérida</h3>
          <p className="text-lg">{clima.weather[0].description}</p>
          <p className="text-4xl font-bold">{clima.main.temp}°C</p>
          <p>Sensación térmica: {clima.main.feels_like}°C</p>
          <p>Humedad: {clima.main.humidity}%</p>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p>Cargando clima...</p>
      )}
    </div>
  );
}

export default Inicio;
