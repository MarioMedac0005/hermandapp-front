import { useState, useEffect } from "react";
import { BriefcaseIcon, EnvelopeIcon, MapPinIcon, PhoneIcon, TagIcon, UserGroupIcon, CalendarIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../../contexts/AuthContext";
import { brotherhoodService } from "../../../services/brotherhoodService";
import toast from "react-hot-toast";

function CardContent({ isEditing, setIsEditing }) {
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [originalData, setOriginalData] = useState(null);

  // Local state for the form inputs
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    city: "",
    office: "",
    phone_number: "",
    email: "",
    nazarenes: "",
    year_of_founding: "",
  });

  // Populate data when user changes
  useEffect(() => {
    if (user?.brotherhood) {
      const data = {
        name: user.brotherhood.name || "",
        description: user.brotherhood.description || "",
        city: user.brotherhood.city || "",
        office: user.brotherhood.office || "",
        phone_number: user.brotherhood.phone_number || "",
        email: user.brotherhood.email || "",
        nazarenes: user.brotherhood.nazarenes || "",
        year_of_founding: user.brotherhood.year_of_founding || "",
      };

      setFormData(data);
      setOriginalData(data);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!user?.brotherhood?.id) return;

    setLoading(true);
    try {
      // Merge all existing brotherhood fields to avoid missing required fields errors from the backend.
      const payload = {
        ...user.brotherhood,
        ...formData
      };

      await brotherhoodService.updateProfile(user.brotherhood.id, payload);
      toast.success("Perfil actualizado correctamente");
      // Refresh user to get updated brotherhood info
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
    if (originalData) {
      setFormData(originalData);
    }
    setIsEditing(false);
  };

  return (
    <>
      <section className="p-6 md:p-8 bg-white text-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Nombre */}
          <div className="col-span-1 md:col-span-2 form-control space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <TagIcon className="h-4 w-4 text-purple-600" />
              Nombre de la Hermandad
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Hermandad del Cristo de la Expiración"
              className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 focus:bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-purple-300 disabled:opacity-75 disabled:cursor-not-allowed ${!isEditing ? 'border-transparent bg-gray-50/50 shadow-none' : 'border-gray-300 shadow-sm'}`}
              disabled={!isEditing || loading}
            />
          </div>

          {/* Description */}
          <div className="col-span-1 md:col-span-2 form-control space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <svg className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              Historia de la Hermandad
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Escribe aquí la historia o descripción..."
              rows={4}
              className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 focus:bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-purple-300 disabled:opacity-75 disabled:cursor-not-allowed resize-none ${!isEditing ? 'border-transparent bg-gray-50/50 shadow-none' : 'border-gray-300 shadow-sm resize-y'}`}
              disabled={!isEditing || loading}
            />
          </div>

          {/* Sede / Oficina */}
          <div className="col-span-1 md:col-span-2 form-control space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <BriefcaseIcon className="h-4 w-4 text-purple-600" />
              Sede (Office)
            </label>
            <input
              type="text"
              name="office"
              value={formData.office}
              onChange={handleChange}
              placeholder="Parroquia de San Jacinto"
              className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 focus:bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-purple-300 disabled:opacity-75 disabled:cursor-not-allowed ${!isEditing ? 'border-transparent bg-gray-50/50 shadow-none' : 'border-gray-300 shadow-sm'}`}
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
              placeholder="Córdoba"
              className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 focus:bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-purple-300 disabled:opacity-75 disabled:cursor-not-allowed ${!isEditing ? 'border-transparent bg-gray-50/50 shadow-none' : 'border-gray-300 shadow-sm'}`}
              disabled={!isEditing || loading}
            />
          </div>

          {/* Teléfono */}
          <div className="form-control space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <PhoneIcon className="h-4 w-4 text-purple-600" />
              Teléfono
            </label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="+34 954 123 456"
              className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 focus:bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-purple-300 disabled:opacity-75 disabled:cursor-not-allowed ${!isEditing ? 'border-transparent bg-gray-50/50 shadow-none' : 'border-gray-300 shadow-sm'}`}
              disabled={!isEditing || loading}
            />
          </div>

          {/* Email */}
          <div className="form-control space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <EnvelopeIcon className="h-4 w-4 text-purple-600" />
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="contacto@hermandad.es"
              className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 focus:bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-purple-300 disabled:opacity-75 disabled:cursor-not-allowed ${!isEditing ? 'border-transparent bg-gray-50/50 shadow-none' : 'border-gray-300 shadow-sm'}`}
              disabled={!isEditing || loading}
            />
          </div>

          {/* Nazarenos */}
          <div className="form-control space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <UserGroupIcon className="h-4 w-4 text-purple-600" />
              Número de Nazarenos
            </label>
            <input
              type="number"
              name="nazarenes"
              value={formData.nazarenes}
              onChange={handleChange}
              placeholder="1500"
              className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 focus:bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-purple-300 disabled:opacity-75 disabled:cursor-not-allowed ${!isEditing ? 'border-transparent bg-gray-50/50 shadow-none' : 'border-gray-300 shadow-sm'}`}
              disabled={!isEditing || loading}
            />
          </div>

          {/* Año de Fundación */}
          <div className="form-control space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-purple-600" />
              Año de Fundación
            </label>
            <input
              type="number"
              name="year_of_founding"
              value={formData.year_of_founding}
              onChange={handleChange}
              placeholder="1560"
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
              className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-medium text-sm shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 flex items-center gap-2 disabled:opacity-70 disabled:cursor-wait"
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

