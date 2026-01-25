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

  const entidad = "availabilities";
  const columnas = availabilitiesColumns
  const { data, loading, error, refetch } = useFetchData(API_ENDPOINTS.availabilities)
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
      <h1 className="text-2xl font-bold -mt-3 mb-2">Disponibilidades</h1>
      <div className="flex gap-4 flex-wrap justify-between items-center mb-4 text-xs">
        <label className="input input-sm">
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
          />
        </label>
        <button
          type="button"
          className="btn btn-sm bg-purple-600 text-white hover:bg-purple-700 border-none"
          onClick={handleCreate}
        >
          Crear una disponibilidad
        </button>
      </div>
      
      <Table 
        columns={columnas} 
        data={data} 
        entity={entidad} 
        onEdit={handleEdit}
        onDelete={handleDelete}
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
