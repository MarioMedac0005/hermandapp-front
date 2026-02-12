import { useState } from "react";
import Modal from "../../../components/Modal";
import AvailabilityForm from "../../admin/availabilities/AvailabilityForm";
import Table from "../../../components/Table";
import { availabilitiesColumns } from '../../../config/tables/availabilitiesColumns'
import { useFetchData } from "../../../hooks/useFetchData";
import { useDeleteEntity } from "../../../hooks/useDeleteEntity";
import { API_ENDPOINTS } from "../../../config/api";
import { useAuth } from "../../../contexts/AuthContext";

function Disponibilidad() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAvailability, setSelectedAvailability] = useState(null);
  const { user } = useAuth();

  // Assuming user object has band_id or similar. If simpler structure, might need adjustment.
  // user.band_id or user.band?.id
  const bandId = user?.band_id || user?.band?.id; 

  const entidad = "availabilities";
  const columnas = availabilitiesColumns;
  // Ideally backend filters, but if not we filter here
  const { data, loading, error, refetch } = useFetchData(API_ENDPOINTS.availabilities);
  const { destroy } = useDeleteEntity();

  // Filter data for this band
  const filteredData = data ? data.filter(item => String(item.band_id) === String(bandId)) : [];

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
      <h1 className="text-2xl font-bold -mt-3 mb-6">Disponibilidad</h1>
      <div className="flex gap-4 flex-wrap justify-between items-center mb-6">
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
        {bandId && (
            <button
            type="button"
            className="btn btn-sm bg-purple-600 text-white hover:bg-purple-700 border-none cursor-pointer"
            onClick={handleCreate}
            >
            Crear disponibilidad
            </button>
        )}
      </div>
      
      <Table 
        columns={columnas} 
        data={filteredData} 
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
            preselectedBandId={bandId}
        />
      </Modal>
    </div>
  );
}

export default Disponibilidad;
