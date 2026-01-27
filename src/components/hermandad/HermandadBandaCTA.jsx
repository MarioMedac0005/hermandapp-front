import { useNavigate } from "react-router-dom";

export default function HermandadBandaCTA() {
    const navigate = useNavigate();

    return (
        <div className="bg-purple-700 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-3">
                ¿Buscas banda?
            </h3>

            <p className="mb-4 text-sm">
                Encuentra el acompañamiento musical perfecto para tu hermandad.
                Explora perfiles, escucha marchas y contacta directamente.
            </p>

            <button
                onClick={() => navigate("/hermandades/contratos/crear")}
                className="w-full py-3 bg-white text-purple-700 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
                Contratar Bandas
            </button>
        </div>
    );
}
