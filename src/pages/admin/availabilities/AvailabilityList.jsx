import { useState } from "react";
import Modal from "@components/Modal";
import AvailabilityForm from "./AvailabilityForm";
import Table from "@components/Table";
import { availabilitiesColumns } from '../../../config/tables/availabilitiesColumns'
import { useFetchData } from "../../../hooks/useFetchData";
import { useDeleteEntity } from "../../../hooks/useDeleteEntity";
import { API_ENDPOINTS } from "../../../config/api";

function AvailabilityList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAvailability, setSelectedAvailability] = useState(null);
  const [page, setPage] = useState(1);

  const entidad = "availabilities";
  const columnas = availabilitiesColumns;
  const { data, loading, error, refetch, pagination } = useFetchData(API_ENDPOINTS.availabilities, page);
  const { destroy } = useDeleteEntity();

  const handleCreate = () => {
    setSelectedAvailability(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedAvailability(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const success = await destroy(`${API_ENDPOINTS.availabilities}/${id}`);
    if (success) {
        refetch();
    }
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    setSelectedAvailability(null);
    refetch();
  };

  if (loading) return <p>Cargando disponibilidades...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6 mt-2">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Disponibilidades</h1>
          <p className="text-sm text-slate-500 mt-1">Gestión de fechas y disponibilidades</p>
        </div>
        <button
          type="button"
          className="btn bg-purple-600 hover:bg-purple-700 text-white border-none rounded-xl shadow-sm hover:shadow-md transition-all px-5 lg:px-6 font-semibold"
          onClick={handleCreate}
        >
          Crear disponibilidad
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
        title={selectedAvailability ? "Editar Disponibilidad" : "Crear Disponibilidad"}
      >
        <AvailabilityForm 
            initialData={selectedAvailability}
            onSuccess={handleSuccess}
        />
      </Modal>
    </div>
  );
}

export default AvailabilityList;
