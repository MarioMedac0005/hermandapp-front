export default function HermandadHistory({ name, city }) {
    if (!name && !city) return null;

    return (
        <section id="historia">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Nuestra Historia
            </h2>

            <div className="text-gray-800 leading-relaxed space-y-4">
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

                <p>
                    Actualmente, la hermandad continúa su labor organizativa y
                    patrimonial, adaptándose a los nuevos tiempos sin perder su
                    identidad histórica.
                </p>
            </div>
        </section>
    );
}
