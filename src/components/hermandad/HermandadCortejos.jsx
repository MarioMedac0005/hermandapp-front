export default function HermandadCortejos({ cortejos }) {
    if (!cortejos?.length) return null;

    return (
        <section id="cortejos" className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-purple-600 rounded-full"></span>
                Cortejos Procesionales
            </h2>

            <div className="space-y-6">
                {cortejos.map(c => (
                    <Cortejo key={c.id} cortejo={c} />
                ))}
            </div>
        </section>
    );
}

function Cortejo({ cortejo }) {
    const isChrist = cortejo.type === "christ";
    
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row sm:items-center gap-6 group hover:shadow-md transition-shadow">
            {/* Time Badge */}
            <div className="shrink-0 flex items-center gap-2 text-gray-500 font-mono text-sm border-r-0 sm:border-r border-gray-100 pr-0 sm:pr-8 sm:min-w-[120px]">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-purple-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                {new Date(cortejo.checkout_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-purple-700 transition-colors">
                        {cortejo.name}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-opacity-10 ${isChrist ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                        {isChrist ? "Paso de Cristo" : "Paso de Palio"}
                    </span>
                </div>
                
                {/* Arrow Icon */}
                <div className="text-gray-300 group-hover:text-purple-500 transition-colors transform group-hover:translate-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
