import {
    CalendarDaysIcon,
    UserCircleIcon,
    MapPinIcon,
} from "@heroicons/react/24/outline";

function Stat({ icon: Icon, label, value }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <Icon className="w-10 h-10 mx-auto mb-3 text-purple-600" />
            <p className="text-gray-500 text-sm">{label}</p>
            <p className="text-2xl font-bold text-purple-600">{value}</p>
        </div>
    );
}

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
