import { useState, useEffect } from "react";
import InputField from "@components/forms/InputField";
import SelectField from "@components/forms/SelectField";
import { useCreateEntity } from "../../../hooks/useCreateEntity";
import { useUpdateEntity } from "../../../hooks/useUpdateEntity";
import { useFetchData } from "../../../hooks/useFetchData";
import { API_ENDPOINTS } from "../../../config/api";

function ContractForm({ initialData = null, onSuccess }) {
    const { create, loading: creating, error: createError } = useCreateEntity();
    const { update, loading: updating, error: updateError } = useUpdateEntity();
    
    // Fetch dependencies for selects
    const { data: bands } = useFetchData(API_ENDPOINTS.bands);
    const { data: processions } = useFetchData(API_ENDPOINTS.processions);

    const loading = creating || updating;
    const error = createError || updateError;

    const [form, setForm] = useState({
        date: "",
        status: "pending",
        amount: "",
        description: "",
        band_id: "",
        procession_id: "",
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                date: initialData.date || "",
                status: initialData.status || "pending",
                amount: initialData.amount || "",
                description: initialData.description || "",
                band_id: initialData.band_id || "",
                procession_id: initialData.procession_id || "",
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
        
        // Ensure amount is a number if needed, but strings usually work with API
        
        let result;
        if (initialData) {
            result = await update(`${API_ENDPOINTS.contracts}/${initialData.id}`, form);
        } else {
            result = await create(API_ENDPOINTS.contracts, form);
        }

        if (result && onSuccess) {
            onSuccess();
        }
    };

    const statusOptions = [
        { id: "expired", name: "Expirado" },
        { id: "pending", name: "Pendiente" },
        { id: "active", name: "Activo" },
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
          label="Importe"
          name="amount"
          type="number"
          step="0.01"
          placeholder="Cantidad"
          value={form.amount}
          onChange={handleChange}
        />

        <InputField
          label="Descripción"
          name="description"
          as="textarea"
          type="text"
          placeholder="Descripción del contrato"
          value={form.description}
          onChange={handleChange} 
        />

        <SelectField
          label="Banda"
          options={bands || []} // Usa las bandas reales
          value={form.band_id}
          onChange={(val) => handleSelectChange("band_id", val)}
        />

        <SelectField
          label="Procesión"
          options={processions || []} // Usa las procesiones reales
          value={form.procession_id}
          onChange={(val) => handleSelectChange("procession_id", val)}
        />

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
           {loading ? 'Guardando...' : (initialData ? 'Actualizar Contrato' : 'Crear Contrato')}
        </button>
      </div>

       {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
    </form>
  );
}

export default ContractForm;
