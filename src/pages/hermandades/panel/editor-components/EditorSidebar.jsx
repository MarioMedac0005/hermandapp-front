import { Button } from "@/components/ui/button";
import { Layers, X, Plus, Eye, EyeOff, MapPin, Trash2, Navigation, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { COLORS, POI_ICONS } from "@/hooks/useProcessionEditor";

export function EditorSidebar({
    isSidebarCollapsed, setIsSidebarCollapsed,
    tramos, activeTramoId, setActiveTramoId,
    points, selectedId, selectedType, setSelectedId, setSelectedType,
    setHoveredId, updateTramo, addNewTramo, flyToPoint,
    activeTramo, updatePoint, pushToHistory, setTramos, setPoints
}) {
    if (isSidebarCollapsed) return null;

    return (
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
                                        <Navigation className="size-4" />
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
                                                maxLength={40}
                                                onChange={(e) => updatePoint(p.id, { name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-1">Descripción</label>
                                            <input
                                                className="w-full bg-white border border-slate-100 rounded-xl px-3 py-2 text-[11px] font-bold outline-none transition-all shadow-sm focus:ring-2 focus:ring-purple-100"
                                                value={p.description || ""}
                                                maxLength={150}
                                                onChange={(e) => updatePoint(p.id, { description: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-1">URL Imagen</label>
                                            <input
                                                className="w-full bg-white border border-slate-100 rounded-xl px-3 py-2 text-[11px] font-bold outline-none transition-all shadow-sm focus:ring-2 focus:ring-purple-100"
                                                value={p.imageUrl}
                                                maxLength={500}
                                                placeholder="URL de la imagen"
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
                                                <div className="flex flex-wrap gap-1 bg-white p-1.5 rounded-xl shadow-sm border border-slate-100">
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
                                        className="w-full h-8 text-[15px] text-red-600 border-red-50 hover:bg-red-50 font-bold rounded-xl py-0 transition-all"
                                        onClick={() => {
                                            pushToHistory();
                                            setPoints(points.filter(x => x.id !== p.id));
                                            setSelectedId(null);
                                            setSelectedType(null);
                                        }}
                                    >
                                        <Trash2 className="size-4 mr-1" />Eliminar
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
                                            maxLength={30}
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
                                        className="w-full h-8 text-[15px] text-red-600 border-red-50 hover:bg-red-50 font-bold rounded-xl py-0 transition-all"
                                        onClick={() => {
                                            const newTramos = tramos.filter(t => t.id !== activeTramo.id);
                                            pushToHistory();
                                            setTramos(newTramos);
                                            setActiveTramoId(newTramos.length > 0 ? newTramos[0].id : null);
                                            setSelectedId(null);
                                            setSelectedType(null);
                                        }}
                                    >
                                        <Trash2 className="size-4 mr-1" /> Eliminar Tramo
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
