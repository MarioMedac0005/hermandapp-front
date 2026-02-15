import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
// Imports limpios para evitar dependencias no instaladas

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const sessionId = searchParams.get('session_id');
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        // Simple success animation triggers
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        if (countdown === 0) {
            navigate('/hermandad/panel/contratos');
        }

        return () => clearInterval(timer);
    }, [countdown, navigate]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 text-center relative overflow-hidden">
                    {/* Decorative background element */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-green-400 to-green-600"></div>

                    <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6 animate-pulse">
                        <svg className="h-16 w-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                        ¡Pago Exitoso!
                    </h2>
                    
                    <p className="text-gray-600 mb-8">
                        El pago se ha procesado correctamente. El estado del contrato se actualizará en breve.
                    </p>

                    <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-500 break-all">
                            Referencia de transacción: <br/>
                            <span className="font-mono text-xs">{sessionId || 'N/A'}</span>
                        </div>

                        <button
                            onClick={() => navigate('/hermandad/panel/contratos')}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 cursor-pointer"
                        >
                            Volver a mis contratos ({countdown}s)
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Simple footer */}
            <div className="mt-8 text-center text-sm text-gray-400">
                <p>&copy; {new Date().getFullYear()} HermandApp. Todos los derechos reservados.</p>
            </div>
        </div>
    );
};

export default PaymentSuccess;
