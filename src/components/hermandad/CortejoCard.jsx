import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
    MapPin, Calendar, Clock, Navigation, ArrowRight,
    Edit2, Trash2, MapIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CortejoCard({
    cortejo,
    isAdmin = false,
    onDelete,
    onQuickEdit,
    staticMapUrl
}) {
    const navigate = useNavigate();

    // Info del mapa estático local
    const previewUrl = cortejo.preview_url || staticMapUrl;

    const formattedDate = useMemo(() => {
        const dateStr = cortejo.date || cortejo.checkout_time;
        if (!dateStr) return isAdmin ? "Sin fecha" : "Fecha pendiente";
        return new Date(dateStr).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: isAdmin ? '2-digit' : 'long',
            year: isAdmin ? 'numeric' : undefined
        });
    }, [cortejo.checkout_time, cortejo.date, isAdmin]);

    const formattedTime = useMemo(() => {
        if (!cortejo.checkout_time) return "Hora pendiente";
        return new Date(cortejo.checkout_time).toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }, [cortejo.checkout_time]);

    // Wrapper logic
    const CardWrapper = Link;
    const wrapperProps = {
        to: isAdmin
            ? `/hermandad/panel/editar-procesion/${cortejo.id}`
            : `/procesion/${cortejo.id}`
    };

    const handleEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onQuickEdit) onQuickEdit(cortejo);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onDelete) onDelete({ id: cortejo.id });
    };

    return (
        <CardWrapper
            {...wrapperProps}
            className={cn(
                "group relative bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 overflow-hidden flex flex-col"
            )}
        >
            {/* Top Visual Area */}
            <div className={cn(
                "relative overflow-hidden bg-slate-50 shrink-0",
                isAdmin ? "h-48" : "h-64"
            )}>
                {/* Visual Content: Static Map Fallback */}
                {previewUrl ? (
                    <div className="absolute inset-0 grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105">
                        <img
                            src={previewUrl}
                            alt={cortejo.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-200">
                        {isAdmin ? <MapIcon className="size-16 opacity-10" /> : <Navigation className="size-16 opacity-10" />}
                    </div>
                )}

                {/* Overlays / Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                    {isAdmin ? (
                        cortejo.status === 'published' ? (
                            <div className="bg-green-500/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-white/20 flex items-center gap-1.5 focus:outline-none">
                                <div className="size-1.5 bg-white rounded-full animate-pulse" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-white">PUBLICADO</span>
                            </div>
                        ) : (
                            <div className="bg-amber-500/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-white/20 flex items-center gap-1.5 focus:outline-none">
                                <div className="size-1.5 bg-white rounded-full" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-white">BORRADOR</span>
                            </div>
                        )
                    ) : (
                        <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg border border-white/50 flex items-center gap-2">
                            <Calendar className="size-3.5 text-purple-600" />
                            <span className="text-[11px] font-black uppercase tracking-wider text-slate-900">{formattedDate}</span>
                        </div>
                    )}
                </div>

                <div className="absolute top-6 right-6 z-10">
                    <div className={cn(
                        "px-4 py-1.5 rounded-full shadow-lg border backdrop-blur-md font-black text-[10px] uppercase tracking-widest",
                        cortejo.type === 'christ'
                            ? "bg-purple-600/90 text-white border-purple-400/50"
                            : cortejo.type === 'virgin'
                                ? "bg-blue-600/90 text-white border-blue-400/50"
                                : "bg-slate-600/90 text-white border-slate-400/50"
                    )}>
                        {cortejo.type === 'christ' ? 'Cristo' : cortejo.type === 'virgin' ? 'Palio' : 'Otro'}
                    </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />
            </div>

            {/* Content Area */}
            <div className={cn(
                "p-8 flex-1 flex flex-col relative bg-white rounded-t-[2.5rem] border-t border-slate-50 z-10",
                isAdmin ? "-mt-6 pt-6 px-6" : "-mt-8"
            )}>
                {/* HEADER */}
                <div className="flex items-start mb-4 gap-3">
                    <h3 title={cortejo.name}
                        className={cn(
                            "flex-1 min-w-0 font-black text-slate-950 uppercase tracking-tighter leading-tight group-hover:text-purple-600 transition-colors line-clamp-2 break-words",
                            isAdmin ? "text-xl" : "text-2xl"
                        )}>
                        {cortejo.name}
                    </h3>

                    {isAdmin ? (
                        <div className="flex gap-1 shrink-0 relative z-30">
                            <Button
                                title="Editar"
                                size="icon"
                                variant="ghost"
                                className="size-9 rounded-xl text-purple-600 hover:bg-purple-100 transition-colors shadow-sm border border-purple-100"
                                onClick={handleEdit}>
                                <Edit2 className="size-4" />
                            </Button>
                            <Button
                                title="Eliminar"
                                size="icon"
                                variant="ghost"
                                className="size-9 rounded-xl text-red-500 hover:bg-red-100 transition-colors shadow-sm border border-red-100"
                                onClick={handleDelete}>
                                <Trash2 className="size-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="size-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-purple-600 group-hover:text-white transition-all shrink-0">
                            <ArrowRight className="size-6" />
                        </div>
                    )}
                </div>

                {/* Details Row */}
                <div className="flex flex-wrap gap-4 mb-4 mt-auto">
                    {isAdmin ? (
                        <>
                            <div className="flex items-center gap-3 w-[calc(50%-0.5rem)] min-w-[120px]">
                                <div className="size-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-purple-600 transition-colors shrink-0">
                                    <Calendar className="size-5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest truncate">Fecha</p>
                                    <p className="text-sm font-black text-slate-800 tracking-tight">{formattedDate}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-[calc(50%-0.5rem)] min-w-[120px]">
                                <div className="size-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-purple-600 transition-colors shrink-0">
                                    <Navigation className="size-5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest truncate">Distancia</p>
                                    <p className="text-sm font-black text-slate-800 tracking-tight truncate">
                                        {(cortejo.distance !== null && cortejo.distance !== undefined) ? `${cortejo.distance} km` : '---'}
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-3">
                                <div className="size-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-purple-600 transition-colors">
                                    <Clock className="size-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Salida</p>
                                    <p className="text-sm font-black text-slate-800 tracking-tight">{formattedTime}</p>
                                </div>
                            </div>

                            {(cortejo.distance !== null && cortejo.distance !== undefined) && (
                                <div className="flex items-center gap-3">
                                    <div className="size-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-purple-600 transition-colors">
                                        <Navigation className="size-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Recorrido</p>
                                        <p className="text-sm font-black text-slate-800 tracking-tight">{cortejo.distance} km</p>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Public Only: POIs summary */}
                {!isAdmin && (
                    <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex -space-x-3 overflow-hidden">
                            {cortejo.points?.slice(0, 3).map((p, i) => (
                                <div
                                    key={i}
                                    className="inline-block size-8 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                                    {p.image_url ? (
                                        <img src={p.image_url} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <MapPin className="size-3.5 text-slate-400" />
                                    )}
                                </div>
                            ))}
                        </div>

                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            {cortejo.points_count || 0} Puntos de Interés
                        </span>
                    </div>
                )}
            </div>
        </CardWrapper>
    );
}
