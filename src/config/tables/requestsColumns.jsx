import {
    BuildingLibraryIcon,
    MusicalNoteIcon,
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    ShieldCheckIcon
} from "@heroicons/react/24/outline";

export const requestColumns = [
    {
        key: "organization",
        label: "Organización",
        render: (item) => (
            <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded ${item.type === 'brotherhood' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                    {item.type === 'brotherhood' ? <BuildingLibraryIcon className="size-4" /> : <MusicalNoteIcon className="size-4" />}
                </div>
                <div>
                    <p className="font-bold text-slate-700">{item.organization?.name || "N/A"}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-medium">{item.organization?.city}</p>
                </div>
            </div>
        ),
    },
    {
        key: "user",
        label: "Solicitante",
        render: (item) => (
            <div>
                <p className="text-slate-700 font-medium">{item.user?.name || ""} {item.user?.surname || ""}</p>
                <p className="text-xs text-slate-400">{item.user?.email || "N/A"}</p>
            </div>
        ),
    },
    {
        key: "status",
        label: "Estado",
        render: (item) => {
            const statusMap = {
                pending: {
                    label: "Pendiente",
                    icon: <ClockIcon className="size-3" />,
                    class: "bg-amber-50 text-amber-700 border-amber-200"
                },
                approved: {
                    label: "Aprobada",
                    icon: <CheckCircleIcon className="size-3" />,
                    class: "bg-emerald-50 text-emerald-700 border-emerald-200"
                },
                rejected: {
                    label: "Rechazada",
                    icon: <XCircleIcon className="size-3" />,
                    class: "bg-rose-50 text-rose-700 border-rose-200"
                },
            };

            const current = statusMap[item.status] || {
                label: item.status,
                icon: null,
                class: "bg-slate-50 text-slate-700 border-slate-200",
            };

            return (
                <span className={`flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full text-xs font-bold border ${current.class}`}>
                    {current.icon}
                    {current.label}
                </span>
            );
        },
    },
    {
        key: "audit",
        label: "Auditoría",
        render: (item) => {
            if (item.status === 'pending') return <span className="text-slate-300 italic text-xs">Sin procesar</span>;

            return (
                <div className="flex items-center gap-2">
                    <ShieldCheckIcon className="size-4 text-slate-400" />
                    <div className="text-[11px]">
                        <p className="text-slate-600 font-bold leading-tight">{item.approved_by || 'Admin'}</p>
                        <p className="text-slate-400 leading-tight">
                            {item.approved_at ? new Date(item.approved_at).toLocaleDateString() : ''}
                        </p>
                    </div>
                </div>
            );
        }
    },
    {
        key: "created_at",
        label: "Fecha",
        render: (item) => (
            <div className="text-slate-500">
                <p className="text-[11px] font-bold text-slate-600 uppercase tracking-tighter">Registrada</p>
                <p className="text-xs">{item.created_at ? new Date(item.created_at).toLocaleDateString('es-ES') : "N/A"}</p>
            </div>
        )
    },
];
