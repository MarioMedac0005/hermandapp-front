import { useState } from "react";
import ContractCard from "../../../components/ContractCard";
import { useFetchData } from "../../../hooks/useFetchData";
import { API_ENDPOINTS } from "../../../config/api";
import { useNavigate } from "react-router-dom";

function ContractsToSign() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { data, loading, error, pagination } = useFetchData(API_ENDPOINTS.contracts, page);

  // Filter for contracts that are accepted but maybe not signed yet?
  // The user requirement says "contracts accepted". 
  // Assuming 'accepted' status means it is ready to be signed.
  // If there is a 'signed' status later, we might need to filter that out.
  // For now, based on previous conversation, 'accepted' leads to signing.
  const signedContracts = data.filter(contract => contract.status === 'accepted');

  const handleCardClick = (contract) => {
     // Redirect to sign page
     // We need to ensure we have the pdf_path. If it's in the contract object from list, great.
     // If not, the SignContract page handles fetching or we might need to fetch details here.
     // Assuming contract object has pdf_path or SignContract handles it.
     navigate(`/banda/panel/contratos/${contract.id}/firmar`, { state: { pdf_path: contract.pdf_path } });
  };

  if (loading) return <p>Cargando contratos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold -mt-3 mb-6">Contratos Por Firmar</h1>
      
      {signedContracts.length === 0 ? (
           <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
               <p className="text-gray-500">No hay contratos pendientes de firma.</p>
           </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {signedContracts.map(contract => (
                <ContractCard 
                    key={contract.id} 
                    contract={contract} 
                    type="band" 
                    onClick={handleCardClick} 
                />
            ))}
        </div>
      )}
    </div>
  );
}

export default ContractsToSign;
