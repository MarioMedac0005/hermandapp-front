import { useState, useEffect } from "react";
import InputField from "@components/forms/InputField";
import SelectField from "@components/forms/SelectField";
import { useCreateEntity } from "../../../hooks/useCreateEntity";
import { useUpdateEntity } from "../../../hooks/useUpdateEntity";
import { API_ENDPOINTS } from "../../../config/api";

function UserForm({ initialData = null, onSuccess }) {
  const { create, loading: creating, error: createError } = useCreateEntity();
  const { update, loading: updating, error: updateError } = useUpdateEntity();
  
  const loading = creating || updating;
  const error = createError || updateError;

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    user_type: "guest",
    band_id: "",
    brotherhood_id: "",
  });

  useEffect(() => {
    if (initialData) {
        setForm({
            firstname: initialData.firstname || "",
            lastname: initialData.lastname || "",
            email: initialData.email || "",
            password: "", // Don't prefill password
            user_type: initialData.user_type || "guest",
            band_id: initialData.band_id || "",
            brotherhood_id: initialData.brotherhood_id || "",
        });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setForm({ ...form, user_type: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let result;
    if (initialData) {
        // Update
        // Exclude password if empty to avoid overwriting with empty string if backend handles it
        const payload = { ...form };
        if (!payload.password) delete payload.password;
        
        result = await update(`${API_ENDPOINTS.users}/${initialData.id}`, payload);
    } else {
        // Create
        result = await create(API_ENDPOINTS.users, form);
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
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 gap-y-4">
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Nombre"
            name="firstname"
            type="text"
            placeholder="John"
            value={form.firstname}
            onChange={handleChange}
          />
          <InputField
            label="Apellido"
            name="lastname"
            type="text"
            placeholder="Doe"
            value={form.lastname}
            onChange={handleChange}
          />
        </div>

        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="john.doe@example.com"
          value={form.email}
          onChange={handleChange}
        />

        <InputField
          label="Contraseña"
          name="password"
          type="password"
          placeholder={initialData ? "Dejar en blanco para mantener" : "********"}
          value={form.password}
          onChange={handleChange}
          required={!initialData} 
        />

        <SelectField
          label="Tipo de Usuario"
          options={userTypeOptions}
          value={form.user_type}
          onChange={handleSelectChange}
        />

        {(form.user_type === "band_admin" ) && ( 
           <InputField
            label="ID de Banda"
            name="band_id"
            type="number"
            placeholder="1"
            value={form.band_id}
            onChange={handleChange}
            description="Opcional: ID de la banda asociada"
          />
        )}

        {(form.user_type === "brotherhood_admin" ) && (
           <InputField
            label="ID de Hermandad"
            name="brotherhood_id"
            type="number"
            placeholder="1"
            value={form.brotherhood_id}
            onChange={handleChange}
            description="Opcional: ID de la hermandad asociada"
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
