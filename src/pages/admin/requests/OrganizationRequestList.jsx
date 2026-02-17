import Table from "@components/Table";
import { useState } from "react";
import Modal from "@components/Modal";
import { useFetchData } from "../../../hooks/useFetchData";
import { requestColumns } from "../../../config/tables/requestsColumns.jsx";
import { API_ENDPOINTS } from "../../../config/api";
import OrganizationRequestReview from "./OrganizationRequestReview";
import { InboxStackIcon, MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";

function OrganizationRequestList() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const entidad = "solicitud";
    const columnas = requestColumns;
    const { data, loading, error, refetch } = useFetchData(API_ENDPOINTS.organizationRequests);

    const handleEdit = (request) => {
        setSelectedRequest(request);
        setIsModalOpen(true);
    };

    const handleSuccess = () => {
        setIsModalOpen(false);
        setSelectedRequest(null);
        refetch();
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <span className="loading loading-spinner loading-lg text-purple-600"></span>
            <p className="text-slate-500 font-medium animate-pulse">Cargando solicitudes...</p>
        </div>
    );

    if (error) return (
        <div className="alert alert-error shadow-lg max-w-2xl mx-auto mt-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Error al cargar las solicitudes: {error}</span>
        </div>
    );

    // Normalizar datos
    const requestsDataRaw = data?.data || data || [];

    // Filtrado por búsqueda y estado
    const filteredData = Array.isArray(requestsDataRaw) ? requestsDataRaw.filter(item => {
        const matchesSearch =
            item.organization?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "all" || item.status === statusFilter;

        return matchesSearch && matchesStatus;
    }) : [];

    const stats = {
        total: requestsDataRaw.length,
        pending: requestsDataRaw.filter(r => r.status === 'pending').length,
        approved: requestsDataRaw.filter(r => r.status === 'approved').length,
        rejected: requestsDataRaw.filter(r => r.status === 'rejected').length
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-purple-600 rounded-lg shadow-lg shadow-purple-200">
                            <InboxStackIcon className="size-8 text-white" />
                        </div>
                        Bandeja de Solicitudes
                    </h1>
                    <p className="text-slate-500 mt-1 ml-14">
                        Gestiona y filtra las peticiones de registro.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-md w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-all shadow-sm"
                        placeholder="Buscar por organización, email o nombre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Stats and Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                    { id: 'all', label: 'Todas', count: stats.total, color: 'bg-slate-100 text-slate-700' },
                    { id: 'pending', label: 'Pendientes', count: stats.pending, color: 'bg-amber-100 text-amber-700' },
                    { id: 'approved', label: 'Aprobadas', count: stats.approved, color: 'bg-emerald-100 text-emerald-700' },
                    { id: 'rejected', label: 'Rechazadas', count: stats.rejected, color: 'bg-rose-100 text-rose-700' }
                ].map(filter => (
                    <button
                        key={filter.id}
                        onClick={() => setStatusFilter(filter.id)}
                        className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all shadow-sm ${statusFilter === filter.id
                                ? 'border-purple-500 bg-purple-50 ring-4 ring-purple-50'
                                : 'border-white bg-white hover:border-slate-100'
                            }`}
                    >
                        <div className="text-left">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{filter.label}</p>
                            <p className={`text-2xl font-black mt-1 ${statusFilter === filter.id ? 'text-purple-600' : 'text-slate-800'}`}>
                                {filter.count}
                            </p>
                        </div>
                        <div className={`size-10 rounded-xl flex items-center justify-center font-bold ${filter.color}`}>
                            <FunnelIcon className="size-5 opacity-40" />
                        </div>
                    </button>
                ))}
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-100/50 border border-slate-100 overflow-hidden">
                {filteredData.length > 0 ? (
                    <Table
                        columns={columnas}
                        data={filteredData}
                        entity={entidad}
                        onEdit={handleEdit}
                        onDelete={null} // Deshabilitado borrado
                    />
                ) : (
                    <div className="text-center py-20 bg-slate-50/50">
                        <InboxStackIcon className="size-16 text-slate-200 mx-auto" />
                        <h3 className="mt-4 text-lg font-bold text-slate-800">No hay solicitudes</h3>
                        <p className="text-slate-500">No se encontraron solicitudes con el filtro "{statusFilter !== 'all' ? statusFilter : 'todas'}" o búsqueda actual.</p>
                    </div>
                )}
            </div>

            {/* Review Modal */}
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Revisión Detallada de Solicitud"
                maxWidth="max-w-4xl"
            >
                {selectedRequest && (
                    <OrganizationRequestReview
                        requestData={selectedRequest}
                        onSuccess={handleSuccess}
                    />
                )}
            </Modal>
        </div>
    );
}

export default OrganizationRequestList;
