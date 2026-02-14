import { useState } from "react";
import ContractCard from "../../../components/ContractCard";
import ContractDetailModal from "../../../components/ContractDetailModal";
import { useFetchData } from "../../../hooks/useFetchData";
import { API_ENDPOINTS } from "../../../config/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function PendingContracts() {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { data, loading, error, refetch, pagination } = useFetchData(API_ENDPOINTS.contracts, page);

  const pendingContracts = data.filter(contract => contract.status === 'pending');

  const handleAction = async (id, action) => {
      const loadingToast = toast.loading('Procesando...');
      try {
        const response = await fetch(`${API_ENDPOINTS.contracts}/${id}/${action}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        const resData = await response.json();

        if (response.ok) {
             toast.success(resData.message || `Contrato ${action === 'accept' ? 'aceptado' : 'rechazado'} correctamente`, { id: loadingToast });
             setIsDetailModalOpen(false);
             
             if (action === 'accept') {
                 // Redirect to sign page with pdf_path
                 // The response structure requested by user:
                 // { success: true, message: ..., data: { contract_id: ..., pdf_path: ... } }
                 const pdfPath = resData.data?.pdf_path;
                 if (pdfPath) {
                     navigate(`/banda/panel/contratos/${id}/firmar`, { state: { pdf_path: pdfPath } });
                 } else {
                     toast.error("Ruta del PDF no recibida, no se puede redirigir a la firma.");
                     refetch();
                 }
             } else {
                 refetch();
             }
        } else {
             toast.error(resData.message || 'Error al procesar la solicitud', { id: loadingToast });
        }
      } catch (error) {
          console.error(error);
          toast.error('Error de conexión', { id: loadingToast });
      }
  };

  const handleCardClick = (contract) => {
    setSelectedContract(contract);
    setIsDetailModalOpen(true);
  };

  const renderModalActions = () => {
      if (!selectedContract) return null;
      
      return (
          <>
            <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 cursor-pointer"
            >
                Cerrar
            </button>
            <button
                onClick={() => handleAction(selectedContract.id, 'reject')}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
            >
                Rechazar
            </button>
            <button
                onClick={() => handleAction(selectedContract.id, 'accept')}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
            >
                Aceptar
            </button>
          </>
      );
  };

  if (loading) return <p>Cargando contratos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold -mt-3 mb-6">Contratos Pendientes</h1>
      
      {pendingContracts.length === 0 ? (
           <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
               <p className="text-gray-500">No hay contratos pendientes.</p>
           </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingContracts.map(contract => (
                <ContractCard 
                    key={contract.id} 
                    contract={contract} 
                    type="band" 
                    onClick={handleCardClick} 
                />
            ))}
        </div>
      )}

      {/* Pagination can be added if needed, but filtering locally for now might be enough if not too many pages */}
      
      <ContractDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        contract={selectedContract}
        actions={renderModalActions()}
      />
    </div>
  );
}

export default PendingContracts;
