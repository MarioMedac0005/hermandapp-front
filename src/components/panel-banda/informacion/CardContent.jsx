import { useState, useEffect } from "react";
import { BuildingOfficeIcon, MapPinIcon, DocumentTextIcon, TagIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../../contexts/AuthContext";
import { stripeService } from "../../../services/stripeService";
import { bandService } from "../../../services/bandService";
import toast from "react-hot-toast";

function CardContent({ isEditing, setIsEditing }) {
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // Local state for the form inputs
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    city: "",
    rehearsal_space: "",
  });

  // Populate data when user changes
  useEffect(() => {
    if (user?.band) {
      setFormData({
        name: user.band.name || "",
        description: user.band.description || "",
        city: user.band.city || "",
        rehearsal_space: user.band.rehearsal_space || "",
      });
    }
  }, [user]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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

  const handleSave = async () => {
    if (!user?.band?.id) return;
    
    setLoading(true);
    try {
      // Merge all existing band fields to avoid missing required fields errors from the backend.
      const payload = {
        ...user.band,
        ...formData
      };
      
      await bandService.updateProfile(user.band.id, payload);
      toast.success("Perfil actualizado correctamente");
      // Refresh user to get updated band info
      await login(localStorage.getItem('token'));
      if (setIsEditing) {
        setIsEditing(false);
      }
    } catch (error) {
      toast.error(error.message || "Error al actualizar el perfil");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (user?.band) {
      setFormData({
        name: user.band.name || "",
        description: user.band.description || "",
        city: user.band.city || "",
        rehearsal_space: user.band.rehearsal_space || "",
      });
    }
    if (setIsEditing) {
      setIsEditing(false);
    }
  };

  return (
    <>
      <section className="p-6 md:p-8 bg-white text-gray-800">
        {/* Check for explicit false or 0, ensuring band exists */}
        {user?.band && !user.band.stripe_onboarding_completed && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-5 mb-8 shadow-sm transition-all">
                <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                        <svg className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3 flex-1">
                        <h4 className="text-sm font-semibold text-orange-800">Atención requerida</h4>
                        <p className="mt-1 text-sm text-orange-700">
                            Debes completar tus datos bancarios para poder recibir pagos.
                        </p>
                        <button 
                            onClick={handleStripeOnboarding}
                            className="mt-3 inline-flex items-center text-sm font-medium text-orange-700 hover:text-orange-800 transition-colors cursor-pointer group"
                        >
                            <span className="border-b border-orange-700 group-hover:border-orange-800">Configurar pagos ahora</span>
                            <span aria-hidden="true" className="ml-1">&rarr;</span>
                        </button>
                    </div>
                </div>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Nombre */}
          <div className="col-span-1 md:col-span-2 form-control space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <TagIcon className="h-4 w-4 text-purple-600" />
              Nombre de la Banda
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej. Banda del Cristo de Gracia"
              className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 focus:bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-purple-300 disabled:opacity-75 disabled:cursor-not-allowed ${!isEditing ? 'border-transparent bg-gray-50/50 shadow-none' : 'border-gray-300 shadow-sm'}`}
              disabled={!isEditing || loading}
            />
          </div>

          {/* Description */}
          <div className="col-span-1 md:col-span-2 form-control space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <DocumentTextIcon className="h-4 w-4 text-purple-600" />
              Descripción o Historia
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Cuéntanos sobre la banda, su fundación, estilo musical..."
              rows={4}
              className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 focus:bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-purple-300 disabled:opacity-75 disabled:cursor-not-allowed resize-none ${!isEditing ? 'border-transparent bg-gray-50/50 shadow-none' : 'border-gray-300 shadow-sm'}`}
              disabled={!isEditing || loading}
            />
          </div>

          {/* Ciudad */}
          <div className="form-control space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 text-purple-600" />
              Ciudad
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Ej. Sevilla"
              className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 focus:bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-purple-300 disabled:opacity-75 disabled:cursor-not-allowed ${!isEditing ? 'border-transparent bg-gray-50/50 shadow-none' : 'border-gray-300 shadow-sm'}`}
              disabled={!isEditing || loading}
            />
          </div>

          {/* Local de ensayo */}
          <div className="form-control space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <BuildingOfficeIcon className="h-4 w-4 text-purple-600" />
              Lugar de Ensayo
            </label>
            <input
              type="text"
              name="rehearsal_space"
              value={formData.rehearsal_space}
              onChange={handleChange}
              placeholder="Ej. C/ Falsa 123"
              className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 focus:bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-purple-300 disabled:opacity-75 disabled:cursor-not-allowed ${!isEditing ? 'border-transparent bg-gray-50/50 shadow-none' : 'border-gray-300 shadow-sm'}`}
              disabled={!isEditing || loading}
            />
          </div>
        </div>

        {/* Acciones */}
        {isEditing && (
          <div className="flex gap-3 justify-end mt-10 pt-6 border-t border-gray-100">
            <button 
              onClick={handleCancel}
              disabled={loading}
              className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button 
              onClick={handleSave}
              disabled={loading}
              className="cursor-pointer px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-medium text-sm shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 flex items-center gap-2 disabled:opacity-70 disabled:cursor-wait"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </>
              ) : (
                <>
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
                </>
              )}
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default CardContent;
