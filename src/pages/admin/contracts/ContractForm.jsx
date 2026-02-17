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
        performance_date: "",
        performance_type: "procession",
        status: "pending",
        amount: "",
        additional_information: "",
        approximate_route: "",
        duration: "",
        minimum_musicians: "",
        band_id: "",
        procession_id: "",
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                performance_date: initialData.performance_date || "",
                performance_type: initialData.performance_type || "procession",
                status: initialData.status || "pending",
                amount: initialData.amount || "",
                additional_information: initialData.additional_information || "",
                approximate_route: initialData.approximate_route || "",
                duration: initialData.duration || "",
                minimum_musicians: initialData.minimum_musicians || "",
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
        
        // Ensure numeric fields are numbers if necessary
        const payload = {
            ...form,
            amount: form.amount ? parseFloat(form.amount) : null,
            duration: form.duration ? parseInt(form.duration) : null,
            minimum_musicians: form.minimum_musicians ? parseInt(form.minimum_musicians) : null,
        };
        
        let result;
        if (initialData) {
            result = await update(`${API_ENDPOINTS.contracts}/${initialData.id}`, payload);
        } else {
            result = await create(API_ENDPOINTS.contracts, payload);
        }

        if (result && onSuccess) {
            onSuccess();
        }
    };

    const statusOptions = [
        { id: "pending", name: "Pendiente" },
        { id: "rejected", name: "Rechazado" },
        { id: "accepted", name: "Aceptado" },
        { id: "signed_by_band", name: "Firmado por Banda" },
        { id: "signed_by_brotherhood", name: "Firmado por Hermandad" },
        { id: "completed", name: "Completado" },
        { id: "paid", name: "Pagado" },
        { id: "payment_failed", name: "Pago Fallido" },
        { id: "expired", name: "Expirado" },
    ];

    const typeOptions = [
        { id: "procession", name: "Procesión" },
        { id: "concert", name: "Concierto" },
        { id: "transfer", name: "Traslado" },
        { id: "festival", name: "Certamen" },
        { id: "other", name: "Otro" },
    ];
    
  return (
    <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Fecha de Actuación"
              name="performance_date"
              type="datetime-local"
              value={form.performance_date}
              onChange={handleChange}
            />

            <SelectField
              label="Tipo de Actuación"
              options={typeOptions}
              value={form.performance_type}
              onChange={(val) => handleSelectChange("performance_type", val)}
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
              label="Duración (minutos)"
              name="duration"
              type="number"
              placeholder="Ej: 240"
              value={form.duration}
              onChange={handleChange}
            />

            <InputField
              label="Músicos Mínimos"
              name="minimum_musicians"
              type="number"
              placeholder="Ej: 50"
              value={form.minimum_musicians}
              onChange={handleChange}
            />

            <SelectField
              label="Banda"
              options={bands || []}
              value={form.band_id}
              onChange={(val) => handleSelectChange("band_id", val)}
            />

            <SelectField
              label="Procesión"
              options={processions || []}
              value={form.procession_id}
              onChange={(val) => handleSelectChange("procession_id", val)}
            />
        </div>

        <div className="mt-4">
            <InputField
              label="Recorrido Aproximado"
              name="approximate_route"
              as="textarea"
              placeholder="Detalla el recorrido..."
              value={form.approximate_route}
              onChange={handleChange}
            />
        </div>

        <div className="mt-4">
            <InputField
              label="Información Adicional"
              name="additional_information"
              as="textarea"
              placeholder="Información extra para el contrato"
              value={form.additional_information}
              onChange={handleChange} 
            />
        </div>

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
