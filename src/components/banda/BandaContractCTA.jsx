import { useNavigate } from "react-router-dom";

export default function BandaContractCTA({ bandId }) {
    const navigate = useNavigate();

    return (
        <div className="bg-purple-700 text-white p-6 rounded-xl shadow-lg h-full flex flex-col justify-between">
            <div>
                <h3 className="text-xl font-bold mb-3">
                    ¿Quieres contratar esta banda?
                </h3>

                <p className="mb-4 text-sm">
                    Inicia el proceso de contratación ahora.
                    Envía una propuesta formal con los detalles de tu evento.
                </p>
            </div>

            <button
                onClick={() => navigate(`/hermandades/contratos/crear/${bandId}`)}
                className="w-full py-3 bg-white text-purple-700 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
                Contratar Banda
            </button>
        </div>
    );
}
