function Cortejo({ cortejo }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-600">
            <p className="font-semibold text-purple-700 mb-1">
                {cortejo.name}
            </p>
            <p className="text-sm text-gray-600">
                Tipo: {cortejo.type === "christ" ? "Cristo" : "Palio"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
                Salida: {new Date(cortejo.checkout_time).toLocaleString()}
            </p>
        </div>
    );
}

export default function HermandadCortejos({ cortejos }) {
    if (!cortejos?.length) return null;

    return (
        <section id="cortejos" className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Cortejos Procesionales
            </h2>

            <div className="space-y-4">
                {cortejos.map(c => (
                    <Cortejo key={c.id} cortejo={c} />
                ))}
            </div>
        </section>
    );
}
