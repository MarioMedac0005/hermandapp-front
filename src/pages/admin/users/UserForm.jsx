import { useState, useEffect } from "react";
import InputField from "@components/forms/InputField";
import { useCreateEntity } from "../../../hooks/useCreateEntity";
import { useUpdateEntity } from "../../../hooks/useUpdateEntity";
import { API_ENDPOINTS } from "../../../config/api";

function UserForm({ initialData = null, onSuccess }) {
  const { create, loading: creating, error: createError } = useCreateEntity();
  const { update, loading: updating, error: updateError } = useUpdateEntity();
  
  const loading = creating || updating;
  const error = createError || updateError;

  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    if (initialData) {
        setForm({
            name: initialData.name || "",
            surname: initialData.surname || "",
            email: initialData.email || "",
            password: "", // Don't prefill password
            password_confirmation: "",
        });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let result;
    const payload = { ...form };
    
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
