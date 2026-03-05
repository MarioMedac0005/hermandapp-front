import { useParams } from "react-router-dom";
import { Map, MapControls, MapMarker, MarkerContent, MarkerPopup, MapRoute, MarkerLabel } from "@/components/ui/map";
import { Button } from "@/components/ui/button";
import { Navigation, ExternalLink, Star, AlertTriangle, Layers, X, Ruler, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

import { useProcessionEditor, POI_ICONS } from "@/hooks/useProcessionEditor";
import { EditorTopBar } from "./editor-components/EditorTopBar";
import { EditorToolbar } from "./editor-components/EditorToolbar";
import { EditorSidebar } from "./editor-components/EditorSidebar";
import { EditorModals } from "./editor-components/EditorModals";

export default function ProcesionEditor() {
    const { id: routeParam } = useParams();
    const editor = useProcessionEditor(routeParam);

    return (
        <div className="relative h-[100dvh] w-full bg-slate-100 overflow-hidden font-display flex flex-col">
            <EditorTopBar
                id={routeParam}
                processionId={editor.processionId}
                hasUnsavedChanges={editor.hasUnsavedChanges}
                mapTheme={editor.mapTheme}
                setMapTheme={editor.setMapTheme}
                setIsSettingsModalOpen={editor.setIsSettingsModalOpen}
                handleSave={editor.handleSave}
                isSaving={editor.isSaving}
                processionData={editor.processionData}
                setIsUnpublishConfirmOpen={editor.setIsUnpublishConfirmOpen}
                setIsPublishConfirmOpen={editor.setIsPublishConfirmOpen}
                navigate={editor.navigate}
                lastLocalAutosaveTime={editor.lastLocalAutosaveTime}
                handleDiscardChanges={editor.handleDiscardChanges}
                saveToLocalStorage={editor.saveToLocalStorage}
            />

            <EditorToolbar
                activeTool={editor.activeTool}
                setActiveTool={editor.setActiveTool}
                setIsConfirmModalOpen={editor.setIsConfirmModalOpen}
                undo={editor.undo}
                redo={editor.redo}
                historyLength={editor.history.length}
                redoStackLength={editor.redoStack.length}
            />

            {/* MAP CANVAS */}
            <div className="absolute inset-0 z-0">
                <Map
                    ref={editor.mapRef}
                    center={[-5.9845, 37.3891]}
                    zoom={15}
                    theme={editor.mapTheme}
                    onClick={editor.handleMapClick}
                >
                    <MapControls position="bottom-left" showZoom={false} showCompass showFullscreen />

                    {/* ROUTE LINES (Tramos) */}
                    {editor.tramos.map(tramo => tramo.visible && tramo.coordinates.length > 0 && (
                        <MapRoute
                            key={tramo.id}
                            coordinates={tramo.coordinates}
                            color={tramo.color}
                            width={tramo.width}
                            opacity={editor.activeTramoId === tramo.id ? 1 : 0.4}
                            onClick={() => { editor.setSelectedId(tramo.id); editor.setSelectedType('route'); editor.setActiveTramoId(tramo.id); }}
                            onContextMenu={() => {
                                if (tramo.coordinates.length > 0) editor.deleteRoutePoint(tramo.id, tramo.coordinates.length - 1);
                            }}
                        />
                    ))}

                    {/* POIs */}
                    {editor.points.map(point => {
                        const IconComp = POI_ICONS[point.icon] || MapPin;
                        return (
                            <MapMarker
                                key={point.id}
                                longitude={point.lng}
                                latitude={point.lat}
                                draggable
                                onDragEnd={(lngLat) => editor.updatePoint(point.id, { lng: lngLat.lng, lat: lngLat.lat })}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    editor.setSelectedId(point.id);
                                    editor.setSelectedType('point');
                                }}
                            >
                                <MarkerContent className={cn(
                                    "transition-all duration-300",
                                    editor.selectedId === point.id && "scale-110 z-10",
                                    editor.hoveredId === point.id && "scale-105 brightness-110 shadow-purple-500/50"
                                )}>
                                    <div
                                        className={cn(
                                            "size-5 rounded-full border-2 border-white shadow-xl flex items-center justify-center text-white cursor-pointer transition-all",
                                            editor.selectedId === point.id && "ring-2 ring-purple-600/30 animate-pulse"
                                        )}
                                        style={{ backgroundColor: point.color }}
                                    >
                                        <IconComp className="size-3" />
                                    </div>
                                    {point.showLabel && (
                                        <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-1 py-0.5 rounded-md border border-slate-200 shadow-lg text-[8px] font-bold text-slate-800 whitespace-nowrap pointer-events-none uppercase tracking-tight max-w-[80px] truncate">
                                            {point.name}
                                        </div>
                                    )}
                                </MarkerContent>
                                <MarkerPopup className="p-0 w-64 overflow-hidden shadow-2xl border-none">
                                    {point.imageUrl && (
                                        <div className="relative h-32 overflow-hidden">
                                            <img src={point.imageUrl} alt={point.name} className="w-full h-full object-cover" />
                                            <div className="absolute top-2 right-2 px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded-full text-[8px] font-black uppercase tracking-widest text-slate-900 border border-white shadow-sm">
                                                {point.category}
                                            </div>
                                        </div>
                                    )}
                                    <div className="p-4 space-y-3">
                                        <div>
                                            <div className="flex items-center gap-1.5 mb-1">
                                                <div className="flex items-center gap-0.5">
                                                    <Star className="size-3 fill-amber-400 text-amber-400" />
                                                    <span className="text-[10px] font-bold">{point.rating}</span>
                                                </div>
                                                <span className="text-[10px] text-slate-400 font-medium">({point.reviews} reseñas)</span>
                                            </div>
                                            {!point.imageUrl && (
                                                <div className="inline-block px-2 py-0.5 bg-slate-100 rounded-full text-[8px] font-black uppercase tracking-widest text-slate-500 border border-slate-200 shadow-sm mb-2">
                                                    {point.category}
                                                </div>
                                            )}
                                            <h3 className="font-black text-slate-900 text-sm leading-tight uppercase tracking-tight truncate">{point.name}</h3>
                                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1 line-clamp-3">{point.description}</p>
                                        </div>
                                        <div className="flex gap-2 pt-1">
                                            <Button size="sm" className="flex-1 h-8 bg-purple-600 hover:bg-purple-700 text-white font-bold text-[10px] rounded-xl">
                                                <Navigation className="size-3 mr-1.5" />CÓMO LLEGAR
                                            </Button>
                                            <Button size="sm" variant="outline" className="h-8 border-slate-200 text-slate-600 font-bold px-2 rounded-xl">
                                                <ExternalLink className="size-3" />
                                            </Button>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-full h-8 text-slate-400 hover:text-slate-900 font-bold text-[9px] uppercase tracking-widest"
                                            onClick={() => { editor.setSelectedId(point.id); editor.setSelectedType('point'); }}
                                        >
                                            EDITAR DETALLES
                                        </Button>
                                    </div>
                                </MarkerPopup>
                            </MapMarker>
                        );
                    })}

                    {/* ROUTE POINTS */}
                    {editor.tramos.map(tramo => tramo.visible && tramo.coordinates.map((coord, idx) => {
                        const isFirst = idx === 0;
                        const isLast = idx === tramo.coordinates.length - 1;
                        const isClosed = tramo.coordinates.length > 2 &&
                            tramo.coordinates[0][0] === tramo.coordinates[tramo.coordinates.length - 1][0] &&
                            tramo.coordinates[0][1] === tramo.coordinates[tramo.coordinates.length - 1][1];

                        return (
                            <MapMarker
                                key={`route-point-${tramo.id}-${idx}`}
                                longitude={coord[0]}
                                latitude={coord[1]}
                                draggable={true}
                                onDragStart={() => editor.pushToHistory()}
                                onDrag={(e) => editor.handleDragRoutePoint(tramo.id, idx, e)}
                                onDragEnd={(e) => editor.handleDragRoutePoint(tramo.id, idx, e)}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (editor.activeTool === 'route') {
                                        if (idx === 0 && tramo.id === editor.activeTramoId && tramo.coordinates.length > 2) {
                                            editor.pushToHistory();
                                            editor.setTramos(prev => prev.map(t =>
                                                t.id === tramo.id ? { ...t, coordinates: [...t.coordinates, [...tramo.coordinates[0]]] } : t
                                            ));
                                            return;
                                        }
                                        editor.pushToHistory();
                                        editor.setTramos(prev => prev.map(t =>
                                            t.id === editor.activeTramoId ? { ...t, coordinates: [...t.coordinates, [coord[0], coord[1]]] } : t
                                        ));
                                        return;
                                    }
                                    editor.setSelectedId(`route-point-${tramo.id}-${idx}`);
                                    editor.setSelectedType('route-point');
                                    editor.setActiveTramoId(tramo.id);
                                }}
                                onContextMenu={(e) => { e.stopPropagation(); }}
                            >
                                <MarkerContent>
                                    <div className={cn(
                                        "size-2 rounded-full border-2 shadow-xl transition-all cursor-pointer",
                                        editor.mapTheme === 'dark' ? "border-white/40" : "border-slate-900/20",
                                        editor.selectedId === `route-point-${tramo.id}-${idx}`
                                            ? "bg-red-500 scale-150 rotate-45"
                                            : (editor.mapTheme === 'dark' ? "bg-white" : "bg-slate-900")
                                    )} />
                                    {isFirst && !isClosed && (
                                        <MarkerLabel position="bottom" className="mt-2 px-1.5 py-0.5 bg-white border border-slate-200 rounded shadow-sm font-bold text-[8px] text-slate-600 uppercase">Inicio</MarkerLabel>
                                    )}
                                    {isLast && !isClosed && tramo.coordinates.length > 1 && (
                                        <MarkerLabel position="bottom" className="mt-2 px-1.5 py-0.5 bg-white border border-slate-200 rounded shadow-sm font-bold text-[8px] text-slate-600 uppercase">Final</MarkerLabel>
                                    )}
                                    {isFirst && isClosed && idx === 0 && (
                                        <MarkerLabel position="bottom" className="mt-2 px-1.5 py-0.5 bg-white border border-slate-200 rounded shadow-sm font-bold text-[8px] text-slate-600 uppercase">{tramo.name}</MarkerLabel>
                                    )}
                                </MarkerContent>
                            </MapMarker>
                        );
                    }))}
                </Map>
            </div>

            <EditorSidebar
                isSidebarCollapsed={editor.isSidebarCollapsed}
                setIsSidebarCollapsed={editor.setIsSidebarCollapsed}
                tramos={editor.tramos}
                activeTramoId={editor.activeTramoId}
                setActiveTramoId={editor.setActiveTramoId}
                points={editor.points}
                selectedId={editor.selectedId}
                selectedType={editor.selectedType}
                setSelectedId={editor.setSelectedId}
                setSelectedType={editor.setSelectedType}
                setHoveredId={editor.setHoveredId}
                updateTramo={editor.updateTramo}
                addNewTramo={editor.addNewTramo}
                flyToPoint={editor.flyToPoint}
                activeTramo={editor.activeTramo}
                updatePoint={editor.updatePoint}
                pushToHistory={editor.pushToHistory}
                setTramos={editor.setTramos}
                setPoints={editor.setPoints}
            />

            {/* COLLAPSED SIDEBAR TOGGLE */}
            {editor.isSidebarCollapsed && (
                <div className="absolute right-6 top-1/2 -translate-y-1/2 z-40">
                    <Button
                        onClick={() => editor.setIsSidebarCollapsed(false)}
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
                            <span className="text-[11px] font-black text-slate-900">{editor.stats.distance} <span className="text-[8px] font-bold text-slate-400 uppercase">KM</span></span>
                        </div>
                    </div>
                    <div className="w-px h-6 bg-slate-100"></div>
                    <div className="flex items-center gap-2 group">
                        <div className="size-8 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                            <Clock className="size-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest leading-none">Tiempo Est.</span>
                            <span className="text-[11px] font-black text-slate-900">{editor.stats.time}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* FLOATING HINT (WHEN DRAWING) */}
            {(editor.activeTool === 'marker' || editor.activeTool === 'route') && (
                <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[60] bg-slate-900/90 backdrop-blur-md text-white px-6 py-2 rounded-xl shadow-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
                    <div className="size-1.5 bg-purple-500 rounded-full animate-ping"></div>
                    {editor.activeTool === 'marker' ? "Clic para marcar" : "Clic para trazar"}
                    <Button variant="ghost" size="icon" className="size-5 text-white/50 hover:text-white" onClick={() => editor.setActiveTool('select')}>
                        <X className="size-3" />
                    </Button>
                </div>
            )}

            <EditorModals
                isConfirmModalOpen={editor.isConfirmModalOpen}
                setIsConfirmModalOpen={editor.setIsConfirmModalOpen}
                clearAll={editor.clearAll}
                isPublishWarningOpen={editor.isPublishWarningOpen}
                setIsPublishWarningOpen={editor.setIsPublishWarningOpen}
                handleSave={editor.handleSave}
                isUnpublishConfirmOpen={editor.isUnpublishConfirmOpen}
                setIsUnpublishConfirmOpen={editor.setIsUnpublishConfirmOpen}
                isPublishConfirmOpen={editor.isPublishConfirmOpen}
                setIsPublishConfirmOpen={editor.setIsPublishConfirmOpen}
                isSettingsModalOpen={editor.isSettingsModalOpen}
                handleSettingsClose={editor.handleSettingsClose}
                processionData={editor.processionData}
                setProcessionData={editor.setProcessionData}
                isNameValid={editor.isNameValid}
                hasLocalAutosave={editor.hasLocalAutosave}
                handleRecoverAutosave={editor.handleRecoverAutosave}
                handleDiscardAutosave={editor.handleDiscardAutosave}
            />

            {/* MOBILE WARNING OVERLAY */}
            {editor.isMobileScreen && (
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
                        className="border-white/20 text-black hover:bg-white/10 rounded-xl px-8 bg-white"
                        onClick={() => editor.navigate("/hermandad/panel/procesiones")}
                    >
                        VOLVER AL PANEL
                    </Button>
                </div>
            )}
        </div>
    );
}
