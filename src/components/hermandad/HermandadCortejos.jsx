import { Map, MapControls, MapMarker, MarkerContent, MarkerPopup, MapRoute } from "@/components/ui/map";
import {
    Plus, Trash2, Save, MapPin, Route, RotateCcw, X,
    Settings2, Eye, EyeOff, Palette, Type, Image as ImageIcon,
    Cross, Anchor, Heart, Star, Info, Flag
} from "lucide-react";

const POI_ICONS = {
    default: MapPin,
    cross: Cross,
    anchor: Anchor,
    heart: Heart,
    star: Star,
    info: Info,
    flag: Flag
};

function Cortejo({ cortejo }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-600 transition-all hover:shadow-md">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-gray-800">
                        {cortejo.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {cortejo.type === "christ" ? "Paso de Cristo" : "Paso de Palio"}
                    </p>
                </div>
                <div className="text-right">
                    <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">
                        {new Date(cortejo.checkout_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
            </div>

            {/* Si el cortejo tiene mapa, lo mostramos aquí o en una vista expandida */}
            {cortejo.mapData && (
                <div className="mt-4 h-64 rounded-xl overflow-hidden border relative group">
                    <Map
                        center={cortejo.mapData.center || [-5.9845, 37.3891]}
                        zoom={14}
                        interactive={true}
                    >
                        <MapControls showZoom />
                        {cortejo.mapData.route && (
                            <MapRoute
                                coordinates={cortejo.mapData.route}
                                color={cortejo.mapData.routeConfig?.color || "#9333ea"}
                                width={cortejo.mapData.routeConfig?.width || 4}
                                opacity={0.8}
                            />
                        )}
                        {cortejo.mapData.points?.map(point => {
                            const IconComp = POI_ICONS[point.icon] || MapPin;
                            return (
                                <MapMarker key={point.id} longitude={point.lng} latitude={point.lat}>
                                    <MarkerContent>
                                        <div
                                            className="size-5 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white"
                                            style={{ backgroundColor: point.color || "#9333ea" }}
                                        >
                                            <IconComp className="size-3" />
                                        </div>
                                        {point.showLabel && (
                                            <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-1.5 py-0.5 rounded border border-gray-100 shadow-sm text-[9px] font-bold text-gray-800 whitespace-nowrap pointer-events-none">
                                                {point.name}
                                            </div>
                                        )}
                                    </MarkerContent>
                                    <MarkerPopup>
                                        <div className="p-2 min-w-[180px]">
                                            {point.imageUrl && (
                                                <img src={point.imageUrl} alt={point.name} className="w-full h-20 object-cover rounded-md mb-2" />
                                            )}
                                            <p className="text-xs font-bold text-gray-900">{point.name}</p>
                                            <p className="text-[10px] text-gray-500 mt-0.5">{point.description}</p>
                                        </div>
                                    </MarkerPopup>
                                </MapMarker>
                            );
                        })}
                    </Map>
                </div>
            )}
        </div>
    );
}

export default function HermandadCortejos({ cortejos }) {
    if (!cortejos?.length) return null;

    return (
        <section id="cortejos" className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="size-2 bg-purple-600 rounded-full" />
                Cortejos Procesionales
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cortejos.map(c => (
                    <Cortejo key={c.id} cortejo={c} />
                ))}
            </div>
        </section>
    );
}
