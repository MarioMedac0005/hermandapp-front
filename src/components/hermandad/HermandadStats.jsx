import {
    CalendarDaysIcon,
    UserCircleIcon,
    MapPinIcon,
} from "@heroicons/react/24/outline";

export default function HermandadStats({ stats }) {
    const items = [
        stats.foundationYear && {
            label: "Año de Fundación",
            value: stats.foundationYear,
            icon: CalendarDaysIcon,
        },
        stats.nazarenos && {
            label: "Nº de Nazarenos",
            value: stats.nazarenos,
            icon: UserCircleIcon,
        },
        stats.headquarters && {
            label: "Sede Canónica",
            value: stats.headquarters,
            icon: MapPinIcon,
        },
    ].filter(Boolean);

    if (!items.length) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {items.map((item, i) => (
                <Stat key={i} {...item} />
            ))}
        </div>
    );
}

function Stat({ icon: Icon, label, value }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-3 transition-transform hover:-translate-y-1 duration-300">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-full bg-purple-50">
                <Icon className="w-8 h-8" />
            </div>
            <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
                <p className="text-xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    );
}
