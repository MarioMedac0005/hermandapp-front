import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { API_ENDPOINTS } from "@/config/api";
import { toast } from "react-hot-toast";
import {
    Plus, Search, Map as MapIcon, Calendar, Clock,
    Edit2, Trash2, Eye, MapPin, AlertTriangle, Navigation
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Modal from "@/components/Modal";
import CortejoCard from "@/components/hermandad/CortejoCard";
import ProcessionSettingsModal from "@/components/hermandad/ProcessionSettingsModal";


export default function ProcessionsManager() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState(""); // "", "published", "draft"
    const [sortFilter, setSortFilter] = useState("recent"); // "recent", "oldest"
    const [processions, setProcessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAppending, setIsAppending] = useState(false);

    // Pagination state
    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        total: 0,
        perPage: 6
    });

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchProcessions(1, false);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, statusFilter, sortFilter]);

    const fetchProcessions = async (page = 1, append = false) => {
        if (append) setIsAppending(true);
        else setLoading(true);
        try {

            const token = localStorage.getItem("token");
            const url = new URL(API_ENDPOINTS.processions);
            url.searchParams.append('page', page);
            if (searchTerm) {
                url.searchParams.append('search', searchTerm);
            }
            if (statusFilter) {
                url.searchParams.append('status', statusFilter);
            }
            if (sortFilter) {
                url.searchParams.append('sort', sortFilter);
            }

            const response = await fetch(url.toString(), {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            if (data.success) {
                if (append) {
                    setProcessions(prev => [...prev, ...data.data]);
                } else {
                    setProcessions(data.data);
                }
                if (data.meta) {
                    setPagination({
                        currentPage: data.meta.current_page,
                        lastPage: data.meta.last_page,
                        total: data.meta.total,
                        perPage: data.meta.per_page
                    });
                }
            }
        } catch (error) {
            console.error("Error fetching processions:", error);
            toast.error("Error al cargar las procesiones");
        } finally {
            setLoading(false);
            setIsAppending(false);
        }
    };

    const filteredProcessions = processions; // Filtering now happens on the server
    const [processionToDelete, setProcessionToDelete] = useState(null);
    const [processionToEdit, setProcessionToEdit] = useState(null);
    const [isSavingEdit, setIsSavingEdit] = useState(false);
    const [editForm, setEditForm] = useState({
        name: "",
        description: "",
        type: "christ",
        date: "",
        checkout_time: "",
        checkin_time: "",
        status: "draft"
    });

    const handleQuickEdit = (procesion) => {
        const checkoutRaw = procesion.checkout_time ? procesion.checkout_time.replace("T", " ") : "";
        const checkinRaw = procesion.checkin_time ? procesion.checkin_time.replace("T", " ") : "";
        const checkoutParts = checkoutRaw.split(" ");
        const checkinParts = checkinRaw.split(" ");

        setEditForm({
            name: procesion.name || "",
            description: procesion.description || "",
            type: procesion.type || "christ",
            date: checkoutParts[0] || "",
            checkout_time: checkoutParts[1]?.substring(0, 5) || "00:00",
            checkin_time: checkinParts[1]?.substring(0, 5) || "23:59",
            status: procesion.status || "draft"
        });
        setProcessionToEdit(procesion);
    };

    const saveQuickEdit = async () => {
        if (!processionToEdit) return;
        setIsSavingEdit(true);

        try {
            const token = localStorage.getItem("token");
            const checkout = `${editForm.date} ${editForm.checkout_time}:00`;
            let checkinDate = editForm.date;
            if (editForm.checkin_time < editForm.checkout_time) {
                const d = new Date(editForm.date);
                d.setDate(d.getDate() + 1);
                checkinDate = d.toISOString().split('T')[0];
            }
            const checkin = `${checkinDate} ${editForm.checkin_time}:00`;

            const response = await fetch(`${API_ENDPOINTS.processions}/${processionToEdit.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...editForm,
                    checkout_time: checkout,
                    checkin_time: checkin
                })
            });

            const data = await response.json();
            if (response.ok && data.success) {
                toast.success("Cambios guardados");
                setProcessionToEdit(null);
                fetchProcessions(pagination.currentPage);
            } else {
                toast.error(data.message || "Error al guardar");
            }
        } catch (error) {
            console.error("Quick edit save error:", error);
            toast.error("Error de conexión");
        } finally {
            setIsSavingEdit(false);
        }
    };

    const handleDelete = (payload) => {
        setProcessionToDelete(payload);
    };

    const confirmDelete = async () => {
        if (!processionToDelete) return;

        try {
            const token = localStorage.getItem("token");
            const { id } = processionToDelete;
            const response = await fetch(`${API_ENDPOINTS.processions}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            if (response?.ok) {
                toast.success("Procesión eliminada");
                // RE-FETCH data from server to keep the page full and pagination updated
                fetchProcessions(1, false);
            } else {
                toast.error("Error al eliminar la procesión");
            }
        } catch (error) {
            toast.error("Error al eliminar la procesión");
        } finally {
            setProcessionToDelete(null);
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
                    onClick={() => navigate("/hermandad/panel/crear-procesion")}
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-6 py-6 h-auto shadow-lg shadow-purple-200 transition-all hover:scale-[1.02] active:scale-[0.98] gap-2 flex"
                >
                    <Plus className="size-5" />
                    Nueva Procesión
                </Button>
            </div>

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
                    <select
                        value={sortFilter}
                        onChange={(e) => setSortFilter(e.target.value)}
                        className="h-10 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-bold focus:ring-2 focus:ring-purple-100 outline-none transition-all cursor-pointer"
                    >
                        <option value="recent">Más Recientes</option>
                        <option value="oldest">Más Antiguas</option>
                    </select>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="h-10 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-bold focus:ring-2 focus:ring-purple-100 outline-none transition-all cursor-pointer"
                    >
                        <option value="">Estado</option>
                        <option value="published">Publicados</option>
                        <option value="draft">Borradores</option>
                    </select>
                </div>
            </div>

            {/* Grid of Processions */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-96 bg-slate-100 rounded-3xl" />
                    ))}
                </div>
            ) : filteredProcessions.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProcessions.map((procesion) => {
                            // Generate static map preview URL if not provided by backend
                            const staticMapUrl = procesion.segments && procesion.segments.length > 0
                                ? `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/path-5+9333ea-0.6(${encodeURIComponent(procesion.segments[0].coordinates.map(c => c.join(',')).join(';'))})/auto/600x400?padding=40&access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`
                                : null;

                            return (
                                <CortejoCard
                                    key={procesion.id}
                                    cortejo={procesion}
                                    isAdmin={true}
                                    onDelete={handleDelete}
                                    onQuickEdit={handleQuickEdit}
                                    staticMapUrl={staticMapUrl}
                                />
                            );
                        })}
                    </div>

                    {/* Pagination Controls - Desktop Only */}
                    {pagination.lastPage > 1 && (
                        <div className="hidden md:flex justify-center items-center gap-2 mt-12 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm w-fit mx-auto">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => fetchProcessions(pagination.currentPage - 1, false)}
                                disabled={pagination.currentPage === 1}
                                className="rounded-xl border-slate-200">
                                Anterior
                            </Button>

                            <div className="flex items-center gap-1 px-4">
                                {[...Array(pagination.lastPage)].map((_, i) => (
                                    <Button
                                        key={i + 1}
                                        variant={pagination.currentPage === i + 1 ? "default" : "ghost"}
                                        size="sm"
                                        onClick={() => fetchProcessions(i + 1, false)}
                                        className={cn(
                                            "w-8 h-8 p-0 rounded-lg text-xs font-bold",
                                            pagination.currentPage === i + 1 ? "bg-purple-600" : "text-slate-500"
                                        )}>
                                        {i + 1}
                                    </Button>
                                ))}
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => fetchProcessions(pagination.currentPage + 1, false)}
                                disabled={pagination.currentPage === pagination.lastPage}
                                className="rounded-xl border-slate-200">
                                Siguiente
                            </Button>
                        </div>
                    )}

                    {/* Load More Button - Mobile Only */}
                    {pagination.currentPage < pagination.lastPage && (
                        <div className="md:hidden flex justify-center mt-8">
                            <Button
                                variant="outline"
                                className="rounded-xl border-purple-200 text-purple-700 bg-purple-50 hover:bg-purple-100 px-6 py-5 w-full font-bold shadow-sm"
                                onClick={() => fetchProcessions(pagination.currentPage + 1, true)}
                                disabled={isAppending}>
                                {isAppending ? (
                                    <span className="flex items-center gap-2">
                                        <div className="size-4 border-2 border-purple-600 border-t-transparent stroke-purple-600 rounded-full animate-spin"></div>
                                        Cargando...
                                    </span>
                                ) : (
                                    "Cargar más"
                                )}
                            </Button>
                        </div>
                    )}
                </>
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

            {/* Delete Confirmation Modal */}
            <Modal
                open={!!processionToDelete}
                onClose={() => setProcessionToDelete(null)}
                title="¿Eliminar esta procesión?"
                maxWidth="max-w-md"
            >
                <div className="space-y-4">
                    <div className="size-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <AlertTriangle className="size-8" />
                    </div>
                    <p className="text-sm text-center text-slate-600 font-medium leading-relaxed">
                        ¿Estás seguro de que quieres eliminar esta procesión? Esta acción es permanente y no se podrá recuperar el recorrido ni los puntos de interés trazados.
                    </p>
                    <div className="flex gap-3 pt-2">
                        <Button
                            variant="outline"
                            className="flex-1 rounded-xl h-11 font-bold text-slate-600 border-slate-200"
                            onClick={() => setProcessionToDelete(null)}
                        >
                            CANCELAR
                        </Button>
                        <Button
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl h-11 font-bold shadow-lg shadow-red-100"
                            onClick={confirmDelete}
                        >
                            SÍ, ELIMINAR
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Quick Edit Modal */}
            <ProcessionSettingsModal
                isOpen={!!processionToEdit}
                onClose={() => setProcessionToEdit(null)}
                formData={editForm}
                setFormData={setEditForm}
                onSave={saveQuickEdit}
                isSaving={isSavingEdit}
            />
        </div>
    );
}
