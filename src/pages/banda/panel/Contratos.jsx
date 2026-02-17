import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContractCard from "../../../components/ContractCard";
import ContractDetailModal from "../../../components/ContractDetailModal";
import ContractForm from "../../admin/contracts/ContractForm"; // Reusing admin form
import Modal from "../../../components/Modal"; // Needed for edit modal
import { useFetchData } from "../../../hooks/useFetchData";
import { API_ENDPOINTS } from "../../../config/api";
import toast from "react-hot-toast";
import { invoiceService } from "../../../services/invoiceService";


function Contratos() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'pending', 'to_sign'
  const navigate = useNavigate();

  const { data, loading, error, refetch, pagination } = useFetchData(API_ENDPOINTS.contracts, page);

  // Filter contracts based on active tab
  const filteredData = data.filter(contract => {
      if (activeTab === 'all') return true;
      if (activeTab === 'pending') return contract.status === 'pending';
      if (activeTab === 'to_sign') return contract.status === 'accepted';
      if (activeTab === 'paid') return contract.status === 'paid';
      return true;
  });

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
                 const pdfUrl = resData.pdf_url;
                 if (pdfUrl) {
                     navigate(`/banda/panel/contratos/${id}/firmar`, { state: { pdf_url: pdfUrl } });
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

  const handleEdit = (contract) => {
    setSelectedContract(contract);
    setIsEditModalOpen(true);
    setIsDetailModalOpen(false); // Close detail modal if switching to edit
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

  const handleDownloadInvoice = async (invoiceId) => {
    const loadingToast = toast.loading('Descargando factura...');
    try {
      await invoiceService.downloadInvoice(invoiceId);
      toast.success('Factura descargada correctamente', { id: loadingToast });
    } catch (error) {
      toast.error('Error al descargar la factura', { id: loadingToast });
    }
  };

  const renderModalActions = () => {
      if (!selectedContract) return null;
      
      const isPending = selectedContract.status === 'pending';
      const isReadyToSign = selectedContract.status === 'accepted'; // Accepted by band, ready to sign
      const hasInvoice = selectedContract.invoice !== null && selectedContract.invoice !== undefined;

      return (
          <>
            <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 cursor-pointer"
            >
                Cerrar
            </button>
            {isPending && (
                <>
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
            )}
            {isReadyToSign && (
                <button
                    onClick={() => {
                        setIsDetailModalOpen(false);
                        navigate(`/banda/panel/contratos/${selectedContract.id}/firmar`, { state: { pdf_url: selectedContract.pdf_url } });
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 cursor-pointer"
                >
                    Firmar
                </button>
            )}
            {hasInvoice && (
                <button
                    onClick={() => handleDownloadInvoice(selectedContract.invoice.id)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                >
                    Descargar Factura
                </button>
            )}
          </>
      );
  };

  if (loading) return <p>Cargando contratos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold -mt-3 mb-6">Contratos</h1>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200 mb-6 overflow-x-auto">
        <button
          className={`py-2 px-4 border-b-2 font-medium text-sm focus:outline-none whitespace-nowrap ${
            activeTab === 'all'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => { setActiveTab('all'); setPage(1); }}
        >
          Todos
        </button>
        <button
          className={`py-2 px-4 border-b-2 font-medium text-sm focus:outline-none whitespace-nowrap ${
            activeTab === 'pending'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => { setActiveTab('pending'); setPage(1); }}
        >
          Pendientes
        </button>
        <button
          className={`py-2 px-4 border-b-2 font-medium text-sm focus:outline-none whitespace-nowrap ${
            activeTab === 'to_sign'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => { setActiveTab('to_sign'); setPage(1); }}
        >
          Por Firmar
        </button>
        <button
          className={`py-2 px-4 border-b-2 font-medium text-sm focus:outline-none whitespace-nowrap ${
            activeTab === 'paid'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => { setActiveTab('paid'); setPage(1); }}
        >
          Pagados
        </button>
      </div>

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
      
      {filteredData.length === 0 ? (
           <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
               <p className="text-gray-500">
                   {activeTab === 'all' && "No hay contratos disponibles."}
                    {activeTab === 'pending' && "No tienes contratos pendientes."}
                    {activeTab === 'to_sign' && "No tienes contratos por firmar."}
                    {activeTab === 'paid' && "No hay contratos pagados."}
                </p>
           </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map(contract => (
                <ContractCard 
                    key={contract.id} 
                    contract={contract} 
                    type="band" 
                    onClick={handleCardClick} 
                />
            ))}
        </div>
      )}

      {/* Pagination Controls reused/adapted from Table logic or a specific component? 
          For now I'll create a simple Pagination component or render it here.
          Since Table had it built-in, I need to render it here for the grid.
      */}
      {pagination && pagination.last_page > 1 && (
        <div className="flex items-center justify-between px-6 py-4 mt-6 bg-white rounded-xl border border-gray-100">
             {/* ... Reuse pagination logic from Table ... */}
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
