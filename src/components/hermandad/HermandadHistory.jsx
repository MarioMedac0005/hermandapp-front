export default function HermandadHistory({ name, city, description }) {
    if (!description && !name) return null;

    return (
        <section id="historia" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-purple-600 rounded-full"></span>
                Nuestra Historia
            </h2>

            <div className="prose prose-sm md:prose-base text-gray-600 max-w-none whitespace-pre-line leading-relaxed">
                {description ? (
                    description
                ) : (
                    <>
                        <p>
                            La <strong>{name}</strong>, con sede en {city}, es una corporación
                            religiosa de profunda tradición que forma parte del patrimonio
                            cultural y devocional de su localidad.
                        </p>
                        <p>
                            A lo largo de los años, la hermandad ha mantenido vivas sus
                            tradiciones, participando activamente en la vida religiosa y
                            social de la ciudad, especialmente durante la Semana Santa.
                        </p>
                    </>
                )}
            </div>
        </section>
    );
}
