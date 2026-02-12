import { useState } from "react";
import ContractCard from "../../../components/ContractCard";
import ContractDetailModal from "../../../components/ContractDetailModal";
import ContractForm from "../../admin/contracts/ContractForm"; // Reusing admin form
import Modal from "../../../components/Modal"; // Needed for edit modal
import { useFetchData } from "../../../hooks/useFetchData";
import { useUpdateEntity } from "../../../hooks/useUpdateEntity";
import { API_ENDPOINTS } from "../../../config/api";
import toast from "react-hot-toast";

function Contratos() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [page, setPage] = useState(1);

  const { data, loading, error, refetch, pagination } = useFetchData(API_ENDPOINTS.contracts, page);
  const { update } = useUpdateEntity();

  const handleUpdateStatus = async (id, newStatus) => {
    const success = await update(`${API_ENDPOINTS.contracts}/${id}`, { status: newStatus });
    if (success) {
      toast.success(`Contrato ${newStatus === 'accepted' ? 'aceptado' : 'rechazado'} correctamente`);
      refetch();
      setIsDetailModalOpen(false);
    }
  };

  const handleEdit = () => {
    // Open edit modal, close detail modal
    setIsEditModalOpen(true);
    setIsDetailModalOpen(false);
  };

  const handleCardClick = (contract) => {
    setSelectedContract(contract);
    setIsDetailModalOpen(true);
  };

  const handleSuccess = () => {
    setIsEditModalOpen(false);
    setSelectedContract(null);
    refetch();
  };

  const renderModalActions = () => {
      if (!selectedContract) return null;
      
      const isPending = selectedContract.status === 'pending';

      return (
          <>
            <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 cursor-pointer"
            >
                Cerrar
            </button>
            <button
                onClick={handleEdit}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            >
                Editar
            </button>
            {isPending && (
                <>
                    <button
                        onClick={() => handleUpdateStatus(selectedContract.id, 'rejected')}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
                    >
                        Rechazar
                    </button>
                    <button
                        onClick={() => handleUpdateStatus(selectedContract.id, 'accepted')}
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
                    >
                        Aceptar
                    </button>
                </>
            )}
          </>
      );
  };

  if (loading) return <p>Cargando contratos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold -mt-3 mb-6">Contratos</h1>
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
          <input type="search" required placeholder="Search" />
        </label>
      </div>
      
      {data.length === 0 ? (
           <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
               <p className="text-gray-500">No hay contratos disponibles.</p>
           </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map(contract => (
                <ContractCard 
                    key={contract.id} 
                    contract={contract} 
                    type="brotherhood" 
                    onClick={handleCardClick} 
                />
            ))}
        </div>
      )}

      {/* Pagination Controls */}
      {pagination && pagination.last_page > 1 && (
        <div className="flex items-center justify-between px-6 py-4 mt-6 bg-white rounded-xl border border-gray-100">
             <div className="flex flex-1 justify-between sm:hidden">
                <button
                    onClick={() => setPage(pagination.current_page - 1)}
                    disabled={pagination.current_page === 1}
                    className="relative inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors cursor-pointer"
                >
                    Anterior
                </button>
                <button
                    onClick={() => setPage(pagination.current_page + 1)}
                    disabled={pagination.current_page === pagination.last_page}
                    className="relative ml-3 inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors cursor-pointer"
                >
                    Siguiente
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                 <div>
                    <p className="text-sm text-gray-500">
                    Mostrando <span className="font-medium text-gray-900">{pagination.from}</span> - <span className="font-medium text-gray-900">{pagination.to}</span> de <span className="font-medium text-gray-900">{pagination.total}</span> resultados
                    </p>
                </div>
                <div>
                     <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm gap-1" aria-label="Pagination">
                         <button
                            onClick={() => setPage(pagination.current_page - 1)}
                            disabled={pagination.current_page === 1}
                            className="relative inline-flex items-center rounded-lg px-2 py-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                        >
                            <span className="sr-only">Anterior</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {pagination.links && pagination.links.filter(link => !link.label.includes('&laquo;') && !link.label.includes('&raquo;')).map((link, index) => {
                             if (isNaN(link.label) && link.label !== '...') return null; 
                             return (
                                <button
                                    key={index}
                                    onClick={() => !isNaN(link.label) && setPage(parseInt(link.label))}
                                    disabled={link.label === '...'}
                                    className={`relative inline-flex items-center px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                                        link.active 
                                            ? 'z-10 bg-purple-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 shadow-sm' 
                                            : link.label === '...' ? 'text-gray-400 cursor-default' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
                                    }`}
                                >
                                    {link.label}
                                </button>
                             );
                        })}
                        <button
                            onClick={() => setPage(pagination.current_page + 1)}
                            disabled={pagination.current_page === pagination.last_page}
                            className="relative inline-flex items-center rounded-lg px-2 py-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                        >
                            <span className="sr-only">Siguiente</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                            </svg>
                        </button>
                     </nav>
                </div>
            </div>
        </div>
      )}

      <ContractDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        contract={selectedContract}
        actions={renderModalActions()}
      />

      <Modal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar Contrato"
      >
        <ContractForm 
            initialData={selectedContract}
            onSuccess={handleSuccess}
        />
      </Modal>
    </div>
  );
}

export default Contratos;
