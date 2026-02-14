import { Map, MapControls, MapMarker, MarkerContent, MarkerPopup, MapRoute } from "@/components/ui/map";
import {
    MapPin,
    Cross,
    Anchor,
    Heart,
    Star,
    Info,
    Flag
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

function Cortejo({ cortejo }) {
    const isChrist = cortejo.type === "christ";

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-6 group hover:shadow-md transition-shadow">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Time Badge */}
                <div className="shrink-0 flex items-center gap-2 text-gray-500 font-mono text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-purple-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    {new Date(cortejo.checkout_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>

                <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-purple-700 transition-colors">
                        {cortejo.name}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-opacity-10 ${isChrist
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}>
                        {isChrist ? "Paso de Cristo" : "Paso de Palio"}
                    </span>
                </div>
            </div>

            {/* Si el cortejo tiene mapa, lo mostramos aquí o en una vista expandida */}
            {cortejo.mapData && (
                <div className="h-64 rounded-xl overflow-hidden border relative">
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
                                <MapMarker
                                    key={point.id}
                                    longitude={point.lng}
                                    latitude={point.lat}
                                >
                                    <MarkerContent>
                                        <div
                                            className="size-5 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white"
                                            style={{
                                                backgroundColor: point.color || "#9333ea"
                                            }}
                                        >
                                            <IconComp className="size-3" />
                                        </div>
                                    </MarkerContent>

                                    <MarkerPopup>
                                        <div className="p-2 min-w-[180px]">
                                            {point.imageUrl && (
                                                <img
                                                    src={point.imageUrl}
                                                    alt={point.name}
                                                    className="w-full h-20 object-cover rounded-md mb-2"
                                                />
                                            )}
                                            <p className="text-xs font-bold text-gray-900">
                                                {point.name}
                                            </p>
                                            <p className="text-[10px] text-gray-500 mt-0.5">
                                                {point.description}
                                            </p>
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