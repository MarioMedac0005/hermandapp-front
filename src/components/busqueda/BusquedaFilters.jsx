import { useState } from "react";

export default function BusquedaFilters({ initialFilters, onApply }) {
  const [filters, setFilters] = useState(
    initialFilters ?? { nombre: "", provincia: "", tipo: "" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onApply?.(filters);
  };

  return (
    <aside className="bg-white border border-gray-200 rounded-2xl p-6 h-fit">
      <h2 className="text-lg font-semibold mb-6">Filtrar Resultados</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={filters.nombre}
            onChange={handleChange}
            placeholder="Buscar por nombre"
            className="mt-1 w-full border border-gray-300 rounded-lg py-2 px-3 text-sm text-gray-700 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div>
          <label
            htmlFor="provincia"
            className="block text-sm font-medium text-gray-700"
          >
            Provincia
          </label>
          <select
            id="provincia"
            name="provincia"
            value={filters.provincia}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm text-gray-700 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">Todas</option>
            <option value="sevilla">Sevilla</option>
            <option value="cadiz">Cádiz</option>
            <option value="malaga">Málaga</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="tipo"
            className="block text-sm font-medium text-gray-700"
          >
            Tipo
          </label>
          <select
            id="tipo"
            name="tipo"
            value={filters.tipo}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm text-gray-700 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">Todos</option>
            <option value="hermandad">Hermandad</option>
            <option value="banda">Banda</option>
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
  );
}
