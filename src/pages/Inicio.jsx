// ruta: hotel-venezuela/src/pages/Inicio.jsx
import React from "react";

function Inicio() {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-800 dark:text-gray-100">
      <h2 className="text-4xl font-bold text-blue-600 mb-4 text-center dark:text-blue-400">Bienvenidos al Hotel Venezuela</h2>
      <p className="text-lg text-gray-700 text-center max-w-2xl dark:text-gray-300">
        Ubicado en la Avenida Principal, Calle 3, Estado Mérida, Venezuela. Disfruta de una estancia inolvidable rodeado de belleza natural y comodidades de primera clase. ¡Esperamos darte la bienvenida pronto!
      </p>
    </div>
  );
}

export default Inicio;
