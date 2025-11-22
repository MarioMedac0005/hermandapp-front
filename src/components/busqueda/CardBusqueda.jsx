import pruebaImagen from "../../pages/busqueda/prueba_virgen_paso.jpg";

function CardBusqueda() {
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
      <img
        src={pruebaImagen}
        alt="Hermandad"
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <span className="text-xs font-semibold text-purple-600">
          HERMANDAD • SEVILLA
        </span>
        <h3 className="font-semibold text-lg mt-1">Hermandad del Gran Poder</h3>
        <p className="text-gray-600 text-sm mt-1">
          Pontificia y Real Hermandad y Cofradía de Nazarenos de Nuestro Padre
          Jesús...
        </p>
        <button className="mt-4 w-full bg-purple-100 text-purple-700 rounded-lg py-2 text-sm font-medium hover:bg-purple-200">
          Ver más
        </button>
      </div>
    </div>
  );
}

export default CardBusqueda;
