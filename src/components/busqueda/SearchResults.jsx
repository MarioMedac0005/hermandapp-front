import CardBusqueda from "./CardBusqueda";

export default function SearchResults({ results, loading }) {
    if (loading) {
        return <p className="text-gray-500">Cargando resultados...</p>;
    }

    if (!results.length) {
        return <p className="text-gray-500">No se han encontrado resultados.</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map(item => (
                <CardBusqueda key={`${item.type}-${item.id}`} data={item} />
            ))}
        </div>
    );
}
