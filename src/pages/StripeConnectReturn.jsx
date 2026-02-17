import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const StripeConnectReturn = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // We use login to refresh user data
    const [status, setStatus] = useState('Verificando estado de cuenta...');

    useEffect(() => {
        const completeOnboarding = async () => {
            try {
                // Here we might want to call an endpoint to confirm, 
                // OR just refresh the user profile since the webhook should have fired.
                // Since the user flow says Stripe redirects to /stripe/complete,
                // and the backend listens to webhooks, we basically just need to 
                // re-fetch the user to get the updated stripe_onboarding_completed status.
                
                const token = localStorage.getItem('token');
                // Force a profile refresh
                await login(token); 
                
                toast.success('Cuenta de pagos configurada correctamente');
                navigate('/banda/panel/informacion');
                
            } catch (error) {
                console.error('Error finishing onboarding:', error);
                setStatus('Hubo un error al verificar tu cuenta. Por favor contacta con soporte.');
                toast.error('Error al verificar la cuenta');
                setTimeout(() => navigate('/banda/panel/informacion'), 3000);
            }
        };

        completeOnboarding();
    }, [navigate, login]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4 animate-pulse">
                        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-medium text-gray-900 mb-2">
                        {status}
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Por favor espera un momento...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StripeConnectReturn;
