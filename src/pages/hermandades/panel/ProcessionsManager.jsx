import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { API_ENDPOINTS } from "@/config/api";
import { toast } from "react-hot-toast";
import {
    Plus, Search, Map as MapIcon, Calendar, Clock,
    MoreVertical, Edit2, Trash2, Eye, MapPin, X, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Initial data for loading state only
const MOCK_PROCESSIONS = [];

export default function ProcessionsManager() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const [processions, setProcessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showWizard, setShowWizard] = useState(false);
    const [newProcession, setNewProcession] = useState({ name: "", date: "", type: "christ" });

    useEffect(() => {
        fetchProcessions();
    }, []);

    const fetchProcessions = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(API_ENDPOINTS.processions, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            if (data.success) {
                setProcessions(data.data);
            }
        } catch (error) {
            console.error("Error fetching processions:", error);
            toast.error("Error al cargar las procesiones");
        } finally {
            setLoading(false);
        }
    };

    const filteredProcessions = processions.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id) => {
        if (window.confirm("¿Seguro que quieres eliminar esta procesión?")) {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`${API_ENDPOINTS.processions}/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                });
                if (response.ok) {
                    setProcessions(prev => prev.filter(p => p.id !== id));
                    toast.success("Procesión eliminada");
                }
            } catch (error) {
                toast.error("Error al eliminar la procesión");
            }
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const payload = {
                ...newProcession,
                brotherhood_id: user?.brotherhood_id || user?.brotherhood?.id,
                itinerary: "Trazado en mapa",
                checkout_time: `${newProcession.date} 00:00:00`,
                checkin_time: `${newProcession.date} 23:59:59`
            };

            const response = await fetch(API_ENDPOINTS.processions, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (response.ok && data.success) {
                toast.success("Procesión creada. Abriendo editor...");
                navigate(`/hermandad/panel/editar-procesion/${data.data.id}`);
            } else {
                toast.error(data.message || "Error al crear la procesión");
            }
        } catch (error) {
            toast.error("Error de conexión");
        }
    };

    return (
        <div className="space-y-6 container mx-auto px-4 py-8 max-w-7xl animate-in fade-in duration-500">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 shadow-inner">
                        <MapIcon className="size-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Gestionar Procesiones</h1>
                        <p className="text-sm text-slate-500 font-medium">Crea y personaliza los recorridos para tus cortejos.</p>
                    </div>
                </div>
                <Button
                    onClick={() => setShowWizard(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-6 py-6 h-auto shadow-lg shadow-purple-200 transition-all hover:scale-[1.02] active:scale-[0.98] gap-2 flex"
                >
                    <Plus className="size-5" />
                    Nueva Procesión
                </Button>
            </div>

            {/* Creation Wizard Modal */}
            {showWizard && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowWizard(false)} />
                    <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Nueva Procesión</h2>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Paso 1: Detalles Básicos</p>
                                </div>
                                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShowWizard(false)}>
                                    <X className="size-5" />
                                </Button>
                            </div>

                            <form onSubmit={handleCreate} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nombre de la Procesión</label>
                                    <input
                                        required
                                        autoFocus
                                        placeholder="Ej. Salida Extraordinaria 2024"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-purple-100 focus:bg-white outline-none transition-all"
                                        value={newProcession.name}
                                        onChange={(e) => setNewProcession({ ...newProcession, name: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Fecha</label>
                                        <input
                                            required
                                            type="date"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-purple-100 focus:bg-white outline-none transition-all"
                                            value={newProcession.date}
                                            onChange={(e) => setNewProcession({ ...newProcession, date: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tipo</label>
                                        <select
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-purple-100 focus:bg-white outline-none transition-all appearance-none"
                                            value={newProcession.type}
                                            onChange={(e) => setNewProcession({ ...newProcession, type: e.target.value })}
                                        >
                                            <option value="christ">Paso de Cristo</option>
                                            <option value="virgin">Paso de Palio</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        disabled={!newProcession.name || !newProcession.date}
                                        className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-2xl py-8 h-auto shadow-xl shadow-purple-200 font-black uppercase tracking-widest transition-all active:scale-95 flex gap-3"
                                    >
                                        Configurar en el Mapa
                                        <ChevronRight className="size-5" />
                                    </Button>
                                </div>
                            </form>
                        </div>

                        <div className="bg-slate-50 p-6 border-t border-slate-100 flex items-center gap-4">
                            <div className="size-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-purple-600">
                                <MapPin className="size-5" />
                            </div>
                            <p className="text-[10px] text-slate-500 font-bold leading-relaxed">
                                Podrás trazar el recorrido exacto y marcar los puntos de interés en el siguiente paso.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Control Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 group w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors size-5" />
                    <input
                        type="text"
                        placeholder="Buscar procesión..."
                        className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-sm focus:ring-4 focus:ring-purple-50 focus:border-purple-200 outline-none transition-all shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 no-scrollbar">
                    <Button variant="outline" className="rounded-xl bg-white border-slate-200 text-slate-600 hover:bg-slate-50 gap-2 shrink-0">
                        <Calendar className="size-4" />
                        Recientes
                    </Button>
                    <Button variant="outline" className="rounded-xl bg-white border-slate-200 text-slate-600 hover:bg-slate-50 gap-2 shrink-0">
                        <Eye className="size-4" />
                        Estado
                    </Button>
                </div>
            </div>

            {/* Grid of Processions */}
            {filteredProcessions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProcessions.map((procesion) => (
                        <div
                            key={procesion.id}
                            className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 overflow-hidden flex flex-col h-full"
                        >
                            {/* Card Preview Area */}
                            <div className="relative aspect-[16/9] bg-slate-50 overflow-hidden">
                                {procesion.previewUrl ? (
                                    <img
                                        src={procesion.previewUrl}
                                        alt={procesion.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <MapIcon className="size-12 opacity-20" />
                                    </div>
                                )}

                                {/* Status Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className={cn(
                                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm border",
                                        procesion.status === 'published'
                                            ? "bg-green-500/10 text-green-600 border-green-500/20"
                                            : "bg-slate-500/10 text-slate-600 border-slate-500/20"
                                    )}>
                                        {procesion.status === 'published' ? 'Publicado' : 'Borrador'}
                                    </span>
                                </div>

                                {/* Overlay with Quick View Button */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <Button
                                        onClick={() => navigate(`/hermandad/panel/editar-procesion/${procesion.id}`)}
                                        className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/30 rounded-full px-6 gap-2"
                                    >
                                        <Eye className="size-4" />
                                        Vista Rápida
                                    </Button>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex justify-between items-start gap-2 mb-3">
                                    <h3 className="font-bold text-slate-900 leading-snug group-hover:text-purple-600 transition-colors line-clamp-1">{procesion.name}</h3>
                                    <div className="flex gap-1">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="size-8 rounded-lg hover:bg-purple-50 hover:text-purple-600"
                                            onClick={() => navigate(`/hermandad/panel/editar-procesion/${procesion.id}`)}
                                        >
                                            <Edit2 className="size-4" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="size-8 rounded-lg hover:bg-red-50 hover:text-red-600"
                                            onClick={() => handleDelete(procesion.id)}
                                        >
                                            <Trash2 className="size-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-y-3 mt-auto">
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <Calendar className="size-3.5" />
                                        <span className="text-[11px] font-medium">{procesion.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <MapPin className="size-3.5" />
                                        <span className="text-[11px] font-medium">{procesion.distance}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <Clock className="size-3.5" />
                                        <span className="text-[11px] font-medium">{procesion.pointsCount} Puntos</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer Action */}
                            <div className="px-5 pb-5 mt-2">
                                <Button
                                    onClick={() => navigate(`/hermandad/panel/editar-procesion/${procesion.id}`)}
                                    variant="outline"
                                    className="w-full border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-widest h-11 rounded-xl group-hover:border-purple-300 group-hover:bg-purple-50/50 group-hover:text-purple-700 transition-all"
                                >
                                    Continuar Edición
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-3xl p-16 text-center border-2 border-dashed border-slate-100">
                    <div className="size-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MapIcon className="size-10 text-slate-200" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">No se encontraron procesiones</h2>
                    <p className="text-slate-500 max-w-sm mx-auto mb-8 font-medium">Empieza creando una nueva procesión para tu hermandad y traza su recorrido sobre el mapa.</p>
                    <Button
                        onClick={() => navigate("/hermandad/panel/crear-procesion")}
                        className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-8 py-6 h-auto shadow-lg shadow-purple-200 transition-all"
                    >
                        <Plus className="size-5 mr-2" />
                        Crear mi primera procesión
                    </Button>
                </div>
            )}
        </div>
    );
}
