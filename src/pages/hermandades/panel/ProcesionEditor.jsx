import { useState, useMemo, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Map, MapControls, MapMarker, MarkerContent, MarkerPopup, MapRoute } from "@/components/ui/map";
import { Button } from "@/components/ui/button";
import {
    Plus, Trash2, Save, MapPin, Route, RotateCcw, X,
    Settings2, Eye, EyeOff, Heart, Star, Info, Flag, Layers,
    MousePointer2, Ruler, Clock, Send,
    Maximize, Sun, Moon, Undo2, Redo2, AlertTriangle,
    ExternalLink, Navigation, Church, Castle, ChessRook
} from "lucide-react";
import { cn } from "@/lib/utils";
import Modal from "@/components/Modal";

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

const COLORS = [
    "#9333ea", "#2563eb", "#059669", "#dc2626", "#d97706", "#000000"
];

const PROCESSIONAL_SPEED_KMH = 0.8; // Calibrado para ritmo de procesiones medio

// Haversine Distance Helper
const getDistance = (point1, point2) => {
    const EARTH_RADIUS = 6371000; // metros

    const lat1 = point1[1] * Math.PI / 180;
    const lat2 = point2[1] * Math.PI / 180;
    const deltaLat = (point2[1] - point1[1]) * Math.PI / 180;
    const deltaLon = (point2[0] - point1[0]) * Math.PI / 180;

    const sinLat = Math.sin(deltaLat / 2);
    const sinLon = Math.sin(deltaLon / 2);

    const a = sinLat * sinLat +
        Math.cos(lat1) * Math.cos(lat2) *
        sinLon * sinLon;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_RADIUS * c; // distancia en metros
};

export default function ProcesionEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const mapRef = useRef(null);

    // GIS Core State
    const [tramos, setTramos] = useState([
        { id: 1, name: "Tramo Principal", coordinates: [], color: "#9333ea", width: 5, visible: true }
    ]);
    const [activeTramoId, setActiveTramoId] = useState(1);
    const [points, setPoints] = useState([]);
    const [mapTheme, setMapTheme] = useState('light'); // 'light', 'dark'

    // History State (Undo/Redo)
    const [history, setHistory] = useState([]);
    const [redoStack, setRedoStack] = useState([]);

    // UI State
    const [activeTool, setActiveTool] = useState('select');
    const [selectedId, setSelectedId] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [hoveredId, setHoveredId] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [isMobileScreen, setIsMobileScreen] = useState(false);

    // Initial responsive check
    useEffect(() => {
        const checkScreen = () => {
            const width = window.innerWidth;
            setIsMobileScreen(width < 768);
            if (width < 1280) setIsSidebarCollapsed(true);
        };
        checkScreen();
        window.addEventListener('resize', checkScreen);
        return () => window.removeEventListener('resize', checkScreen);
    }, []);

    // Procession Metadata (for Settings)
    const [processionData, setProcessionData] = useState({
        name: "Procesión de Semana Santa",
        description: "Recorrido oficial por el centro histórico",
        date: "2026-03-29"
    });

    // Modal State
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    // Save Point for History
    const pushToHistory = () => {
        const snapshot = {
            tramos: JSON.parse(JSON.stringify(tramos)),
            points: JSON.parse(JSON.stringify(points))
        };
        setHistory(prev => [...prev.slice(-19), snapshot]);
        setRedoStack([]);
        setHasUnsavedChanges(true);
    };

    const undo = () => {
        if (history.length === 0) return;
        const last = history[history.length - 1];
        const current = {
            tramos: JSON.parse(JSON.stringify(tramos)),
            points: JSON.parse(JSON.stringify(points))
        };
        setRedoStack(prev => [...prev, current]);
        setTramos(last.tramos);
        setPoints(last.points);
        setHistory(prev => prev.slice(0, -1));
    };

    const redo = () => {
        if (redoStack.length === 0) return;
        const next = redoStack[redoStack.length - 1];
        const current = {
            tramos: JSON.parse(JSON.stringify(tramos)),
            points: JSON.parse(JSON.stringify(points))
        };
        setHistory(prev => [...prev, current]);
        setTramos(next.tramos);
        setPoints(next.points);
        setRedoStack(prev => prev.slice(0, -1));
    };

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            if (e.key === 'Delete' || e.key === 'Backspace') {
                if (selectedType === 'point') {
                    pushToHistory();
                    setPoints(prev => prev.filter(p => p.id !== selectedId));
                    setSelectedId(null);
                    setSelectedType(null);
                } else if (selectedType === 'route-point') {
                    pushToHistory();
                    const [tId, pIdx] = selectedId.replace('route-point-', '').split('-');
                    deleteRoutePoint(parseInt(tId), parseInt(pIdx));
                }
            }
            if (e.key === 'Escape') {
                if (activeTool !== 'select') setActiveTool('select');
                else { setSelectedId(null); setSelectedType(null); }
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
                e.preventDefault();
                undo();
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
                e.preventDefault();
                redo();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedId, selectedType, activeTool, history, redoStack, tramos, points]);

    const activeTramo = useMemo(() =>
        tramos.find(t => t.id === activeTramoId)
        , [tramos, activeTramoId]);

    const selectedPoint = useMemo(() =>
        points.find(p => p.id === selectedId)
        , [points, selectedId]);

    const stats = useMemo(() => {
        let totalMeters = 0;
        tramos.forEach(t => {
            if (t.visible && t.coordinates.length > 1) {
                for (let i = 0; i < t.coordinates.length - 1; i++) {
                    totalMeters += getDistance(t.coordinates[i], t.coordinates[i + 1]);
                }
            }
        });

        const distKm = totalMeters / 1000;
        const totalMinutes = (distKm / PROCESSIONAL_SPEED_KMH) * 60;
        const timeH = Math.floor(totalMinutes / 60);
        const timeM = Math.round(totalMinutes % 60);

        return {
            distance: distKm.toFixed(2),
            time: `${timeH}h ${timeM}min`
        };
    }, [tramos]);

    // Handlers
    const handleMapClick = (e) => {
        if (activeTool === 'marker') {
            pushToHistory();
            const newPoint = {
                id: Date.now(),
                lng: e.lngLat.lng,
                lat: e.lngLat.lat,
                name: "Nuevo punto",
                description: "Descripción del punto",
                category: "General",
                icon: "default",
                color: "#9333ea",
                showLabel: true,
                imageUrl: "https://images.unsplash.com/photo-1549413203-047fdefda280?w=400&h=300&fit=crop",
                rating: 4.5,
                reviews: 10
            };
            setPoints([...points, newPoint]);
            setActiveTool('select');
            setSelectedId(newPoint.id);
            setSelectedType('point');
        } else if (activeTool === 'route') {
            pushToHistory();
            setTramos(prev => prev.map(t =>
                t.id === activeTramoId
                    ? { ...t, coordinates: [...t.coordinates, [e.lngLat.lng, e.lngLat.lat]] }
                    : t
            ));
        }
    };

    const deleteRoutePoint = (tramoId, index) => {
        pushToHistory();
        setTramos(prev => prev.map(t => {
            if (t.id === tramoId) {
                const newCoords = [...t.coordinates];
                newCoords.splice(index, 1);
                return { ...t, coordinates: newCoords };
            }
            return t;
        }));
        setSelectedId(null);
        setSelectedType(null);
    };

    const updatePoint = (id, updates) => {
        pushToHistory();
        setPoints(points.map(p => p.id === id ? { ...p, ...updates } : p));
    };

    const updateTramo = (id, updates) => {
        pushToHistory();
        setTramos(tramos.map(t => t.id === id ? { ...t, ...updates } : t));
    };

    const addNewTramo = () => {
        pushToHistory();
        const newId = Math.max(...tramos.map(t => t.id)) + 1;
        const newTramo = {
            id: newId,
            name: `Tramo ${newId}`,
            coordinates: [],
            color: COLORS[tramos.length % COLORS.length],
            width: 5,
            visible: true
        };
        setTramos([...tramos, newTramo]);
        setActiveTramoId(newId);
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setHasUnsavedChanges(false);
        }, 1000);
    };

    const clearAll = () => {
        pushToHistory();
        setPoints([]);
        setTramos([{ id: 1, name: "Tramo Principal", coordinates: [], color: "#9333ea", width: 5, visible: true }]);
        setActiveTramoId(1);
        setSelectedId(null);
        setSelectedType(null);
    };

    const flyToPoint = (lng, lat) => {
        if (mapRef.current) {
            mapRef.current.flyTo({
                center: [lng, lat],
                zoom: 17,
                speed: 1.2,
                curve: 1.42,
                essential: true
            });
        }
    };

    return (
        <div className="relative h-[100dvh] w-full bg-slate-100 overflow-hidden font-display flex flex-col">

            {/* TOP NAVIGATION BAR (FLOATING) */}
            <nav className="absolute top-0 left-0 right-0 z-50 p-4 pointer-events-none">
                <div className="bg-white/95 backdrop-blur-md shadow-xl rounded-2xl px-6 py-2 flex justify-between items-center max-w-[1400px] mx-auto pointer-events-auto border border-slate-200/50">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-xl bg-slate-100 hover:bg-slate-200"
                            onClick={() => navigate("/hermandad/panel/procesiones")}
                        >
                            <X className="size-4" />
                        </Button>
                        <div className="w-px h-6 bg-slate-200"></div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                                    {id ? "Editor" : "Nueva Procesión"}
                                </h1>
                                {hasUnsavedChanges && (
                                    <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-md text-[9px] font-bold uppercase">
                                        Pendiente
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-xl h-8 px-2 xl:px-3 text-[11px] font-bold text-slate-600 hover:bg-slate-100"
                            onClick={() => setMapTheme(mapTheme === 'light' ? 'dark' : 'light')}
                        >
                            {mapTheme === 'light' ? <Moon className="size-3.5 xl:mr-1" /> : <Sun className="size-3.5 xl:mr-1" />}
                            <span className="hidden xl:inline">{mapTheme === 'light' ? "Oscuro" : "Claro"}</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-xl h-8 px-2 xl:px-3 text-[11px] font-bold text-slate-600 hover:bg-slate-100"
                            onClick={() => setIsSettingsModalOpen(true)}
                        >
                            <Settings2 className="size-3.5 xl:mr-1" />
                            <span className="hidden xl:inline">Ajustes</span>
                        </Button>
                        <Button
                            size="sm"
                            onClick={handleSave}
                            disabled={isSaving}
                            className={cn(
                                "rounded-xl h-8 px-3 xl:px-4 text-[11px] font-bold shadow-md transition-all",
                                hasUnsavedChanges ? "bg-purple-600 hover:bg-purple-700" : "bg-slate-900"
                            )}
                        >
                            {isSaving ? <RotateCcw className="size-3 animate-spin xl:mr-1" /> : <Save className="size-3 xl:mr-1" />}
                            <span className="hidden xl:inline">{isSaving ? "Guardando" : "Guardar"}</span>
                        </Button>
                        <Button size="sm" className="bg-white text-slate-900 border border-slate-200 rounded-xl h-8 px-3 xl:px-4 text-[11px] font-bold hover:bg-slate-50 shadow-sm">
                            <Send className="size-3 xl:mr-1" />
                            <span className="hidden xl:inline">Publicar</span>
                        </Button>
                    </div>
                </div>
            </nav>

            {/* FLOATING TOOLS PANEL (LEFT) */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
                <div className="bg-white/95 backdrop-blur-md shadow-xl rounded-2xl p-2 flex flex-col gap-2 border border-slate-200/50">
                    <Tooltip tool="Seleccionar">
                        <Button
                            variant={activeTool === 'select' ? "default" : "ghost"}
                            className={cn("size-10 rounded-xl", activeTool === 'select' ? "bg-purple-600 shadow-lg shadow-purple-100" : "text-slate-500 hover:bg-slate-50")}
                            onClick={() => setActiveTool('select')}
                        >
                            <MousePointer2 className="size-5" />
                        </Button>
                    </Tooltip>

                    <Tooltip tool="Ruta">
                        <Button
                            variant={activeTool === 'route' ? "default" : "ghost"}
                            className={cn("size-10 rounded-xl", activeTool === 'route' ? "bg-purple-600 shadow-lg shadow-purple-100" : "text-slate-500 hover:bg-slate-50")}
                            onClick={() => setActiveTool('route')}
                        >
                            <Route className="size-5" />
                        </Button>
                    </Tooltip>

                    <Tooltip tool="Punto">
                        <Button
                            variant={activeTool === 'marker' ? "default" : "ghost"}
                            className={cn("size-10 rounded-xl", activeTool === 'marker' ? "bg-purple-600 shadow-lg shadow-purple-100" : "text-slate-500 hover:bg-slate-50")}
                            onClick={() => setActiveTool('marker')}
                        >
                            <MapPin className="size-5" />
                        </Button>
                    </Tooltip>

                    <div className="h-px w-6 bg-slate-100 mx-auto my-1"></div>

                    <Button variant="ghost" className="size-10 rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-500" onClick={() => setIsConfirmModalOpen(true)}>
                        <Trash2 className="size-5" />
                    </Button>
                </div>

                <div className="bg-white/95 backdrop-blur-md shadow-xl rounded-2xl p-1 flex flex-col gap-1 border border-slate-200/50 items-center">
                    <Button variant="ghost" size="icon" className="size-8 rounded-lg text-slate-400 hover:bg-slate-50 flex items-center justify-center p-0" onClick={undo} disabled={history.length === 0}>
                        <Undo2 className="size-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8 rounded-lg text-slate-400 hover:bg-slate-50 flex items-center justify-center p-0" onClick={redo} disabled={redoStack.length === 0}>
                        <Redo2 className="size-3.5" />
                    </Button>
                </div>
            </div>

            {/* MAP CANVAS */}
            <div className="absolute inset-0 z-0">
                <Map
                    ref={mapRef}
                    center={[-5.9845, 37.3891]}
                    zoom={15}
                    theme={mapTheme}
                    onClick={handleMapClick}
                >
                    <MapControls
                        position="bottom-left"
                        showZoom={false}
                        showCompass
                        showFullscreen
                    />

                    {/* ROUTE LINES (Tramos) */}
                    {tramos.map(tramo => tramo.visible && tramo.coordinates.length > 0 && (
                        <MapRoute
                            key={tramo.id}
                            coordinates={tramo.coordinates}
                            color={tramo.color}
                            width={tramo.width}
                            opacity={activeTramoId === tramo.id ? 1 : 0.4}
                            onClick={() => { setSelectedId(tramo.id); setSelectedType('route'); setActiveTramoId(tramo.id); }}
                        />
                    ))}

                    {/* POIs */}
                    {points.map(point => {
                        const IconComp = POI_ICONS[point.icon] || MapPin;
                        return (
                            <MapMarker
                                key={point.id}
                                longitude={point.lng}
                                latitude={point.lat}
                                draggable
                                onDragEnd={(lngLat) => updatePoint(point.id, { lng: lngLat.lng, lat: lngLat.lat })}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedId(point.id);
                                    setSelectedType('point');
                                }}
                            >
                                <MarkerContent className={cn(
                                    "transition-all duration-300",
                                    selectedId === point.id && "scale-110 z-10",
                                    hoveredId === point.id && "scale-105 brightness-110 shadow-purple-500/50"
                                )}>
                                    <div
                                        className={cn(
                                            "size-5 rounded-full border-2 border-white shadow-xl flex items-center justify-center text-white cursor-pointer transition-all",
                                            selectedId === point.id && "ring-2 ring-purple-600/30 animate-pulse"
                                        )}
                                        style={{ backgroundColor: point.color }}
                                    >
                                        <IconComp className="size-3" />
                                    </div>
                                    {point.showLabel && (
                                        <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-1 py-0.5 rounded-md border border-slate-200 shadow-lg text-[8px] font-bold text-slate-800 whitespace-nowrap pointer-events-none uppercase tracking-tight">
                                            {point.name}
                                        </div>
                                    )}
                                </MarkerContent>
                                <MarkerPopup className="p-0 w-64 overflow-hidden shadow-2xl border-none">
                                    <div className="relative h-32 overflow-hidden">
                                        <img
                                            src={point.imageUrl}
                                            alt={point.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded-full text-[8px] font-black uppercase tracking-widest text-slate-900 border border-white shadow-sm">
                                            {point.category}
                                        </div>
                                    </div>
                                    <div className="p-4 space-y-3">
                                        <div>
                                            <div className="flex items-center gap-1.5 mb-1">
                                                <div className="flex items-center gap-0.5">
                                                    <Star className="size-3 fill-amber-400 text-amber-400" />
                                                    <span className="text-[10px] font-bold">{point.rating}</span>
                                                </div>
                                                <span className="text-[10px] text-slate-400 font-medium">({point.reviews} reseñas)</span>
                                            </div>
                                            <h3 className="font-black text-slate-900 text-sm leading-tight uppercase tracking-tight">{point.name}</h3>
                                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">{point.description}</p>
                                        </div>

                                        <div className="flex gap-2 pt-1">
                                            <Button size="sm" className="flex-1 h-8 bg-purple-600 hover:bg-purple-700 text-white font-bold text-[10px] rounded-xl">
                                                <Navigation className="size-3 mr-1.5" />
                                                CÓMO LLEGAR
                                            </Button>
                                            <Button size="sm" variant="outline" className="h-8 border-slate-200 text-slate-600 font-bold px-2 rounded-xl">
                                                <ExternalLink className="size-3" />
                                            </Button>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-full h-8 text-slate-400 hover:text-slate-900 font-bold text-[9px] uppercase tracking-widest"
                                            onClick={() => { setSelectedId(point.id); setSelectedType('point'); }}
                                        >
                                            EDITAR DETALLES
                                        </Button>
                                    </div>
                                </MarkerPopup>
                            </MapMarker>
                        );
                    })}

                    {/* ROUTE POINTS (SELECTABLE) */}
                    {tramos.map(tramo => tramo.visible && tramo.coordinates.map((coord, idx) => (
                        <MapMarker
                            key={`route-point-${tramo.id}-${idx}`}
                            longitude={coord[0]}
                            latitude={coord[1]}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedId(`route-point-${tramo.id}-${idx}`);
                                setSelectedType('route-point');
                                setActiveTramoId(tramo.id);
                            }}
                        >
                            <MarkerContent>
                                <div className={cn(
                                    "size-2 rounded-full border-2 shadow-xl transition-all cursor-pointer",
                                    mapTheme === 'dark' ? "border-white/40" : "border-slate-900/20",
                                    selectedId === `route-point-${tramo.id}-${idx}`
                                        ? "bg-red-500 scale-150 rotate-45"
                                        : (mapTheme === 'dark' ? "bg-white" : "bg-slate-900")
                                )} />
                            </MarkerContent>
                        </MapMarker>
                    )))}
                </Map>
            </div>

            {/* FLOATING LAYERS PANEL (RIGHT) */}
            <div className={cn(
                "absolute right-6 top-24 bottom-24 z-40 flex flex-col gap-4 pointer-events-none transition-all duration-500",
                isSidebarCollapsed ? "translate-x-64 opacity-0" : "w-72"
            )}>
                <div className="bg-white/95 backdrop-blur-md shadow-xl rounded-2xl border border-slate-200/50 flex flex-col h-full pointer-events-auto overflow-hidden transition-all">
                    {/* Header */}
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <div className="flex items-center gap-2">
                            <Layers className="size-4 text-purple-600" />
                            <h2 className="font-black text-[11px] text-slate-900 uppercase tracking-tight">Capas y Tramos</h2>
                        </div>
                        <Button variant="ghost" size="icon" className="size-7 rounded-lg" onClick={() => setIsSidebarCollapsed(true)}>
                            <X className="size-4 text-slate-400" />
                        </Button>
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-4 custom-scrollbar">
                        {/* TRAMOS SECTION */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between px-1">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Recorridos</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-5 rounded-md bg-purple-50 text-purple-600"
                                    onClick={addNewTramo}
                                >
                                    <Plus className="size-3" />
                                </Button>
                            </div>

                            {tramos.map(t => (
                                <div
                                    key={t.id}
                                    className={cn(
                                        "p-3 rounded-xl border transition-all cursor-pointer group flex items-center justify-between",
                                        activeTramoId === t.id ? "bg-purple-600 border-purple-600 shadow-md shadow-purple-100" : "bg-white border-slate-100 hover:border-purple-200"
                                    )}
                                    onClick={() => { setActiveTramoId(t.id); setSelectedId(t.id); setSelectedType('route'); }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={cn("size-8 rounded-lg flex items-center justify-center", activeTramoId === t.id ? "bg-white/20" : "bg-purple-50")} style={{ color: activeTramoId === t.id ? 'white' : t.color }}>
                                            <Route className="size-4" />
                                        </div>
                                        <div>
                                            <p className={cn("text-[10px] font-bold uppercase tracking-wide", activeTramoId === t.id ? "text-white" : "text-slate-900")}>{t.name}</p>
                                            <p className={cn("text-[9px] opacity-70 font-medium", activeTramoId === t.id ? "text-white" : "text-slate-400")}>{t.coordinates.length} puntos</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={cn("size-7 rounded-lg", activeTramoId === t.id ? "text-white hover:bg-white/10" : "text-slate-300 hover:text-purple-600")}
                                        onClick={(e) => { e.stopPropagation(); updateTramo(t.id, { visible: !t.visible }); }}
                                    >
                                        {t.visible ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                                    </Button>
                                </div>
                            ))}
                        </div>

                        {/* POIs SECTION */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between px-1">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Puntos de Interés</span>
                            </div>

                            <div className="space-y-1.5 overflow-y-auto max-h-64 custom-scrollbar pr-1">
                                {points.length === 0 && (
                                    <div className="p-4 border-2 border-dashed border-slate-100 rounded-xl text-center">
                                        <MapPin className="size-4 text-slate-200 mx-auto mb-1" />
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Sin puntos</p>
                                    </div>
                                )}
                                {points.map(p => (
                                    <div
                                        key={p.id}
                                        className={cn(
                                            "flex items-center justify-between p-2 pl-3 rounded-xl border text-[10px] font-bold transition-all cursor-pointer group",
                                            selectedId === p.id
                                                ? "bg-blue-50 border-blue-100 text-blue-700 shadow-sm"
                                                : "bg-white border-transparent hover:border-slate-100 text-slate-500 hover:text-slate-700 shadow-sm"
                                        )}
                                        onMouseEnter={() => setHoveredId(p.id)}
                                        onMouseLeave={() => setHoveredId(null)}
                                        onClick={() => {
                                            setSelectedId(p.id);
                                            setSelectedType('point');
                                            flyToPoint(p.lng, p.lat);
                                        }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="size-2 rounded-full" style={{ backgroundColor: p.color }} />
                                            <span className="line-clamp-1">{p.name}</span>
                                        </div>
                                        <Button variant="ghost" size="icon" className="size-5 opacity-0 group-hover:opacity-100 text-slate-400" onClick={(e) => { e.stopPropagation(); pushToHistory(); setPoints(prev => prev.filter(x => x.id !== p.id)); }}>
                                            <Trash2 className="size-3" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contextual Logic Panel */}
                    {(selectedType === 'point' || selectedType === 'route' || selectedType === 'route-point') && (
                        <div className="p-4 bg-slate-50 border-t border-slate-100 animate-in slide-in-from-bottom-5 duration-300">
                            {selectedType === 'point' && points.find(p => p.id === selectedId) && (() => {
                                const p = points.find(p => p.id === selectedId);
                                return (
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Punto de Interés</p>
                                            <Button variant="ghost" size="icon" className="size-5 text-slate-400" onClick={() => { setSelectedId(null); setSelectedType(null); }}>
                                                <X className="size-3" />
                                            </Button>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-1">Nombre</label>
                                                <input
                                                    className="w-full bg-white border border-slate-100 rounded-xl px-3 py-2 text-[11px] font-bold outline-none transition-all shadow-sm focus:ring-2 focus:ring-purple-100"
                                                    value={p.name}
                                                    onChange={(e) => updatePoint(p.id, { name: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-1">URL Imagen</label>
                                                <input
                                                    className="w-full bg-white border border-slate-100 rounded-xl px-3 py-2 text-[11px] font-bold outline-none transition-all shadow-sm focus:ring-2 focus:ring-purple-100"
                                                    value={p.imageUrl}
                                                    onChange={(e) => updatePoint(p.id, { imageUrl: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="space-y-1">
                                                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-1">Icono</label>
                                                    <div className="grid grid-cols-4 gap-1 bg-white p-1.5 rounded-xl shadow-sm border border-slate-100">
                                                        {Object.entries(POI_ICONS).map(([key, Icon]) => (
                                                            <button
                                                                key={key}
                                                                className={cn("size-6 flex items-center justify-center rounded-md transition-all", p.icon === key ? "bg-purple-600 text-white" : "text-slate-400 hover:bg-slate-50")}
                                                                onClick={() => updatePoint(p.id, { icon: key })}
                                                            >
                                                                <Icon className="size-3" />
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-1">Color</label>
                                                    <div className="flex flex-wrap gap-1 bg-white p-1.5 rounded-xl shadow-sm border border-slate-100 h-full">
                                                        {COLORS.map(c => (
                                                            <button
                                                                key={c}
                                                                className={cn("size-3 rounded-full border border-white shadow-sm ring-1 ring-slate-100", p.color === c && "ring-purple-600 ring-1 ring-offset-1")}
                                                                style={{ backgroundColor: c }}
                                                                onClick={() => updatePoint(p.id, { color: c })}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="w-full h-8 text-[10px] text-red-600 border-red-50 hover:bg-red-50 font-bold rounded-xl py-0 transition-all"
                                            onClick={() => {
                                                pushToHistory();
                                                setPoints(points.filter(x => x.id !== p.id));
                                                setSelectedId(null);
                                                setSelectedType(null);
                                            }}
                                        >
                                            <Trash2 className="size-3 mr-1" /> Eliminar
                                        </Button>
                                    </div>
                                )
                            })()}

                            {selectedType === 'route' && activeTramo && (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Ajustes del Tramo</p>
                                        <Button variant="ghost" size="icon" className="size-5 text-slate-400" onClick={() => { setSelectedId(null); setSelectedType(null); }}>
                                            <X className="size-3" />
                                        </Button>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="space-y-1">
                                            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-1">Nombre</label>
                                            <input
                                                className="w-full bg-white border border-slate-100 rounded-xl px-3 py-2 text-[11px] font-bold outline-none transition-all shadow-sm focus:ring-2 focus:ring-purple-100"
                                                value={activeTramo.name}
                                                onChange={(e) => updateTramo(activeTramo.id, { name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-1">Color de Ruta</label>
                                            <div className="grid grid-cols-7 gap-1 bg-white p-2 rounded-xl shadow-sm border border-slate-100">
                                                {COLORS.map(c => (
                                                    <button
                                                        key={c}
                                                        className={cn("size-5 rounded-full border border-white shadow-sm ring-1 ring-slate-100", activeTramo.color === c && "ring-purple-600 ring-1 ring-offset-1")}
                                                        style={{ backgroundColor: c }}
                                                        onClick={() => updateTramo(activeTramo.id, { color: c })}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex justify-between items-center text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-1">
                                                <span>Grosor</span>
                                                <span className="text-purple-600 font-black">{activeTramo.width}px</span>
                                            </div>
                                            <input
                                                type="range" min="1" max="15"
                                                className="w-full accent-purple-600 h-1 bg-slate-200 rounded-full"
                                                value={activeTramo.width}
                                                onChange={(e) => updateTramo(activeTramo.id, { width: parseInt(e.target.value) })}
                                            />
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="w-full h-8 text-[10px] text-red-600 border-red-50 hover:bg-red-50 font-bold rounded-xl py-0 transition-all"
                                            onClick={() => {
                                                if (tramos.length > 1) {
                                                    pushToHistory();
                                                    setTramos(tramos.filter(t => t.id !== activeTramo.id));
                                                    setActiveTramoId(tramos[0].id);
                                                    setSelectedId(null);
                                                    setSelectedType(null);
                                                }
                                            }}
                                            disabled={tramos.length <= 1}
                                        >
                                            <Trash2 className="size-3 mr-1" /> Eliminar Tramo
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {selectedType === 'route-point' && (
                                <div className="space-y-5 text-center py-4">
                                    <div className="size-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
                                        <Route className="size-8" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-bold text-slate-900 text-sm italic">Vértice de Ruta</h3>
                                        <p className="text-[10px] text-slate-500 font-medium px-4 leading-relaxed">
                                            Elimina este punto de inflexión para simplificar el recorrido.
                                        </p>
                                    </div>
                                    <Button
                                        variant="destructive"
                                        className="w-full bg-red-600 hover:bg-red-700 shadow-xl shadow-red-100 font-bold rounded-xl py-2 text-[11px] uppercase tracking-widest"
                                        onClick={() => {
                                            const [tId, pIdx] = selectedId.replace('route-point-', '').split('-');
                                            deleteRoutePoint(parseInt(tId), parseInt(pIdx));
                                        }}
                                    >
                                        ELIMINAR VÉRTICE
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* COLLAPSED SIDEBAR TOGGLE */}
            {isSidebarCollapsed && (
                <div className="absolute right-6 top-1/2 -translate-y-1/2 z-40">
                    <Button
                        onClick={() => setIsSidebarCollapsed(false)}
                        className="size-10 rounded-2xl bg-white shadow-xl border border-slate-200 text-slate-900 hover:bg-slate-50"
                    >
                        <Layers className="size-5" />
                    </Button>
                </div>
            )}

            {/* BOTTOM STATUS BAR */}
            <div className="absolute bottom-6 left-0 right-0 z-30 pointer-events-none">
                <div className="max-w-fit mx-auto bg-white/95 backdrop-blur-md shadow-xl rounded-2xl px-6 py-2 border border-slate-200/50 flex items-center gap-8 pointer-events-auto transition-transform hover:-translate-y-0.5">
                    <div className="flex items-center gap-2 group">
                        <div className="size-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                            <Ruler className="size-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest leading-none">Distancia</span>
                            <span className="text-[11px] font-black text-slate-900">{stats.distance} <span className="text-[8px] font-bold text-slate-400 uppercase">KM</span></span>
                        </div>
                    </div>

                    <div className="w-px h-6 bg-slate-100"></div>

                    <div className="flex items-center gap-2 group">
                        <div className="size-8 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                            <Clock className="size-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest leading-none">Tiempo Est.</span>
                            <span className="text-[11px] font-black text-slate-900">{stats.time}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* FLOATING HINT (WHEN DRAWING) */}
            {(activeTool === 'marker' || activeTool === 'route') && (
                <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[60] bg-slate-900/90 backdrop-blur-md text-white px-6 py-2 rounded-xl shadow-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
                    <div className="size-1.5 bg-purple-500 rounded-full animate-ping"></div>
                    {activeTool === 'marker' ? "Clic para marcar" : "Clic para trazar"}
                    <Button variant="ghost" size="icon" className="size-5 text-white/50 hover:text-white" onClick={() => setActiveTool('select')}>
                        <X className="size-3" />
                    </Button>
                </div>
            )}


            {/* MODALS */}
            <Modal
                open={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                title="¿Limpiar todo el mapa?"
                maxWidth="max-w-md"
            >
                <div className="space-y-4">
                    <div className="size-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <AlertTriangle className="size-8" />
                    </div>
                    <p className="text-sm text-center text-slate-600 font-medium leading-relaxed">
                        Esta acción eliminará todos los tramos del recorrido y todos los puntos de interés. Esta acción se puede deshacer con Ctrl+Z, pero es drástica.
                    </p>
                    <div className="flex gap-3 pt-2">
                        <Button variant="outline" className="flex-1 rounded-xl h-11 font-bold text-slate-600 border-slate-200" onClick={() => setIsConfirmModalOpen(false)}>
                            CANCELAR
                        </Button>
                        <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl h-11 font-bold shadow-lg shadow-red-100" onClick={() => { clearAll(); setIsConfirmModalOpen(false); }}>
                            SÍ, LIMPIAR TODO
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal
                open={isSettingsModalOpen}
                onClose={() => setIsSettingsModalOpen(false)}
                title="Ajustes de la Procesión"
                maxWidth="max-w-lg"
            >
                <div className="space-y-5">
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nombre de la Procesión</label>
                            <input
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold outline-none transition-all focus:ring-2 focus:ring-purple-100 focus:bg-white inset-shadow-sm"
                                value={processionData.name}
                                onChange={(e) => setProcessionData({ ...processionData, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Descripción</label>
                            <textarea
                                rows={4}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all focus:ring-2 focus:ring-purple-100 focus:bg-white resize-none inset-shadow-sm"
                                value={processionData.description}
                                onChange={(e) => setProcessionData({ ...processionData, description: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Fecha de Celebración</label>
                            <input
                                type="date"
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold outline-none transition-all focus:ring-2 focus:ring-purple-100 focus:bg-white inset-shadow-sm"
                                value={processionData.date}
                                onChange={(e) => setProcessionData({ ...processionData, date: e.target.value })}
                            />
                        </div>
                    </div>
                    <Button className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-black uppercase tracking-widest shadow-xl shadow-purple-100" onClick={() => { setIsSettingsModalOpen(false); handleSave(); }}>
                        GUARDAR CAMBIOS
                    </Button>
                </div>
            </Modal>

            {/* MOBILE WARNING OVERLAY */}
            {isMobileScreen && (
                <div className="fixed inset-0 z-[200] bg-slate-900 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-slate-900 to-purple-950">
                    <div className="size-20 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center mb-6 border border-white/20 animate-pulse">
                        <AlertTriangle className="size-10 text-amber-400" />
                    </div>
                    <h2 className="text-xl font-black text-white uppercase tracking-tight mb-3">Editor no compatible en móvil</h2>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs mb-8">
                        Este editor requiere una pantalla más grande para funcionar correctamente. Por favor, accede desde un ordenador o tablet.
                    </p>
                    <Button
                        variant="outline"
                        className="border-white/20 text-black hover:bg-white/10 rounded-xl px-8"
                        onClick={() => navigate("/hermandad/panel/procesiones")}
                    >
                        VOLVER AL PANEL
                    </Button>
                </div>
            )}
        </div>
    );
}

function Tooltip({ children, tool }) {
    return (
        <div className="relative group/tooltip">
            {children}
            <div className="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-[9px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-xl">
                {tool}
                <div className="absolute right-full top-1/2 -translate-y-1/2 -mr-1 border-4 border-transparent border-r-slate-900"></div>
            </div>
        </div>
    );
}
