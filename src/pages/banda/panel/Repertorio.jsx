import { useState, useEffect } from "react";
import { useAuth } from "@contexts/AuthContext";
import { MusicalNoteIcon, PlusIcon, PencilIcon, TrashIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import Table from "@components/Table";
import Modal from "@components/Modal";
import toast from "react-hot-toast";
import { API_ENDPOINTS } from "@config/api";

export default function Repertorio() {
    const { user } = useAuth();
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSong, setEditingSong] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        duration: "",
        url: ""
    });

    const fetchSongs = async () => {
        try {
            const response = await fetch(`${API_ENDPOINTS.bands}/${user.band_id}/repertoire`);
            const data = await response.json();
            setSongs(data.data || []);
        } catch (error) {
            toast.error("Error al cargar el repertorio");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.band_id) {
            fetchSongs();
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editingSong ? "PUT" : "POST";
        const url = editingSong
            ? `${API_ENDPOINTS.repertoire}/${editingSong.id}`
            : API_ENDPOINTS.repertoire;

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                toast.success(editingSong ? "Canción actualizada" : "Canción añadida");
                setIsModalOpen(false);
                setEditingSong(null);
                setFormData({ title: "", duration: "", url: "" });
                fetchSongs();
            } else {
                const errorData = await response.json().catch(() => ({}));
                toast.error(errorData.message || "Error al guardar la canción");
            }
        } catch (error) {
            toast.error("Error de conexión");
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_ENDPOINTS.repertoire}/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.ok) {
                toast.success("Canción eliminada");
                fetchSongs();
            } else {
                const errorData = await response.json().catch(() => ({}));
                toast.error(errorData.message || "Error al eliminar");
            }
        } catch (error) {
            toast.error("Error de conexión");
        }
    };

    const openModal = (song = null) => {
        if (song) {
            setEditingSong(song);
            setFormData({
                title: song.title,
                duration: song.duration || "",
                url: song.url || ""
            });
        } else {
            setEditingSong(null);
            setFormData({ title: "", duration: "", url: "" });
        }
        setIsModalOpen(true);
    };

    const columns = [
        { label: "Título", key: "title" },
        { label: "Duración", key: "duration", className: "font-mono text-xs" },
        {
            label: "Enlace",
            render: (song) => song.url ? (
                <a href={song.url} target="_blank" rel="noreferrer" className="text-purple-500 hover:text-purple-700">
                    <PlayCircleIcon className="h-6 w-6" />
                </a>
            ) : "-"
        }
    ];

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-xl">
                            <MusicalNoteIcon className="h-8 w-8 text-purple-600" />
                        </div>
                        Gestión de Repertorio
                    </h1>
                    <p className="text-gray-500 mt-1 font-medium">Administra la biblioteca musical de la banda.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="bg-purple-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 active:scale-95">
                    <PlusIcon className="h-5 w-5 stroke-[3]" />
                    Añadir Canción
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl shadow-gray-100/50 border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-20 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-100 border-t-purple-600 mb-4"></div>
                        <p className="text-gray-400 font-medium">Cargando catálogo...</p>
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        data={songs}
                        onEdit={openModal}
                        onDelete={handleDelete}
                    />
                )}
            </div>

            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingSong ? "Editar Canción" : "Nueva Canción"}>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Título de la Obra</label>
                            <input
                                type="text"
                                required
                                placeholder="Amarguras"
                                className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-purple-500 outline-none font-medium transition-all"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Duración estimada</label>
                                <input
                                    type="text"
                                    placeholder="3:10"
                                    className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-purple-500 outline-none font-medium transition-all"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Enlace de referencia</label>
                                <input
                                    type="url"
                                    placeholder="https://..."
                                    className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-purple-500 outline-none font-medium transition-all"
                                    value={formData.url}
                                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-50">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-6 py-2.5 text-gray-400 hover:text-gray-600 font-bold transition-colors">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-purple-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-200">
                            {editingSong ? "Guardar Cambios" : "Crear Canción"}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
