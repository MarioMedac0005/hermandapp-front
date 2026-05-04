import FilterInput from "../ui/FilterInput";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

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
                    <FilterInput
                        value={filters.q}
                        onChange={value => onChange("q", value)}
                        placeholder="La Esperanza..."
                    />
                </div>

                {/* PROVINCIA */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Provincia
                    </label>
                    <div className="relative mt-1">
                        <select
                            value={filters.city}
                            onChange={e => onChange("city", e.target.value)}
                            className="w-full appearance-none border border-gray-300 rounded-lg py-2 pl-3 pr-10 text-sm focus:ring-purple-500 focus:border-purple-500 bg-white"
                        >
                            <option value="">Todas</option>
                            {PROVINCES.map(p => (
                                <option key={p.value} value={p.value}>
                                    {p.label}
                                </option>
                            ))}
                        </select>
                        <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* TIPO */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Tipo
                    </label>
                    <div className="relative mt-1">
                        <select
                            value={filters.type}
                            onChange={e => onChange("type", e.target.value)}
                            className="w-full appearance-none border border-gray-300 rounded-lg py-2 pl-3 pr-10 text-sm focus:ring-purple-500 focus:border-purple-500 bg-white"
                        >
                            <option value="">Todos</option>
                            <option value="band">Banda</option>
                            <option value="brotherhood">Hermandad</option>
                        </select>
                        <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* BOTONES */}
                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        className="cursor-pointer flex-1 bg-purple-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-purple-700 transition"
                    >
                        Buscar
                    </button>

                    <button
                        type="button"
                        onClick={onReset}
                        className="cursor-pointer flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
                    >
                        Resetear
                    </button>
                </div>
            </form>
        </aside>
    );
}

export default SearchFilters;
