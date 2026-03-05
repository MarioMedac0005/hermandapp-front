import { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useSafeNavigate } from "@/hooks/useSafeNavigate";
import { Map, MapControls, MapMarker, MarkerContent, MarkerPopup, MapRoute } from "@/components/ui/map";
import { API_ENDPOINTS } from "@/config/api";
import {
    MapPin, ChevronLeft, Calendar, Info,
    Navigation, List, Sun, Moon,
    Flag, AlertCircle, X, Route,
    Church, Castle, ChessRook, Heart, Star,
    ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";

const POI_ICONS = {
    default: MapPin,
    church: Church,
    chessRook: ChessRook,
    castle: Castle,
    heart: Heart,
    star: Star,
    info: Info,
    flag: Flag
};

export default function ProcessionView() {
    const { id } = useParams();
    const { navigate, safeBack } = useSafeNavigate();
    const mapRef = useRef(null);
    const [procession, setProcession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mapTheme, setMapTheme] = useState('light');
    const [showSidebar, setShowSidebar] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const isPreview = searchParams.get('preview') === 'true';

    const routeEdges = useMemo(() => {
        if (!procession?.tramos?.length) return null;

        const visibleTramos = procession.tramos.filter(t => t.visible);
        if (visibleTramos.length === 0) return null;

        const startTramo = visibleTramos[0];
        const endTramo = visibleTramos[visibleTramos.length - 1];

        return {
            start: startTramo.coordinates?.[0],
            end: endTramo.coordinates?.[endTramo.coordinates.length - 1]
        };
    }, [procession]);

    useEffect(() => {
        if (!id) {
            setProcession(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setProcession(null);
        setError(null);

        if (isPreview) {
            const STORAGE_KEY = `procesion-editor-data-${id}`;
            const savedData = localStorage.getItem(STORAGE_KEY);
            if (savedData) {
                try {
                    const parsed = JSON.parse(savedData);
                    let checkinDate = parsed.processionData?.date;
                    if (parsed.processionData?.checkin_time < parsed.processionData?.checkout_time) {
                        const d = new Date(parsed.processionData?.date);
                        d.setDate(d.getDate() + 1);
                        checkinDate = d.toISOString().split('T')[0];
                    }

                    const mappedProcession = {
                        id: id,
                        name: parsed.processionData?.name || "Vista Previa",
                        description: parsed.processionData?.description || "",
                        type: parsed.processionData?.type || "christ",
                        checkout_time: parsed.processionData?.date && parsed.processionData?.checkout_time ? `${parsed.processionData.date}T${parsed.processionData.checkout_time}:00` : null,
                        checkin_time: checkinDate && parsed.processionData?.checkin_time ? `${checkinDate}T${parsed.processionData.checkin_time}:00` : null,
                        distance: "--",
                        tramos: parsed.tramos || [],
                        points: parsed.points?.map(p => ({
                            id: p.id,
                            lng: p.lng,
                            lat: p.lat,
                            name: p.name,
                            description: p.description,
                            category: p.category,
                            icon: p.icon,
                            color: p.color,
                            show_label: p.showLabel,
                            image_url: p.imageUrl,
                            rating: p.rating,
                            reviews: p.reviews
                        })) || [],
                        previewUrl: null
                    };
                    setProcession(mappedProcession);
                    setLoading(false);
                    return;
                } catch (e) {
                    console.error("Error leyendo datos de previsualización local", e);
                }
            }
            // Si no hay datos locales, permitimos que continúe el fetch normal al servidor
            // No mostramos error a menos que el fetch también falle más adelante
        }

        const token = localStorage.getItem("token");

        fetch(`${API_ENDPOINTS.processions}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        })
            .then(async res => {
                const data = await res.json();
                if (!res.ok) {
                    const error = new Error(data.message || 'Error al cargar la procesión');
                    error.status = res.status;
                    throw error;
                }
                return data;
            })
            .then(data => {
                if (data.success) {
                    setProcession(data.data);
                }
            })
            .catch(err => {
                console.error(err);
                setError({
                    message: err.message,
                    status: err.status
                });
            })
            .finally(() => setLoading(false));
    }, [id]);

    const flyToPoint = (lng, lat) => {
        if (mapRef.current) {
            mapRef.current.flyTo({
                center: [lng, lat],
                zoom: 18,
                speed: 1.5,
                essential: true
            });
        }
    };

    const flyToRoute = (coordinates) => {
        if (!mapRef.current || !coordinates.length) return;

        // Calculate bounds
        let minLng = Infinity, maxLng = -Infinity, minLat = Infinity, maxLat = -Infinity;
        coordinates.forEach(([lng, lat]) => {
            minLng = Math.min(minLng, lng);
            maxLng = Math.max(maxLng, lng);
            minLat = Math.min(minLat, lat);
            maxLat = Math.max(maxLat, lat);
        });

        mapRef.current.fitBounds(
            [[minLng, minLat], [maxLng, maxLat]],
            { padding: 100, duration: 2000 }
        );
    };

    if (loading) return (
        <div className="h-[100dvh] flex items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center gap-4">
                <div className="size-12 border-4 border-purple-600/20 border-t-purple-600 rounded-full animate-spin" />
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Cargando Recorrido...</p>
            </div>
        </div>
    );

    if (error || !procession) {
        const is404 = error?.status === 404;
        const is403 = error?.status === 403;

        return (
            <div className="h-[100dvh] flex items-center justify-center bg-slate-50 p-6">
                <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl shadow-slate-200 border border-slate-100 text-center">
                    <div className={cn(
                        "size-20 rounded-full flex items-center justify-center mx-auto mb-6",
                        is404 ? "bg-slate-50 text-slate-400" : "bg-amber-50 text-amber-500"
                    )}>
                        <AlertCircle className="size-10" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">
                        {is404 ? "No Encontrado" : is403 ? "Acceso Restringido" : "Ha ocurrido un error"}
                    </h2>
                    <p className="text-slate-500 font-medium leading-relaxed mb-8">
                        {is404 ? "La procesión que buscas no existe o ha sido eliminada." :
                            is403 ? "Esta procesión todavía no ha sido publicada o no tienes permiso para verla." :
                                (error?.message || "Por favor, inténtalo de nuevo más tarde.")}
                    </p>
                    <Button
                        className="w-full h-12 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold uppercase tracking-widest text-xs shadow-lg"
                        onClick={() => safeBack("/")}
                    >
                        Volver Atrás
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative h-[calc(100dvh-64px)] w-full bg-slate-100 overflow-hidden font-display flex flex-col md:flex-row">

            {/* SIDEBAR / BOTTOM SHEET INFO */}
            <aside className={cn(
                "fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 transition-all duration-500 ease-in-out flex flex-col shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.15)]",
                "md:relative md:w-[400px] md:h-full md:border-r md:border-t-0 md:translate-y-0",
                showSidebar ? "h-[60dvh] translate-y-0" : "h-[140px] md:h-full",
                !showSidebar && "md:-ml-[400px] md:translate-y-0"
            )}>
                {/* Drag Handle - Mobile Only */}
                <div
                    className="h-10 w-full flex items-center justify-center md:hidden cursor-pointer active:bg-slate-50 transition-colors border-b border-slate-50 group"
                    onClick={() => setShowSidebar(!showSidebar)}
                >
                    <div className={cn(
                        "transition-transform duration-500 ease-in-out text-slate-400 group-hover:text-slate-600",
                        showSidebar ? "rotate-0" : "rotate-180"
                    )}>
                        <ChevronDown className="size-6" />
                    </div>
                </div>

                {/* Header Info - Peek State on Mobile */}
                <div className="px-6 py-2 md:p-8 border-b border-slate-100 bg-slate-50/50 relative">
                    <div className="flex justify-between items-start mb-1">
                        <button
                            className="flex items-center gap-2 font-bold text-slate-700 hover:text-purple-600 transition-colors py-2"
                            onClick={() => safeBack("/")}>
                            <ChevronLeft className="size-5" />
                            <span>Volver</span>
                        </button>
                    </div>

                    <div className="md:block flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-col gap-2">
                                <span className={cn(
                                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border w-fit",
                                    procession.type === 'christ' ? "bg-purple-50 text-purple-600 border-purple-100" : "bg-blue-50 text-blue-600 border-blue-100",
                                    !showSidebar && "md:block hidden" // Hide tag on mobile peek
                                )}>
                                    {procession.type === 'christ' ? 'Paso de Cristo' : 'Paso de Palio'}
                                </span>
                                <h1 className="text-xl md:text-3xl font-black text-slate-950 uppercase tracking-tighter leading-tight truncate md:whitespace-normal">
                                    {procession.name}
                                </h1>
                            </div>

                            <div className="flex gap-4 md:mt-6">
                                <div className="flex items-center gap-2">
                                    <div className="size-6 md:size-8 bg-white rounded-lg shadow-sm flex items-center justify-center text-purple-600">
                                        <Calendar className="size-3 md:size-4" />
                                    </div>
                                    <div>
                                        <p className="text-[8px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest hidden md:block">Fecha</p>
                                        <p className="text-[10px] md:text-xs font-bold text-slate-800">
                                            {procession.checkout_time
                                                ? new Date(procession.checkout_time).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })
                                                : "N/D"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 border-l border-slate-200 pl-4 md:border-0 md:pl-0">
                                    <div className="size-6 md:size-8 bg-white rounded-lg shadow-sm flex items-center justify-center text-purple-600">
                                        <Navigation className="size-3 md:size-4" />
                                    </div>
                                    <div>
                                        <p className="text-[8px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest hidden md:block">Distancia</p>
                                        <p className="text-[10px] md:text-xs font-bold text-slate-800">{procession.distance || "--"} km</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* MINIMALIST TIMELINE - Expanded or Desktop Only */}
                    <div className={cn(
                        "mt-6 flex items-center gap-4 bg-white p-3 md:p-4 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden transition-all duration-300",
                        !showSidebar && "opacity-0 md:opacity-100"
                    )}>
                        <div className="absolute top-0 bottom-0 left-[31px] w-px bg-slate-100 hidden md:block" />

                        <div className="flex-1 flex items-center gap-2 md:gap-3">
                            <div className="size-3 md:size-4 rounded-full bg-slate-900 border-2 border-white shadow-sm z-10 shrink-0" />
                            <div>
                                <p className="text-[7px] md:text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1">Salida</p>
                                <p className="text-xs md:text-sm font-black text-slate-900 leading-none">
                                    {procession.checkout_time ? new Date(procession.checkout_time).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) : "--:--"}
                                </p>
                            </div>
                        </div>

                        <div className="w-px h-6 md:h-8 bg-slate-100" />

                        <div className="flex-1 flex items-center gap-2 md:gap-3 justify-end text-right">
                            <div>
                                <p className="text-[7px] md:text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1">Entrada</p>
                                <p className="text-xs md:text-sm font-black text-slate-900 leading-none">
                                    {procession.checkin_time ? new Date(procession.checkin_time).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) : "--:--"}
                                </p>
                            </div>
                            <div className="size-3 md:size-4 rounded-full bg-white border-2 border-slate-900 shadow-sm z-10 shrink-0" />
                        </div>
                    </div>
                </div>

                {/* Description & POIs - Scrolling Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 md:space-y-8 no-scrollbar">
                    <div>
                        <h3 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3 md:mb-4">Información Histórica</h3>
                        <p className="text-slate-600 text-sm leading-relaxed font-medium">
                            {procession.description || "No hay información histórica disponible para esta procesión."}
                        </p>
                    </div>

                    {procession.previewUrl && (
                        <div className="rounded-3xl overflow-hidden shadow-lg shadow-slate-200 border border-slate-100">
                            <img src={procession.previewUrl} alt={procession.name} className="w-full h-40 md:h-48 object-cover" />
                        </div>
                    )}

                    {/* TRAMOS / RECORRIDO INFO */}
                    {procession.tramos && procession.tramos.length > 0 && (
                        <div className="space-y-3 md:space-y-4">
                            <h3 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Recorrido por tramos</h3>
                            <div className="grid grid-cols-1 gap-2">
                                {procession.tramos.map((tramo) => (
                                    <button
                                        key={tramo.id}
                                        onClick={() => {
                                            flyToRoute(tramo.coordinates);
                                            if (window.innerWidth < 768) setShowSidebar(false);
                                        }}
                                        className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-purple-200 transition-all text-left group"
                                    >
                                        <div className="size-8 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: tramo.color + '20', color: tramo.color }}>
                                            <Route className="size-4" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[11px] font-black text-slate-900 uppercase tracking-tight group-hover:text-purple-600 transition-colors">
                                                {tramo.name}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {procession.points && procession.points.length > 0 && (
                        <div className="space-y-3 md:space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Puntos de Interés ({procession.points.length})</h3>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                {procession.points.map((point) => (
                                    <button
                                        key={point.id}
                                        onClick={() => {
                                            flyToPoint(point.lng, point.lat);
                                            if (window.innerWidth < 768) setShowSidebar(false);
                                        }}
                                        className="w-full group p-3 md:p-4 rounded-2xl border border-slate-100 bg-white hover:border-purple-200 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 text-left"
                                    >
                                        <div className="flex gap-4">
                                            {point.image_url ? (
                                                <img src={point.image_url} alt={point.name} className="size-14 md:size-16 rounded-xl object-cover shrink-0" />
                                            ) : (
                                                <div className="size-14 md:size-16 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 shrink-0">
                                                    <MapPin className="size-6" />
                                                </div>
                                            )}
                                            <div className="flex-1 py-1">
                                                <h4 className="text-xs md:text-sm font-bold text-slate-900 group-hover:text-purple-600 transition-colors uppercase tracking-tight line-clamp-1">{point.name}</h4>
                                                <p className="text-[10px] md:text-[11px] text-slate-500 line-clamp-2 mt-1 font-medium leading-normal">
                                                    {point.description || "Sin descripción disponible."}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* MAP AREA */}
            <div className="flex-1 relative order-first md:order-last">
                {/* Desktop Float Actions */}
                <div className="absolute top-6 right-6 z-30 hidden md:flex flex-col gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-11 rounded-2xl bg-white shadow-xl border border-slate-100 text-slate-600 hover:bg-slate-50"
                        onClick={() => setMapTheme(mapTheme === 'light' ? 'dark' : 'light')}
                    >
                        {mapTheme === 'light' ? <Moon className="size-5" /> : <Sun className="size-5" />}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-11 rounded-2xl bg-white shadow-xl border border-slate-100 text-slate-600 hover:bg-slate-50"
                        onClick={() => setShowSidebar(!showSidebar)}
                    >
                        {showSidebar ? <X className="size-5" /> : <List className="size-5" />}
                    </Button>
                </div >

                <Map
                    ref={mapRef}
                    center={procession.tramos?.[0]?.coordinates?.[0] || [-5.9845, 37.3891]}
                    zoom={15}
                    theme={mapTheme}
                    className="h-full w-full"
                >
                    <MapControls showZoom position={window.innerWidth < 768 ? "top-right" : "bottom-left"} />

                    {procession.tramos?.map(tramo => tramo.visible && (
                        <MapRoute
                            key={tramo.id}
                            coordinates={tramo.coordinates}
                            color={tramo.color}
                            width={tramo.width}
                            opacity={0.8}
                        />
                    ))}

                    {/* START MARKER */}
                    {routeEdges?.start && (
                        <MapMarker longitude={routeEdges.start[0]} latitude={routeEdges.start[1]}>
                            <MarkerContent>
                                <div className="size-5 md:size-6 rounded-full bg-slate-900 border-2 border-white shadow-lg flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                                    <div className="size-1.5 md:size-2 rounded-full bg-white animate-pulse" />
                                </div>
                                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white shadow-2xl px-2 py-0.5 rounded text-[7px] md:text-[8px] font-black whitespace-nowrap uppercase tracking-tight">
                                    Inicio
                                </div>
                            </MarkerContent>
                        </MapMarker>
                    )}

                    {/* END MARKER */}
                    {routeEdges?.end && (
                        <MapMarker longitude={routeEdges.end[0]} latitude={routeEdges.end[1]}>
                            <MarkerContent>
                                <div className="size-5 md:size-6 rounded-full bg-slate-100 border-2 border-slate-900 shadow-lg flex items-center justify-center text-slate-900 cursor-pointer hover:scale-110 transition-transform">
                                    <div className="size-1.5 md:size-2 rounded-full bg-slate-900" />
                                </div>
                                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white text-slate-900 border border-slate-200 shadow-2xl px-2 py-0.5 rounded text-[7px] md:text-[8px] font-black whitespace-nowrap uppercase tracking-tight">
                                    Fin
                                </div>
                            </MarkerContent>
                        </MapMarker>
                    )}

                    {procession.points?.map(point => {
                        const IconComp = POI_ICONS[point.icon] || MapPin;
                        return (
                            <MapMarker key={point.id} longitude={point.lng} latitude={point.lat}>
                                <MarkerContent>
                                    <div
                                        className="size-5 md:size-6 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform"
                                        style={{ backgroundColor: point.color }}
                                    >
                                        <IconComp className="size-3 md:size-3.5" />
                                    </div>
                                    {point.show_label && (
                                        <div className="absolute top-full mt-1 md:mt-2 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur shadow-2xl px-2 py-0.5 md:py-1 rounded-lg border border-slate-200 text-[8px] md:text-[10px] font-black text-slate-950 whitespace-nowrap pointer-events-none uppercase tracking-tight">
                                            {point.name}
                                        </div>
                                    )}
                                </MarkerContent>
                                <MarkerPopup>
                                    <div className="p-3 md:p-4 min-w-[200px] md:min-w-[260px]">
                                        {point.image_url && (
                                            <img src={point.image_url} alt={point.name} className="w-full h-28 md:h-32 object-cover rounded-xl mb-3 shadow-sm border border-slate-100" />
                                        )}
                                        <h3 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-tight leading-none mb-2">{point.name}</h3>
                                        <p className="text-[10px] md:text-[11px] text-slate-600 font-medium leading-relaxed">
                                            {point.description || "Sin descripción disponible."}
                                        </p>
                                    </div>
                                </MarkerPopup>
                            </MapMarker>
                        );
                    })}
                </Map>
            </div >
        </div >
    );
}

