import {
    CalendarDaysIcon,
    UserCircleIcon,
    MapPinIcon,
} from "@heroicons/react/24/outline";

export default function HermandadStats({ stats }) {
    const items = [
        stats.foundationYear && {
            label: "Fundación",
            value: stats.foundationYear,
            icon: CalendarDaysIcon,
        },
        stats.nazarenos && {
            label: "Nazarenos",
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6">
            {items.map((item, i) => (
                <Stat key={i} {...item} />
            ))}
        </div>
    );
}

function Stat({ icon: Icon, label, value }) {
    return (
        <div className="bg-white p-3 md:p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-2 transition-all hover:border-purple-200/50 hover:shadow-md">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                <Icon className="size-5 md:size-6" />
            </div>
            <div>
                <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-0.5">{label}</p>
                <p className="text-sm md:text-lg font-bold text-gray-900 leading-tight">{value}</p>
            </div>
        </div>
    );
}
