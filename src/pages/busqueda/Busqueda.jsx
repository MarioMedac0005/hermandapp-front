import CardBusqueda from "../../components/busqueda/CardBusqueda";
import Pagination from "../../components/Pagination";
import pruebaImagen from "./prueba_virgen_paso.jpg";

function Busqueda() {
  return (

    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 mx-5">
        <aside className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-6">Filtrar Resultados</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="provincia" className="block text-sm font-medium text-gray-700">
                Provincia
              </label>
              <div className="mt-1 relative">
                <select
                  id="provincia"
                  name="provincia"
                  className="w-full border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Todas</option>
                  <option value="sevilla">Sevilla</option>
                  <option value="cadiz">Cádiz</option>
                  <option value="malaga">Málaga</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
                Tipo
              </label>
              <div className="mt-1 relative">
                <select
                  id="tipo"
                  name="tipo"
                  className="w-full border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Todos</option>
                  <option value="hermandad">Hermandad</option>
                  <option value="banda">Banda</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="estilo" className="block text-sm font-medium text-gray-700">
                Estilo Musical
              </label>
              <div className="mt-1 relative">
                <select
                  id="estilo"
                  name="estilo"
                  className="w-full border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Todos</option>
                  <option value="agrupacion">Agrupación Musical</option>
                  <option value="bct">BCT</option>
                  <option value="banda_musica">Banda de Música</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-purple-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-purple-700 transition"
            >
              Aplicar Filtros
            </button>
          </form>
        </aside>
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardBusqueda />
          <CardBusqueda />
          <CardBusqueda />
          <CardBusqueda />
          <CardBusqueda />
        </div>
      </div>
      <Pagination />
    </div>


  );
}

export default Busqueda;
