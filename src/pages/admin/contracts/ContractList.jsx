import { useState } from "react";
import Modal from "@components/Modal";
import ContractForm from "./ContractForm";
import Table from "@components/Table";
import { contractColumns } from "../../../config/tables/contractsColumns";
import { useFetchData } from "../../../hooks/useFetchData";
import { useDeleteEntity } from "../../../hooks/useDeleteEntity";
import { API_ENDPOINTS } from "../../../config/api";

function ContractList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [page, setPage] = useState(1);

  const entidad = "contrato";
  const columnas = contractColumns;
  const { data, error, loading, refetch, pagination } = useFetchData(API_ENDPOINTS.contracts, page);
  const { destroy } = useDeleteEntity();

  const handleCreate = () => {
    setSelectedContract(null);
    setIsModalOpen(true);
  };

  const handleEdit = (contract) => {
    setSelectedContract(contract);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const success = await destroy(`${API_ENDPOINTS.contracts}/${id}`);
    if (success) {
        refetch();
    }
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    setSelectedContract(null);
    refetch();
  };

  if (loading) return <p>Cargando contratos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold -mt-3 mb-2">Contratos</h1>
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
            placeholder="Buscar..."
            className="placeholder:text-xs"
          />
        </label>
        <button
          type="button"
          className="btn btn-sm bg-purple-600 text-white hover:bg-purple-700 border-none"
          onClick={handleCreate}
        >
          Crear un contrato
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
        title={selectedContract ? "Editar Contrato" : "Crear Contrato"}
      >
        <ContractForm 
            initialData={selectedContract}
            onSuccess={handleSuccess}
        />
      </Modal>
    </div>
  );
}

export default ContractList;
