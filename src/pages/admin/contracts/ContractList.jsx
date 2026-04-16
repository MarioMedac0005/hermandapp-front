import { useState } from "react";
import Modal from "@components/Modal";
import ContractForm from "./ContractForm";
import Table from "@components/Table";
import ContractDetailModal from "@components/ContractDetailModal";
import { EyeIcon } from "@heroicons/react/24/outline";
import { contractColumns } from "@config/tables/contractsColumns";
import { useFetchData } from "../../../hooks/useFetchData";
import { useDeleteEntity } from "../../../hooks/useDeleteEntity";
import { API_ENDPOINTS } from "../../../config/api";

function ContractList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
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

  const handleView = (contract) => {
    setSelectedContract(contract);
    setIsDetailModalOpen(true);
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
      <div className="flex justify-between items-center mb-6 mt-2">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Contratos</h1>
          <p className="text-sm text-slate-500 mt-1">Gestión de acuerdos y contratos</p>
        </div>
        <button
          type="button"
          className="btn bg-purple-600 hover:bg-purple-700 text-white border-none rounded-xl shadow-sm hover:shadow-md transition-all px-5 lg:px-6 font-semibold"
          onClick={handleCreate}
        >
          Crear contrato
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
        customActions={(item) => (
            <button
                onClick={() => handleView(item)}
                className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                title="Ver detalles"
            >
                <EyeIcon className="w-5 h-5" />
            </button>
        )}
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

      <ContractDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        contract={selectedContract}
        isAdmin={true}
      />
    </div>
  );
}

export default ContractList;
