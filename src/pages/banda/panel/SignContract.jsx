import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { API_ENDPOINTS } from "../../../config/api"; // Ensure API_BASE_URL is available
import { signatureService } from "../../../services/signatureService";

function SignContract() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  // We prefer fetching fresh data, but location.state is a fallback
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signing, setSigning] = useState(false);

  // Determine if this component is being used for Band or Brotherhood based on URL
  const isBrotherhood = location.pathname.includes('/hermandad/');
  
  useEffect(() => {
      let isMounted = true;
      let blobUrl = null;

      const fetchPreview = async () => {
          try {
            const token = localStorage.getItem('token');
            // User requested 'preview-original' for the visual preview
            const response = await fetch(`${API_ENDPOINTS.contracts}/${id}/preview-original`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) throw new Error("Error cargando el contrato");

            const contentType = response.headers.get("content-type");
            
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                // Backend returns { success: true, pdf_path: "..." }
                if (data.url) {
                    setPdfUrl(data.url);
                } else if (data.pdf_path) {
                    setPdfUrl(data.pdf_path); 
                } else {
                     throw new Error("El servidor devolvió JSON pero sin URL válida.");
                }
            } else {
                // Assume blob (PDF stream)
                const blob = await response.blob();
                if (isMounted) {
                    blobUrl = URL.createObjectURL(blob);
                    setPdfUrl(blobUrl);
                }
            }
            setLoading(false);
          } catch (err) {
              console.error(err);
              if (isMounted) {
                  toast.error("No se pudo cargar la vista previa del contrato.");
                  setLoading(false);
              }
          }
      };

      fetchPreview();

      // Cleanup
      return () => {
          isMounted = false;
          if (blobUrl) URL.revokeObjectURL(blobUrl);
      };
  }, [id]);

  const fetchPdfForSigning = async () => {
      // Use the specific endpoint for signing content for BOTH roles as per instructions
      // "/contracts/{contract}/pdf-for-signing" handling logic is on backend
      const token = localStorage.getItem('token');
      const url = `${API_ENDPOINTS.contracts}/${id}/pdf-for-signing`;

      const response = await fetch(url, {
          headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error("Error obteniendo el documento para firmar");
      
      // Check if it returns JSON (e.g. url) or Blob
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
           const resData = await response.json();
           
           // Backend returns { success: true, data: { pdf_base64: "..." } }
           if (resData.data && resData.data.pdf_base64) {
               return resData.data.pdf_base64;
           } else if (resData.url) {
               // Fallback if it returns a URL instead of base64
               const pdfRes = await fetch(resData.url);
               const blob = await pdfRes.blob();
               return new Promise((resolve, reject) => {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                      const base64 = reader.result.split(',')[1];
                      resolve(base64);
                  };
                  reader.onerror = reject;
                  reader.readAsDataURL(blob);
              });
           } else {
               throw new Error("Respuesta inválida al solicitar PDF para firma: No se encontró pdf_base64 ni url");
           }
      } else {
           const blob = await response.blob();
           return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                  const base64 = reader.result.split(',')[1];
                  resolve(base64);
              };
              reader.onerror = reject;
              reader.readAsDataURL(blob);
          });
      }
  };

  const submitSignedDocument = async (signedBase64) => {
      const token = localStorage.getItem('token');
      
      let action = isBrotherhood ? 'sign/brotherhood' : 'sign/band';
      let url = `${API_ENDPOINTS.contracts}/${id}/${action}`;
      
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
              signed_pdf: signedBase64
          })
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error al guardar el documento firmado");
      }
      
      return await response.json();
  };

  const handleSign = async () => {
    if (signing) return;
    setSigning(true);
    const loadingToast = toast.loading("Iniciando proceso de firma...");

    try {
        // 1. Get Base64 of document to sign
        const base64ToSign = await fetchPdfForSigning();
        
        // 2. Invoke AutoFirma
        let signedBase64;
        try {
             // We use our service that wraps window.AutoScript.sign
             signedBase64 = await signatureService.signDocument(base64ToSign);
        } catch (e) {
             toast.dismiss(loadingToast);
             toast.error(`Error AutoFirma: ${e.message}`);
             console.error("AutoFirma error", e);
             setSigning(false);
             return;
        }

        // 3. Submit
        await submitSignedDocument(signedBase64);

        toast.dismiss(loadingToast);
        toast.success("Contrato firmado correctamente");
        
        // Redirect
        if (isBrotherhood) {
            navigate("/hermandad/panel/contratos");
        } else {
            navigate("/banda/panel/contratos");
        }

    } catch (error) {
        console.error("Sign errors", error);
        toast.dismiss(loadingToast);
        toast.error(`Error en la firma: ${error.message}`);
        setSigning(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Cargando contrato...</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] px-4 py-2">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
            {isBrotherhood ? `Visar y Firmar Contrato #${id}` : `Firmar Contrato #${id}`}
        </h1>
        <div className="flex gap-3 w-full sm:w-auto">
             <button
                onClick={() => navigate(-1)}
                className="flex-1 sm:flex-none px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={signing}
             >
                Cancelar
             </button>
            <button
              onClick={handleSign}
              disabled={signing}
              className={`flex-1 sm:flex-none px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-colors ${signing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {signing ? 'Procesando...' : 'Firmar con AutoFirma'}
            </button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm relative">
        {pdfUrl ? (
           <iframe
            src={pdfUrl}
            className="w-full h-full border-none"
            title="Vista previa del contrato"
          />
        ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
                Archivo no disponible
            </div>
        )}
      </div>
    </div>
  );
}

export default SignContract;
