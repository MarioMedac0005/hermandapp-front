import { useState, useEffect } from "react";
import InputField from "@components/forms/InputField";
import SelectField from "@components/forms/SelectField";
import { useCreateEntity } from "../../../hooks/useCreateEntity";
import { useUpdateEntity } from "../../../hooks/useUpdateEntity";
import { useFetchData } from "../../../hooks/useFetchData";
import { API_ENDPOINTS } from "../../../config/api";

function ProcessionForm({ initialData = null, onSuccess }) {
    const { create, loading: creating, error: createError } = useCreateEntity();
    const { update, loading: updating, error: updateError } = useUpdateEntity();
    
    // Fetch dependencies
    const { data: brotherhoods } = useFetchData(API_ENDPOINTS.brotherhoods);

    const loading = creating || updating;
    const error = createError || updateError;

    const [form, setForm] = useState({
        name: "",
        type: "christ", // valor por defecto
        itinerary: "",
        start_time: "",
        end_time: "",
        brotherhood_id: "",
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                name: initialData.name || "",
                type: initialData.type || "christ",
                itinerary: initialData.itinerary || "",
                start_time: initialData.start_time || "",
                end_time: initialData.end_time || "",
                brotherhood_id: initialData.brotherhood_id || "",
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
            result = await update(`${API_ENDPOINTS.processions}/${initialData.id}`, form);
        } else {
            result = await create(API_ENDPOINTS.processions, form);
        }

        if (result && onSuccess) {
            onSuccess();
        }
    };

    const typeOptions = [
        { id: "christ", name: "Cristo" },
        { id: "virgin", name: "Virgen" },
    ];
    
  return (
    <form onSubmit={handleSubmit} className="w-full">
        <InputField
          label="Nombre"
          name="name"
          type="text"
          placeholder="Nombre de la procesión"
          value={form.name}
          onChange={handleChange}
        />

        <SelectField
          label="Tipo"
          options={typeOptions}
          value={form.type}
          onChange={(val) => handleSelectChange("type", val)}
        />

        <InputField
          label="Itinerario"
          name="itinerary"
          type="text"
          placeholder="Descripción del itinerario"
          value={form.itinerary}
          onChange={handleChange}
        />

        <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Hora de salida"
              name="start_time"
              type="datetime-local"
              value={form.start_time}
              onChange={handleChange} 
            />

            <InputField
              label="Hora de llegada"
              name="end_time"
              type="datetime-local"
              value={form.end_time}
              onChange={handleChange} 
            />
        </div>

        <SelectField
          label="Hermandad"
          options={brotherhoods || []} // Usa las hermandades reales
          value={form.brotherhood_id}
          onChange={(val) => handleSelectChange("brotherhood_id", val)}
        />

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Guardando...' : (initialData ? 'Actualizar Procesión' : 'Crear Procesión')}
        </button>
      </div>

       {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
    </form>
  );
}

export default ProcessionForm;
