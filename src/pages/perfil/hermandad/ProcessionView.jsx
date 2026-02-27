import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Map, MapControls, MapMarker, MarkerContent, MarkerPopup, MapRoute } from "@/components/ui/map";
import { API_ENDPOINTS } from "@/config/api";
import {
    MapPin, ChevronLeft, Calendar, Info,
    Navigation, List, Maximize, Sun, Moon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const POI_ICONS = {
    default: MapPin
};

export default function ProcessionView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [procession, setProcession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mapTheme, setMapTheme] = useState('light');

    useEffect(() => {
        fetch(`${API_ENDPOINTS.processions}/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setProcession(data.data);
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return (
        <div className="h-[100dvh] flex items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center gap-4">
                <div className="size-12 border-4 border-purple-600/20 border-t-purple-600 rounded-full animate-spin" />
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Cargando Recorrido...</p>
            </div>
        </div>
    );

    if (!procession) return (
        <div className="h-[100dvh] flex items-center justify-center bg-slate-50">
            <div className="text-center">
                <p className="text-lg font-bold text-slate-900 mb-4">Procesión no encontrada</p>
                <Button onClick={() => navigate(-1)} variant="outline">Volver</Button>
            </div>
        </div>
    );

    return (
        <div className="relative h-[100dvh] w-full bg-slate-100 overflow-hidden font-display flex flex-col">
            {/* HUD HEADER */}
            <nav className="absolute top-0 left-0 right-0 z-50 p-4 pointer-events-none">
                <div className="bg-white/95 backdrop-blur-md shadow-xl rounded-2xl px-6 py-3 flex justify-between items-center max-w-[1200px] mx-auto pointer-events-auto border border-slate-200/50">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-xl bg-slate-100 hover:bg-slate-200"
                            onClick={() => navigate(-1)}
                        >
                            <ChevronLeft className="size-4" />
                        </Button>
                        <div>
                            <h1 className="text-sm font-black text-slate-900 uppercase tracking-tight">{procession.name}</h1>
                            <div className="flex items-center gap-2 opacity-60">
                                <Calendar className="size-3" />
                                <span className="text-[10px] font-bold uppercase">{procession.checkout_time?.split(' ')[0] || "Próximamente"}</span>
                            </div>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-xl bg-slate-50"
                        onClick={() => setMapTheme(mapTheme === 'light' ? 'dark' : 'light')}
                    >
                        {mapTheme === 'light' ? <Moon className="size-4" /> : <Sun className="size-4" />}
                    </Button>
                </div>
            </nav>

            {/* MAP AREA */}
            <div className="flex-1 relative">
                <Map
                    center={procession.tramos?.[0]?.coordinates?.[0] || [-5.9845, 37.3891]}
                    zoom={15}
                    theme={mapTheme}
                >
                    <MapControls showZoom />

                    {procession.tramos?.map(tramo => tramo.visible && (
                        <MapRoute
                            key={tramo.id}
                            coordinates={tramo.coordinates}
                            color={tramo.color}
                            width={tramo.width}
                            opacity={0.8}
                        />
                    ))}

                    {procession.points?.map(point => {
                        const IconComp = POI_ICONS[point.icono] || MapPin;
                        return (
                            <MapMarker key={point.id} longitude={point.lng} latitude={point.lat}>
                                <MarkerContent>
                                    <div
                                        className="size-5 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white"
                                        style={{ backgroundColor: point.color }}
                                    >
                                        <IconComp className="size-3" />
                                    </div>
                                    {point.show_label && (
                                        <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-1.5 py-0.5 rounded border border-gray-100 shadow-sm text-[9px] font-bold text-gray-800 whitespace-nowrap pointer-events-none uppercase">
                                            {point.name}
                                        </div>
                                    )}
                                </MarkerContent>
                                <MarkerPopup>
                                    <div className="p-3 min-w-[220px]">
                                        {point.url_imagen && (
                                            <img src={point.url_imagen} alt={point.name} className="w-full h-24 object-cover rounded-xl mb-2 shadow-sm" />
                                        )}
                                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight">{point.name}</h3>
                                        <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">{point.description}</p>
                                    </div>
                                </MarkerPopup>
                            </MapMarker>
                        );
                    })}
                </Map>
            </div>
        </div>
    );
}
