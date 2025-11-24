import CardBusqueda from "../../components/busqueda/CardBusqueda";
import Pagination from "../../components/Pagination";
import pruebaImagen from "./prueba_virgen_paso.jpg";

function Busqueda() {
  return (
    <div className="mt-10 mx-5">

      {/* GRID PRINCIPAL */}
      <div className="grid grid-cols-1 md:grid-cols-[0.6fr_2fr] gap-8">

        {/* FILTER */}
        <aside className="bg-white border border-gray-200 rounded-2xl p-6 h-fit">
          <h2 className="text-lg font-semibold mb-6">Filtrar Resultados</h2>

          <form className="space-y-4">
            <div>
              <label htmlFor="provincia" className="block text-sm font-medium text-gray-700">
                Provincia
              </label>
              <select
                id="provincia"
                name="provincia"
                className="mt-1 w-full border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm text-gray-700 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Todas</option>
                <option value="sevilla">Sevilla</option>
                <option value="cadiz">Cádiz</option>
                <option value="malaga">Málaga</option>
              </select>
            </div>

            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
                Tipo
              </label>
              <select
                id="tipo"
                name="tipo"
                className="mt-1 w-full border border-gray-300 rounded-lg py-2 pl3 pr-8 text-sm text-gray-700 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Todos</option>
                <option value="hermandad">Hermandad</option>
                <option value="banda">Banda</option>
              </select>
            </div>

            <div>
              <label htmlFor="estilo" className="block text-sm font-medium text-gray-700">
                Estilo Musical
              </label>
              <select
                id="estilo"
                name="estilo"
                className="mt-1 w-full border border-gray-300 rounded-lg py-2 pl3 pr-8 text-sm text-gray-700 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Todos</option>
                <option value="agrupacion">Agrupación Musical</option>
                <option value="bct">BCT</option>
                <option value="banda_musica">Banda de Música</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-purple-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-purple-700 transition"
            >
              Aplicar Filtros
            </button>
          </form>
        </aside>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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