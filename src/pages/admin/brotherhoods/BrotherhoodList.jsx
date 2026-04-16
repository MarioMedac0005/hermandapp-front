import { useEffect, useState } from "react";
import Modal from "@components/Modal";
import BrotherhoodForm from "./BrotherhoodForm";
import Table from "@components/Table";
import { brotherhoodsColumns } from "../../../config/tables/brotherhoodsColumns";
import { useFetchData } from "../../../hooks/useFetchData";
import { useDeleteEntity } from "../../../hooks/useDeleteEntity";
import { API_ENDPOINTS } from "../../../config/api";

function BrotherhoodList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrotherhood, setSelectedBrotherhood] = useState(null);
  const [page, setPage] = useState(1);

  const entidad = "hermandad";
  const columnas = brotherhoodsColumns;
  const { data, loading, error, refetch, pagination } = useFetchData(API_ENDPOINTS.brotherhoods, page);
  const { destroy } = useDeleteEntity();

  const handleCreate = () => {
    setSelectedBrotherhood(null);
    setIsModalOpen(true);
  };

  const handleEdit = (brotherhood) => {
    setSelectedBrotherhood(brotherhood);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const success = await destroy(`${API_ENDPOINTS.brotherhoods}/${id}`);
    if (success) {
        refetch();
    }
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    setSelectedBrotherhood(null);
    refetch();
  };

  if (loading) return <p>Cargando hermandades...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6 mt-2">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Hermandades</h1>
          <p className="text-sm text-slate-500 mt-1">Gestión de hermandades y cofradías registradas</p>
        </div>
        <button
          type="button"
          className="btn bg-purple-600 hover:bg-purple-700 text-white border-none rounded-xl shadow-sm hover:shadow-md transition-all px-5 lg:px-6 font-semibold"
          onClick={handleCreate}
        >
          Crear hermandad
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
        title={selectedBrotherhood ? "Editar Hermandad" : "Crear Hermandad"}
      >
        <BrotherhoodForm 
            initialData={selectedBrotherhood}
            onSuccess={handleSuccess}
        />
      </Modal>
    </div>
  );
}

export default BrotherhoodList;
