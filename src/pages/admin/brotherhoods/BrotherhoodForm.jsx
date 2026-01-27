import { useState, useEffect } from "react";
import InputField from "@components/forms/InputField";
import SelectField from "@components/forms/SelectField";
import { useCreateEntity } from "../../../hooks/useCreateEntity";
import { useUpdateEntity } from "../../../hooks/useUpdateEntity";
import { API_ENDPOINTS } from "../../../config/api";

function BrotherhoodForm({ initialData = null, onSuccess }) {
    const { create, loading: creating, error: createError } = useCreateEntity();
    const { update, loading: updating, error: updateError } = useUpdateEntity();
    
    const loading = creating || updating;
    const error = createError || updateError;

    const [form, setForm] = useState({
        name: "",
        city: "",
        office: "",
        phone: "",
        email: "",
    });

    const cityOptions = [
        { value: "almeria", label: "Almería" },
        { value: "cadiz", label: "Cádiz" },
        { value: "cordoba", label: "Córdoba" },
        { value: "granada", label: "Granada" },
        { value: "huelva", label: "Huelva" },
        { value: "jaen", label: "Jaén" },
        { value: "malaga", label: "Málaga" },
        { value: "sevilla", label: "Sevilla" },
    ];

    useEffect(() => {
        if (initialData) {
            setForm({
                name: initialData.name || "",
                city: initialData.city || "",
                office: initialData.office || "",
                phone: initialData.phone || "",
                email: initialData.email || "",
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (name, value) => {
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let result;
        if (initialData) {
            result = await update(`${API_ENDPOINTS.brotherhoods}/${initialData.id}`, form);
        } else {
            result = await create(API_ENDPOINTS.brotherhoods, form);
        }

        if (result && onSuccess) {
            onSuccess();
        }
    };

  return (
    <form onSubmit={handleSubmit} className="w-full">
        <InputField
          label="Nombre"
          name="name"
          type="text"
          placeholder="Nombre de la hermandad"
          value={form.name}
          onChange={handleChange}
        />

        <SelectField
          label="Ciudad"
          options={cityOptions}
          value={form.city}
          onChange={(val) => handleSelectChange("city", val)}
        />

        <InputField
          label="Oficina"
          name="office"
          type="text"
          placeholder="Dirección de la oficina"
          value={form.office}
          onChange={handleChange}
        />

        <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Teléfono"
              name="phone"
              type="text"
              placeholder="Número de teléfono"
              value={form.phone}
              onChange={handleChange}
            />

            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="Email de contacto"
              value={form.email}
              onChange={handleChange}
            />
        </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Guardando...' : (initialData ? 'Actualizar Hermandad' : 'Crear Hermandad')}
        </button>
      </div>

       {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
    </form>
  );
}

export default BrotherhoodForm;
