import { useMemo } from "react";
import CortejoCard from "./CortejoCard";

export default function HermandadCortejos({ cortejos }) {
    const parseCheckoutDate = (cortejo) => {
        const raw = cortejo?.checkout_time ?? cortejo?.date;
        if (!raw) return null;
        const normalized = raw.includes(" ") ? raw.replace(" ", "T") : raw;
        const parsed = new Date(normalized);
        return Number.isNaN(parsed.getTime()) ? null : parsed;
    };

    const filteredCortejos = useMemo(() => {
        if (!cortejos) return [];
        return cortejos.filter(c => {
            const isPublished = c.status === 'published';
            if (!isPublished) return false;

            const checkoutDate = parseCheckoutDate(c);
            if (!checkoutDate) return false;

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const checkoutDay = new Date(checkoutDate);
            checkoutDay.setHours(0, 0, 0, 0);

            // Mostrar si es hoy o en el futuro (ignorando la hora de salida para que no desaparezca al empezar)
            return checkoutDay >= today;
        });
    }, [cortejos]);

    if (!filteredCortejos.length) return null;

    return (
        <section id="procesiones" className="mt-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
                        Próximas Procesiones
                    </h2>
                    <p className="text-slate-500 text-sm font-medium mt-1">Sigue el recorrido de nuestros pasos</p>
                </div>
                <div className="h-px flex-1 bg-slate-100 mx-8 hidden md:block" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredCortejos.map(c => (
                    <CortejoCard key={c.id} cortejo={c} />
                ))}
            </div>
        </section>
    );
}
