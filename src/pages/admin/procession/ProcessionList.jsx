import { useState } from "react";
import Modal from "@components/Modal";
import ProcessionForm from "./ProcessionForm";
import Table from "@components/Table";
import { processionsColumns } from '../../../config/tables/processionsColumns'
import { useFetchData } from "../../../hooks/useFetchData";
import { useDeleteEntity } from "../../../hooks/useDeleteEntity";
import { API_ENDPOINTS } from "../../../config/api";

function ProcessionList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProcession, setSelectedProcession] = useState(null);

  const entidad = "processions";
  const columnas = processionsColumns
  const { data, loading, error, refetch } = useFetchData(API_ENDPOINTS.processions)
  const { destroy } = useDeleteEntity();

  const handleCreate = () => {
    setSelectedProcession(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedProcession(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const success = await destroy(`${API_ENDPOINTS.processions}/${id}`);
    if (success) {
        refetch();
    }
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    setSelectedProcession(null);
    refetch();
  };

  if (loading) return <p>Cargando procesiones...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold -mt-3 mb-2">Procesiones</h1>
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
            className="placeholder:text-xs"
          />
        </label>
        <button
          type="button"
          className="btn btn-sm bg-purple-600 text-white hover:bg-purple-700 border-none"
          onClick={handleCreate}
        >
          Crear una procesion
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
        title={selectedProcession ? "Editar Procesión" : "Crear Procesión"}
      >
        <ProcessionForm 
            initialData={selectedProcession}
            onSuccess={handleSuccess}
        />
      </Modal>
    </div>
  );
}

export default ProcessionList;
