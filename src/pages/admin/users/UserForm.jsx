import { useState, useEffect } from "react";
import InputField from "@components/forms/InputField";
import SelectField from "@components/forms/SelectField";
import { useCreateEntity } from "../../../hooks/useCreateEntity";
import { useUpdateEntity } from "../../../hooks/useUpdateEntity";
import { useFetchData } from "../../../hooks/useFetchData";
import { API_ENDPOINTS } from "../../../config/api";

function UserForm({ initialData = null, onSuccess }) {
  const { create, loading: creating, error: createError } = useCreateEntity();
  const { update, loading: updating, error: updateError } = useUpdateEntity();
  const { data: bands } = useFetchData(API_ENDPOINTS.bands);
  const { data: brotherhoods } = useFetchData(API_ENDPOINTS.brotherhoods);
  
  const loading = creating || updating;
  const error = createError || updateError;

  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    password_confirmation: "",
    user_type: "guest",
    band_id: "",
    brotherhood_id: "",
  });

  useEffect(() => {
    if (initialData) {
        setForm({
            name: initialData.name || "",
            surname: initialData.surname || "",
            email: initialData.email || "",
            password: "", // Don't prefill password
            password_confirmation: "",
            user_type: initialData.user_type || (initialData.band_id ? "band_admin" : (initialData.brotherhood_id ? "brotherhood_admin" : "guest")),
            band_id: initialData.band_id || "",
            brotherhood_id: initialData.brotherhood_id || "",
        });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let result;
    const payload = { ...form };
    
    // Clean up payload based on user_type
    if (payload.user_type !== "band_admin") delete payload.band_id;
    if (payload.user_type !== "brotherhood_admin") delete payload.brotherhood_id;
    
    // We don't send user_type to the backend as per the required fields shown in user request, 
    // but maybe it's inferred from band_id/brotherhood_id or handled by a separate logic.
    // The requirement only showed name, surname, email, password, confirmed, band_id, brotherhood_id.
    // We will send band_id/brotherhood_id if set.

    if (initialData) {
        // Update
        if (!payload.password) {
            delete payload.password;
            delete payload.password_confirmation;
        }
        
        result = await update(`${API_ENDPOINTS.users}/${initialData.id}`, payload);
    } else {
        // Create
        result = await create(API_ENDPOINTS.users, payload);
    }

    if (result && onSuccess) {
        onSuccess();
    }
  };

  const userTypeOptions = [
    { id: "band_admin", name: "Administrador de Banda" },
    { id: "brotherhood_admin", name: "Administrador de Hermandad" },
    { id: "guest", name: "Invitado" },
  ];

  // Map bands and brotherhoods to options format {id, name}
  // Assuming the API returns an array of objects with id and name
  const bandOptions = bands ? bands.map(b => ({ id: b.id, name: b.name })) : [];
  const brotherhoodOptions = brotherhoods ? brotherhoods.map(b => ({ id: b.id, name: b.name })) : [];

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 gap-y-4">
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Nombre"
            name="name"
            type="text"
            placeholder="Nombre del usuario"
            value={form.name}
            onChange={handleChange}
          />
          <InputField
            label="Apellido"
            name="surname"
            type="text"
            placeholder="Apellidos del usuario"
            value={form.surname}
            onChange={handleChange}
          />
        </div>

        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="correo@ejemplo.com"
          value={form.email}
          onChange={handleChange}
        />

        <div className="grid grid-cols-2 gap-4">
            <InputField
            label="Contraseña"
            name="password"
            type="password"
            placeholder={initialData ? "Dejar en blanco para mantener" : "********"}
            value={form.password}
            onChange={handleChange}
            required={!initialData} 
            />
            <InputField
            label="Confirmar Contraseña"
            name="password_confirmation"
            type="password"
            placeholder={initialData ? "Dejar en blanco para mantener" : "********"}
            value={form.password_confirmation}
            onChange={handleChange}
            required={!initialData || form.password.length > 0} 
            />
        </div>

        <SelectField
          label="Tipo de Usuario"
          options={userTypeOptions}
          value={form.user_type}
          onChange={(val) => handleSelectChange('user_type', val)}
        />

        {(form.user_type === "band_admin" ) && ( 
           <SelectField
            label="Banda"
            options={bandOptions}
            value={form.band_id}
            onChange={(val) => handleSelectChange('band_id', val)}
            description="Selecciona la banda asociada"
          />
        )}

        {(form.user_type === "brotherhood_admin" ) && (
           <SelectField
            label="Hermandad"
            options={brotherhoodOptions}
            value={form.brotherhood_id}
            onChange={(val) => handleSelectChange('brotherhood_id', val)}
            description="Selecciona la hermandad asociada"
          />
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
           {loading ? 'Guardando...' : (initialData ? 'Actualizar Usuario' : 'Crear Usuario')}
        </button>
      </div>
      
       {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
    </form>
  );
}

export default UserForm;
