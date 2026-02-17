import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

export default function BandaContratarCTA() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { band } = useParams();

    // Only visible to authenticated users who manage a brotherhood
    if (!user || (!user.brotherhood_id && !user.brotherhood)) return null;

    return (
        <section className="bg-linear-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-xl shadow-sm p-6 md:p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/40 rounded-full blur-3xl group-hover:bg-purple-100/50 transition-colors duration-500" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        ¿Quieres contratar esta banda?
                    </h2>
                    <p className="text-gray-500 max-w-lg text-sm md:text-base">
                        Inicia el proceso de contratación de forma sencilla y segura a través de nuestra plataforma.
                    </p>
                </div>

                <button
                    onClick={() => navigate(`/hermandades/contratos/crear/${band}`)}
                    className="shrink-0 bg-purple-600 text-white hover:bg-purple-700 px-6 py-2.5 rounded-lg font-semibold shadow-md shadow-purple-200 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 cursor-pointer"
                >
                    <DocumentTextIcon className="size-5" />
                    Solicitar Contrato
                </button>
            </div>
        </section>
    );
}
