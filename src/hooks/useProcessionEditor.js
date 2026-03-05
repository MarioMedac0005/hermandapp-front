import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { API_ENDPOINTS } from "@/config/api";
import { toast } from "react-hot-toast";
import { getDistance, findSnapPoint } from "@/utils/mapUtils";
import { MapPin, Church, Castle, ChessRook, Heart, Star, Info, Flag } from "lucide-react";

export const POI_ICONS = {
    default: MapPin,
    church: Church,
    chessRook: ChessRook,
    castle: Castle,
    heart: Heart,
    star: Star,
    info: Info,
    flag: Flag
};

export const COLORS = [
    "#9333ea", "#2563eb", "#059669", "#dc2626", "#d97706", "#000000"
];

const PROCESSIONAL_SPEED_KMH = 0.8;

export function useProcessionEditor(routeParam) {
    const navigate = useNavigate();
    const { user } = useAuth();
    const mapRef = useRef(null);

    // GIS Core State
    const [tramos, setTramos] = useState([
        { id: 1, name: "Tramo Principal", coordinates: [], color: "#9333ea", width: 5, visible: true }
    ]);
    const [activeTramoId, setActiveTramoId] = useState(1);
    const [points, setPoints] = useState([]);
    const [mapTheme, setMapTheme] = useState('light');

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
    const [hasLoaded, setHasLoaded] = useState(false);
    const [processionId, setProcessionId] = useState(routeParam || null);

    // Autosave State
    const [hasLocalAutosave, setHasLocalAutosave] = useState(false);
    const [localAutosaveData, setLocalAutosaveData] = useState(null);
    const [lastLocalAutosaveTime, setLastLocalAutosaveTime] = useState(null);

    // Procession Metadata
    const [processionData, setProcessionData] = useState({
        id: null,
        name: routeParam ? "Cargando..." : "Nueva Procesión",
        description: "",
        type: "christ",
        date: new Date().toISOString().split('T')[0],
        checkout_time: "00:00",
        checkin_time: "23:59",
        status: "draft",
        updated_at: null
    });
    const [persistedStatus, setPersistedStatus] = useState("draft");

    const STORAGE_KEY = `procesion-editor-data-${routeParam || 'new'}`;

    // Modals internal state
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(!routeParam);
    const [isPublishWarningOpen, setIsPublishWarningOpen] = useState(false);
    const [isUnpublishConfirmOpen, setIsUnpublishConfirmOpen] = useState(false);
    const [isPublishConfirmOpen, setIsPublishConfirmOpen] = useState(false);

    const isNameValid = processionData.name?.trim().length > 0;

    useEffect(() => {
        if (!routeParam) return;

        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`${API_ENDPOINTS.processions}/${routeParam}`, {
                    headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
                });
                const data = await response.json();
                if (data.success) {
                    const p = data.data;
                    const checkoutRaw = p.checkout_time ? p.checkout_time.replace("T", " ") : "";
                    const checkinRaw = p.checkin_time ? p.checkin_time.replace("T", " ") : "";
                    const checkoutParts = checkoutRaw.split(" ");
                    const checkinParts = checkinRaw.split(" ");
                    setProcessionId(p.id ?? routeParam);
                    setProcessionData({
                        id: p.id ?? null,
                        name: p.name,
                        description: p.description || "",
                        type: p.type || "christ",
                        date: checkoutParts[0] || "",
                        checkout_time: checkoutParts[1]?.substring(0, 5) || "00:00",
                        checkin_time: checkinParts[1]?.substring(0, 5) || "23:59",
                        status: p.status || "draft",
                        updated_at: p.updated_at || null
                    });
                    setPersistedStatus(p.status || "draft");

                    if (p.tramos && p.tramos.length > 0) {
                        setTramos(p.tramos);
                        setActiveTramoId(p.tramos[0].id);
                    }
                    if (p.points) {
                        setPoints(p.points.map(pt => ({
                            id: pt.id,
                            lng: parseFloat(pt.lng),
                            lat: parseFloat(pt.lat),
                            name: pt.name,
                            description: pt.description || "",
                            category: pt.category || "General",
                            icon: pt.icon || "default",
                            color: pt.color || "#9333ea",
                            showLabel: pt.show_label ?? true,
                            imageUrl: pt.image_url || ""
                        })));
                    }

                    // Check local autosave
                    const savedDataStr = localStorage.getItem(STORAGE_KEY);
                    if (savedDataStr) {
                        try {
                            const savedData = JSON.parse(savedDataStr);
                            if (savedData && savedData.timestamp && p.updated_at) {
                                const localTime = savedData.timestamp;
                                const serverTime = new Date(p.updated_at).getTime();
                                if (localTime > serverTime) {
                                    setHasLocalAutosave(true);
                                    setLocalAutosaveData(savedData);
                                }
                            }
                        } catch (e) { }
                    }
                }
            } catch (error) {
                console.error("Error loading procession data", error);
                toast.error("Error al cargar los datos del servidor. Usando copia local...");

                const savedData = localStorage.getItem(STORAGE_KEY);
                if (savedData) {
                    const parsed = JSON.parse(savedData);
                    if (parsed.tramos) setTramos(parsed.tramos);
                    if (parsed.points) setPoints(parsed.points);
                    if (parsed.processionData) setProcessionData(parsed.processionData);
                    if (parsed.activeTramoId) setActiveTramoId(parsed.activeTramoId);
                }
            } finally {
                setHasLoaded(true);
            }
        };

        fetchData();
    }, [routeParam, STORAGE_KEY]);

    const saveToLocalStorage = () => {
        const timestamp = Date.now();
        const dataToSave = { tramos, points, processionData, activeTramoId, mapTheme, timestamp };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
        setLastLocalAutosaveTime(new Date(timestamp));
    };

    useEffect(() => {
        if (!hasLoaded) return;

        // Only autosave if there are actually unsaved changes
        if (!hasUnsavedChanges) return;

        const timer = setTimeout(() => {
            saveToLocalStorage();
        }, 2000);

        return () => clearTimeout(timer);
    }, [tramos, points, processionData, activeTramoId, mapTheme, STORAGE_KEY, hasLoaded, hasUnsavedChanges]);

    const handleRecoverAutosave = () => {
        if (localAutosaveData) {
            if (localAutosaveData.tramos) setTramos(localAutosaveData.tramos);
            if (localAutosaveData.points) setPoints(localAutosaveData.points);
            if (localAutosaveData.processionData) setProcessionData(localAutosaveData.processionData);
            if (localAutosaveData.activeTramoId) setActiveTramoId(localAutosaveData.activeTramoId);
            setHasUnsavedChanges(true);
            setLastLocalAutosaveTime(new Date(localAutosaveData.timestamp));
            toast.success("Cambios locales recuperados");
        }
        setHasLocalAutosave(false);
        setLocalAutosaveData(null);
    };

    const handleDiscardAutosave = () => {
        setHasLocalAutosave(false);
        setLocalAutosaveData(null);
        localStorage.removeItem(STORAGE_KEY);
        setLastLocalAutosaveTime(null);
        toast.success("Autoguardado descartado");
    };

    const handleDiscardChanges = () => {
        localStorage.removeItem(STORAGE_KEY);
        window.location.reload();
    };

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

    const pushToHistory = () => {
        const snapshot = { tramos: JSON.parse(JSON.stringify(tramos)), points: JSON.parse(JSON.stringify(points)) };
        setHistory(prev => [...prev.slice(-19), snapshot]);
        setRedoStack([]);
        setHasUnsavedChanges(true);
    };

    const undo = () => {
        if (history.length === 0) return;
        const last = history[history.length - 1];
        const current = { tramos: JSON.parse(JSON.stringify(tramos)), points: JSON.parse(JSON.stringify(points)) };
        setRedoStack(prev => [...prev, current]);
        setTramos(last.tramos);
        setPoints(last.points);
        setHistory(prev => prev.slice(0, -1));
    };

    const redo = () => {
        if (redoStack.length === 0) return;
        const next = redoStack[redoStack.length - 1];
        const current = { tramos: JSON.parse(JSON.stringify(tramos)), points: JSON.parse(JSON.stringify(points)) };
        setHistory(prev => [...prev, current]);
        setTramos(next.tramos);
        setPoints(next.points);
        setRedoStack(prev => prev.slice(0, -1));
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            if (e.key === 'Delete' || e.key === 'Backspace') {
                if (selectedType === 'point') {
                    pushToHistory();
                    setPoints(prev => prev.filter(p => p.id !== selectedId));
                    setSelectedId(null); setSelectedType(null);
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
                e.preventDefault(); undo();
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
                e.preventDefault(); redo();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedId, selectedType, activeTool, history, redoStack, tramos, points]);

    const activeTramo = useMemo(() => tramos.find(t => t.id === activeTramoId), [tramos, activeTramoId]);
    const selectedPoint = useMemo(() => points.find(p => p.id === selectedId), [points, selectedId]);

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
        return { distance: distKm.toFixed(2), time: `${timeH}h ${timeM}min` };
    }, [tramos]);

    const handleMapClick = (e) => {
        if (activeTool === 'marker') {
            pushToHistory();
            const newPoint = {
                id: Date.now(), lng: e.lngLat.lng, lat: e.lngLat.lat,
                name: "Nuevo punto", description: "Descripción del punto", category: "General",
                icon: "default", color: "#9333ea", showLabel: true, imageUrl: "",
                rating: 4.5, reviews: 10
            };
            setPoints([...points, newPoint]);
            setActiveTool('select');
            setSelectedId(newPoint.id);
            setSelectedType('point');
        } else if (activeTool === 'route') {
            const currentTramo = tramos.find(t => t.id === activeTramoId);
            if (!currentTramo) return;
            if (currentTramo.coordinates.length > 2 && mapRef.current) {
                const firstCoord = currentTramo.coordinates[0];
                const p1 = mapRef.current.project([e.lngLat.lng, e.lngLat.lat]);
                const p2 = mapRef.current.project(firstCoord);
                const pixDist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
                if (pixDist < 20) {
                    pushToHistory();
                    setTramos(prev => prev.map(t =>
                        t.id === activeTramoId ? { ...t, coordinates: [...t.coordinates, [...firstCoord]] } : t
                    ));
                    return;
                }
            }
            const snapCoord = findSnapPoint(e.lngLat.lng, e.lngLat.lat, tramos, mapRef.current);
            const finalCoord = snapCoord || [e.lngLat.lng, e.lngLat.lat];
            pushToHistory();
            setTramos(prev => prev.map(t =>
                t.id === activeTramoId ? { ...t, coordinates: [...t.coordinates, finalCoord] } : t
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
        setSelectedId(null); setSelectedType(null);
    };

    const handleDragRoutePoint = (tramoId, index, e) => {
        setTramos(prev => prev.map(t => {
            if (t.id === tramoId) {
                const newCoords = [...t.coordinates];
                const snapCoord = findSnapPoint(e.lng, e.lat, tramos, mapRef.current);
                const finalLngLat = snapCoord ? { lng: snapCoord[0], lat: snapCoord[1] } : e;
                newCoords[index] = [finalLngLat.lng, finalLngLat.lat];
                return { ...t, coordinates: newCoords };
            }
            return t;
        }));
        if (!hasUnsavedChanges) setHasUnsavedChanges(true);
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
        const newId = tramos.length > 0 ? Math.max(...tramos.map(t => t.id)) + 1 : 1;
        const newTramo = {
            id: newId, name: `Tramo ${newId}`, coordinates: [], color: COLORS[tramos.length % COLORS.length], width: 5, visible: true
        };
        setTramos([...tramos, newTramo]);
        setActiveTramoId(newId); setSelectedId(newId); setSelectedType('route');
    };

    const handleSave = async (forcedStatus = null) => {
        const destStatus = forcedStatus || processionData.status;

        // Corrected warning logic:
        // 1. If we are saving a procession that is ALREADY public on the server.
        if (destStatus === 'published' && persistedStatus === 'published' && !forcedStatus && !isPublishWarningOpen) {
            setIsPublishWarningOpen(true);
            return;
        }

        // 2. If we are publishing for the FIRST TIME from a Draft.
        if (destStatus === 'published' && persistedStatus === 'draft' && !forcedStatus && !isPublishConfirmOpen) {
            setIsPublishConfirmOpen(true);
            return;
        }

        setIsSaving(true);
        try {
            const token = localStorage.getItem("token");
            const brotherhoodId = user?.brotherhood_id || user?.brotherhood?.id;

            if (!brotherhoodId && !routeParam) {
                toast.error("No se pudo identificar la hermandad");
                return;
            }

            const updateKey = processionId ?? routeParam;
            const currentStatus = forcedStatus || processionData.status;

            const checkout = `${processionData.date} ${processionData.checkout_time}:00`;
            let checkinDate = processionData.date;
            if (processionData.checkin_time < processionData.checkout_time) {
                const d = new Date(processionData.date);
                d.setDate(d.getDate() + 1);
                checkinDate = d.toISOString().split('T')[0];
            }
            const checkin = `${checkinDate} ${processionData.checkin_time}:00`;

            const extractMapBlob = () => {
                return new Promise((resolve) => {
                    if (!mapRef.current) { resolve(null); return; }
                    const mapInstance = typeof mapRef.current.getMap === 'function' ? mapRef.current.getMap() : mapRef.current;
                    const allCoords = [];
                    tramos.forEach(t => { if (t.coordinates) t.coordinates.forEach(c => allCoords.push(c)); });
                    points.forEach(p => allCoords.push([p.lng, p.lat]));

                    const prevCenter = mapInstance.getCenter();
                    const prevZoom = mapInstance.getZoom();
                    const prevBearing = mapInstance.getBearing();
                    const prevPitch = mapInstance.getPitch();

                    const doSnapshot = () => {
                        mapInstance.getCanvas().toBlob((blob) => {
                            mapInstance.jumpTo({ center: prevCenter, zoom: prevZoom, bearing: prevBearing, pitch: prevPitch });
                            resolve(blob);
                        }, 'image/jpeg', 0.8);
                    };

                    if (allCoords.length >= 2) {
                        let minLng = Infinity, maxLng = -Infinity, minLat = Infinity, maxLat = -Infinity;
                        allCoords.forEach(([lng, lat]) => {
                            minLng = Math.min(minLng, lng); maxLng = Math.max(maxLng, lng);
                            minLat = Math.min(minLat, lat); maxLat = Math.max(maxLat, lat);
                        });
                        mapInstance.once('idle', () => {
                            mapInstance.zoomTo(mapInstance.getZoom() - 0.3, { duration: 0 });
                            mapInstance.once('idle', doSnapshot);
                        });
                        mapInstance.fitBounds([[minLng, minLat], [maxLng, maxLat]], { padding: 100, duration: 0, bearing: 0, pitch: 0 });
                    } else {
                        mapInstance.once('idle', doSnapshot);
                        mapInstance.triggerRepaint();
                    }
                });
            };

            const imageBlob = await extractMapBlob();
            const formData = new FormData();
            formData.append('name', processionData.name);
            if (processionData.description) formData.append('description', processionData.description);
            formData.append('type', processionData.type);
            formData.append('status', currentStatus);
            formData.append('brotherhood_id', brotherhoodId);
            formData.append('checkout_time', checkout);
            formData.append('checkin_time', checkin);
            formData.append('distance', parseFloat(stats.distance));
            formData.append('points_count', points.length);

            if (imageBlob) formData.append('preview', imageBlob, 'preview.jpg');

            formData.append('tramos', JSON.stringify(tramos.map(t => ({
                name: t.name, color: t.color, width: t.width, visible: t.visible, coordinates: t.coordinates
            }))));
            formData.append('points', JSON.stringify(points.map(p => ({
                name: p.name, description: p.description, lat: p.lat, lng: p.lng,
                image_url: p.imageUrl, icon: p.icon, color: p.color, show_label: p.showLabel
            }))));

            if (updateKey) formData.append('_method', 'PUT');

            const url = updateKey ? `${API_ENDPOINTS.processions}/${updateKey}` : API_ENDPOINTS.processions;
            const response = await fetch(url.toString(), {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
                body: formData
            });

            const data = await response.json();
            if (response.ok && data.success) {
                toast.success(forcedStatus === 'published' ? "¡Procesión publicada!" : "Cambios guardados");
                setHasUnsavedChanges(false);
                setIsPublishWarningOpen(false);
                const savedId = data?.data?.id ?? processionId ?? null;
                const newUpdatedAt = data?.data?.updated_at ?? new Date().toISOString();

                setProcessionData(prev => ({
                    ...prev,
                    status: currentStatus,
                    id: savedId,
                    updated_at: newUpdatedAt
                }));

                setPersistedStatus(currentStatus);

                setLastLocalAutosaveTime(null);
                localStorage.removeItem(STORAGE_KEY);

                if (!processionId && savedId) setProcessionId(savedId);
                if (!routeParam) navigate(`/hermandad/panel/editar-procesion/${savedId}`, { replace: true });
            } else {
                toast.error(data.message || "Error al guardar");
            }
        } catch (error) {
            console.error("Save error:", error);
            toast.error("Error de conexión");
        } finally {
            setIsSaving(false);
        }
    };

    const clearAll = () => {
        pushToHistory();
        setPoints([]);
        setTramos([{ id: 1, name: "Tramo Principal", coordinates: [], color: "#9333ea", width: 5, visible: true }]);
        setActiveTramoId(1); setSelectedId(null); setSelectedType(null);
    };

    const flyToPoint = (lng, lat) => {
        if (mapRef.current) {
            mapRef.current.flyTo({ center: [lng, lat], zoom: 17, speed: 1.2, curve: 1.42, essential: true });
        }
    };

    const handleSettingsClose = () => {
        if (!isNameValid) { toast.error("El nombre es obligatorio"); return; }
        setIsSettingsModalOpen(false);
    };

    return {
        // Refs
        mapRef,

        // Data & State
        tramos, activeTramoId, points, mapTheme,
        history, redoStack,
        activeTool, selectedId, selectedType, isSidebarCollapsed, hoveredId,
        isSaving, hasUnsavedChanges, isMobileScreen, processionId, processionData,
        stats, activeTramo, selectedPoint,

        // Modal states
        isConfirmModalOpen, setIsConfirmModalOpen,
        isSettingsModalOpen, setIsSettingsModalOpen,
        isPublishWarningOpen, setIsPublishWarningOpen,
        isUnpublishConfirmOpen, setIsUnpublishConfirmOpen,
        isPublishConfirmOpen, setIsPublishConfirmOpen,
        isNameValid, hasLocalAutosave, lastLocalAutosaveTime,

        // Setters for UI
        setTramos, setActiveTramoId, setPoints, setMapTheme,
        setActiveTool, setSelectedId, setSelectedType, setIsSidebarCollapsed, setHoveredId,
        setProcessionData,

        // Actions
        undo, redo, pushToHistory, handleMapClick, deleteRoutePoint, handleDragRoutePoint,
        updatePoint, updateTramo, addNewTramo, handleSave, clearAll, flyToPoint,
        handleSettingsClose, handleRecoverAutosave, handleDiscardAutosave, handleDiscardChanges,
        saveToLocalStorage, navigate
    };
}
