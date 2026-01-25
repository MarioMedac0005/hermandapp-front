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

  const entidad = "banda";
  const columnas = bandColumns;
  const { data, loading, error, refetch } = useFetchData(API_ENDPOINTS.bands);
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
      <h1 className="text-2xl font-bold -mt-3 mb-2">Bandas</h1>
      <div className="flex gap-4 flex-wrap justify-between items-center mb-4">
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
          <input type="search" placeholder="Buscar..." />
        </label>
        <button
          type="button"
          className="btn btn-sm bg-purple-600 text-white hover:bg-purple-700 border-none"
          onClick={handleCreate}
        >
          Crear una banda
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
