import { useState } from "react";
import Modal from "@components/Modal";
import BandForm from "./BandForm";
import Table from "@components/Table";
import { bandColumns } from "../../../config/tables/bandsColumns";
import { useFetchData } from "../../../hooks/useFetchData";
import { useDeleteEntity } from "../../../hooks/useDeleteEntity";
import { API_ENDPOINTS } from "../../../config/api";

function BandList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBand, setSelectedBand] = useState(null);
  const [page, setPage] = useState(1);

  const entidad = "banda";
  const columnas = bandColumns;
  const { data, loading, error, refetch, pagination } = useFetchData(API_ENDPOINTS.bands, page);
  const { destroy } = useDeleteEntity();

  const handleCreate = () => {
    setSelectedBand(null);
    setIsModalOpen(true);
  };

  const handleEdit = (band) => {
    setSelectedBand(band);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const success = await destroy(`${API_ENDPOINTS.bands}/${id}`);
    if (success) {
        refetch();
    }
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    setSelectedBand(null);
    refetch();
  };

  if (loading) return <p>Cargando bandas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6 mt-2">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Bandas</h1>
          <p className="text-sm text-slate-500 mt-1">Gestión de agrupaciones y bandas musicales</p>
        </div>
        <button
          type="button"
          className="btn bg-purple-600 hover:bg-purple-700 text-white border-none rounded-xl shadow-sm hover:shadow-md transition-all px-5 lg:px-6 font-semibold"
          onClick={handleCreate}
        >
          Crear banda
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
        title={selectedBand ? "Editar Banda" : "Crear Banda"}
      >
        <BandForm 
            initialData={selectedBand}
            onSuccess={handleSuccess}
        />
      </Modal>
    </div>
  );
}

export default BandList;
