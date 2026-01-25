import SearchInput from "../SearchInput";

const PROVINCES = [
    { label: "Almería", value: "Almeria" },
    { label: "Cádiz", value: "Cadiz" },
    { label: "Córdoba", value: "Cordoba" },
    { label: "Granada", value: "Granada" },
    { label: "Huelva", value: "Huelva" },
    { label: "Jaén", value: "Jaen" },
    { label: "Málaga", value: "Malaga" },
    { label: "Sevilla", value: "Sevilla" },
];

function SearchFilters({ filters, onChange, onSubmit, onReset }) {
    return (
        <aside className="bg-white border border-gray-200 rounded-2xl p-6 h-fit space-y-6">
            <h2 className="text-lg font-semibold">Filtrar Resultados</h2>

            <form className="space-y-4" onSubmit={onSubmit}>
                {/* BUSCADOR */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Buscar por nombre
                    </label>
                    <SearchInput
                        value={filters.q}
                        onChange={value => onChange("q", value)}
                        onSearch={onSubmit}
                        placeholder="Ej. Veracruz, Redención..."
                    />
                </div>

                {/* PROVINCIA */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Provincia
                    </label>
                    <select
                        value={filters.city}
                        onChange={e => onChange("city", e.target.value)}
                        className="mt-1 w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:ring-purple-500 focus:border-purple-500"
                    >
                        <option value="">Todas</option>
                        {PROVINCES.map(p => (
                            <option key={p.value} value={p.value}>
                                {p.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* TIPO */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Tipo
                    </label>
                    <select
                        value={filters.type}
                        onChange={e => onChange("type", e.target.value)}
                        className="mt-1 w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:ring-purple-500 focus:border-purple-500"
                    >
                        <option value="">Todos</option>
                        <option value="band">Banda</option>
                        <option value="brotherhood">Hermandad</option>
                    </select>
                </div>

                {/* BOTONES */}
                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        className="flex-1 bg-purple-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-purple-700 transition"
                    >
                        Buscar
                    </button>

                    <button
                        type="button"
                        onClick={onReset}
                        className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
                    >
                        Resetear
                    </button>
                </div>
            </form>
        </aside>
    );
}

export default SearchFilters;
