import { useState } from "react";
import Modal from "@components/Modal";
import ProcessionForm from "./ProcessionForm";
import Table from "@components/Table";
import { processionsColumns } from '../../../config/tables/processionsColumns'
import { useFetchData } from "../../../hooks/useFetchData";
import { useDeleteEntity } from "../../../hooks/useDeleteEntity";
import { API_ENDPOINTS } from "../../../config/api";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

function ProcessionList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProcession, setSelectedProcession] = useState(null);

  const entidad = "processions";
  const columnas = processionsColumns
  const [page, setPage] = useState(1);
  const { data, loading, error, refetch, pagination } = useFetchData(API_ENDPOINTS.processions, page)
  const { destroy } = useDeleteEntity();

  const handleCreate = () => {
    setSelectedProcession(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedProcession(item);
    setIsModalOpen(true);
  };

  const [processionToDelete, setProcessionToDelete] = useState(null);

  const handleDelete = (id) => {
    setProcessionToDelete(id);
  };

  const confirmDelete = async () => {
    if (!processionToDelete) return;
    const success = await destroy(`${API_ENDPOINTS.processions}/${processionToDelete}`);
    if (success) {
      refetch();
    }
    setProcessionToDelete(null);
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    setSelectedProcession(null);
    refetch();
  };

  if (loading) return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="h-8 w-48 bg-slate-200 rounded"></div>
      <div className="h-64 bg-slate-100 rounded-xl"></div>
    </div>
  );
  if (error) return <p className="text-red-500 bg-red-50 p-4 rounded-xl">Error: {error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold -mt-3 mb-2">Procesiones</h1>
      <div className="flex gap-4 flex-wrap justify-between items-center mb-4 text-xs">
        <label className="input input-sm border-slate-200 focus-within:border-purple-500">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            required
            placeholder="Search"
            className="placeholder:text-xs"
          />
        </label>
        <button
          type="button"
          className="btn btn-sm bg-purple-600 text-white hover:bg-purple-700 border-none rounded-lg"
          onClick={handleCreate}
        >
          Crear una procesion
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <Table
          columns={columnas}
          data={data}
          entity={entidad}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Pagination Controls */}
        {pagination && pagination.last_page > 1 && (
          <div className="flex justify-between items-center px-6 py-4 border-t border-slate-100 bg-slate-50/30">
            <span className="text-xs text-slate-500 font-medium">
              Mostrando {data.length} de {pagination.total} procesiones
            </span>
            <div className="flex gap-2">
              <button
                className="btn btn-xs rounded-lg border-slate-200 bg-white"
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
              >
                Anterior
              </button>
              <div className="flex gap-1 items-center">
                <span className="text-xs font-bold text-slate-900 px-2">{page}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">de {pagination.last_page}</span>
              </div>
              <button
                className="btn btn-xs rounded-lg border-slate-200 bg-white"
                disabled={page === pagination.last_page}
                onClick={() => setPage(p => p + 1)}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedProcession ? "Editar Procesión" : "Crear Procesión"}
      >
        <ProcessionForm
          initialData={selectedProcession}
          onSuccess={handleSuccess}
        />
      </Modal>

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
    </div>
  );
}

export default ProcessionList;
