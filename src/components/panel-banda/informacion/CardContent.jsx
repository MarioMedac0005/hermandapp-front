import { BriefcaseIcon, EnvelopeIcon, MapPinIcon, PhoneIcon, TagIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../../contexts/AuthContext";
import { stripeService } from "../../../services/stripeService";
import toast from "react-hot-toast";

function CardContent({ isEditing }) {
  const { user } = useAuth();
  
  const handleStripeOnboarding = async () => {
    try {
        const { url } = await stripeService.getOnboardingLink();
        if (url) {
            window.location.href = url;
        }
    } catch (error) {
        toast.error(error.message || "Error al redirigir a Stripe");
    }
  };

  return (
    <>
      <section className="p-5">
        {/* Check for explicit false or 0, ensuring band exists */}
        {user?.band && !user.band.stripe_onboarding_completed && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                            Debes completar tus datos bancarios para poder recibir pagos.
                        </p>
                        <p className="mt-2">
                            <button 
                                onClick={handleStripeOnboarding}
                                className="text-sm font-medium text-yellow-700 underline hover:text-yellow-600 cursor-pointer"
                            >
                                Configurar pagos ahora &rarr;
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        )}

        <div className="space-y-4">
          {/* Nombre */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-sm flex items-center gap-2 font-medium">
                <TagIcon className="size-4 text-purple-600" />
                Nombre de la Banda
              </span>
            </label>
            <input
              type="text"
              defaultValue="Banda del Cristo de Gracia"
              placeholder="Nombre de la banda"
              className="input input-bordered input-sm focus:input-primary w-full"
              disabled={!isEditing}
            />
          </div>

          {/* Ciudad */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-sm flex items-center gap-2 font-medium">
                <MapPinIcon className="text-purple-600 size-4" />
                Ciudad
              </span>
            </label>
            <input
              type="text"
              defaultValue="Sevilla"
              placeholder="Ciudad"
              className="input input-bordered input-sm focus:input-primary w-full"
              disabled={!isEditing}
            />
          </div>

          {/* Cargo */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-sm flex items-center gap-2 font-medium">
                <BriefcaseIcon className="size-4 text-purple-600" />
                Local de ensayo
              </span>
            </label>
            <input
              type="text"
              defaultValue="Direccion de ejemplo"
              placeholder="Cargo"
              className="input input-bordered input-sm focus:input-primary w-full"
              disabled={!isEditing}
            />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-sm flex items-center gap-2 font-medium">
                <EnvelopeIcon className="size-4 text-purple-600" />
                Correo Electrónico
              </span>
            </label>
            <input
              type="email"
              defaultValue="contacto@hermandad.es"
              placeholder="correo@ejemplo.com"
              className="input input-bordered input-sm focus:input-primary w-full"
              disabled={!isEditing}
            />
          </div>
        </div>

        {isEditing ? (
          <div className="flex gap-2 mt-5 pt-4 border-t border-gray-200">
            <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Guardar Cambios
            </button>
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Cancelar
            </button>
          </div>
        ) : (
          ""
        )}
      </section>
    </>
  );
}

export default CardContent;
