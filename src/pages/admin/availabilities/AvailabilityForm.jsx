import { useState, useEffect } from "react";
import InputField from "@components/forms/InputField";
import SelectField from "@components/forms/SelectField";
import { useCreateEntity } from "../../../hooks/useCreateEntity";
import { useUpdateEntity } from "../../../hooks/useUpdateEntity";
import { useFetchData } from "../../../hooks/useFetchData";
import { API_ENDPOINTS } from "../../../config/api";

function AvailabilityForm({ initialData = null, onSuccess, preselectedBandId = null }) {
    const { create, loading: creating, error: createError } = useCreateEntity();
    const { update, loading: updating, error: updateError } = useUpdateEntity();
    
    // Fetch dependencies for selects only if we don't have a preselected band
    const { data: bands } = useFetchData(API_ENDPOINTS.bands);

    const loading = creating || updating;
    const error = createError || updateError;

    const [form, setForm] = useState({
        date: "",
        status: "free",
        description: "",
        band_id: preselectedBandId || "",
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                date: initialData.date || "",
                status: initialData.status || "free",
                description: initialData.description || "",
                band_id: initialData.band_id || preselectedBandId || "",
            });
        }
    }, [initialData, preselectedBandId]);

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
            result = await update(`${API_ENDPOINTS.availabilities}/${initialData.id}`, form);
        } else {
            result = await create(API_ENDPOINTS.availabilities, form);
        }

        if (result && onSuccess) {
            onSuccess();
        }
    };

    const statusOptions = [
        { id: "free", name: "Libre" },
        { id: "occupied", name: "Ocupado" },
    ];
    
  return (
    <form onSubmit={handleSubmit} className="w-full">
        <InputField
          label="Fecha"
          name="date"
          type="datetime-local"
          value={form.date}
          onChange={handleChange}
        />

        <SelectField
          label="Estado"
          options={statusOptions}
          value={form.status}
          onChange={(val) => handleSelectChange("status", val)}
        />

        <InputField
          label="Descripción"
          name="description"
          type="text"
          placeholder="Descripción (opcional)"
          value={form.description}
          onChange={handleChange} 
        />

        {!preselectedBandId && (
            <SelectField
              label="Banda"
              options={bands || []} // Usa las bandas reales
              value={form.band_id}
              onChange={(val) => handleSelectChange("band_id", val)}
            />
        )}

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
           {loading ? 'Guardando...' : (initialData ? 'Actualizar Disponibilidad' : 'Crear Disponibilidad')}
        </button>
      </div>

       {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
    </form>
  );
}

export default AvailabilityForm;
