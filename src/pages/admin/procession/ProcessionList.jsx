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
      <div className="flex justify-between items-center mb-6 mt-2">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Procesiones</h1>
          <p className="text-sm text-slate-500 mt-1">Gestión de recorridos y procesiones</p>
        </div>
        <button
          type="button"
          className="btn bg-purple-600 hover:bg-purple-700 text-white border-none rounded-xl shadow-sm hover:shadow-md transition-all px-5 lg:px-6 font-semibold"
          onClick={handleCreate}
        >
          Crear procesion
        </button>
      </div>

      <Table
        columns={columnas}
        data={data}
        entity={entidad}
        onEdit={handleEdit}
        onDelete={handleDelete}
        pagination={pagination}
        onPageChange={setPage}
      />

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
