import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';
import InputField from "@components/forms/InputField";
import SelectField from "@components/forms/SelectField";
import { useCreateEntity } from "../../../hooks/useCreateEntity";
import { useFetchData } from "../../../hooks/useFetchData";
import { API_ENDPOINTS } from "../../../config/api";

function GestorForm({ onSuccess }) {
  const { create, loading, error } = useCreateEntity();
  
  // Fetch bands and brotherhoods for the dropdowns
  const { data: bands } = useFetchData(API_ENDPOINTS.bands);
  const { data: brotherhoods } = useFetchData(API_ENDPOINTS.brotherhoods);

  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "band", // Default to band
    band_id: "",
    brotherhood_id: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (value) => {
    setForm({ 
        ...form, 
        type: value,
        band_id: "", // Reset selections when type changes
        brotherhood_id: "" 
    });
  };

  const handleSelectChange = (e) => {
     setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Construct payload based on selected type
    const payload = {
        name: form.name,
        email: form.email,
        band_id: form.type === 'band' ? form.band_id : null,
        brotherhood_id: form.type === 'brotherhood' ? form.brotherhood_id : null,
    };

    const result = await create(API_ENDPOINTS.gestores, payload);

    if (result) {
        if (!result.mail_sent) {
            toast('Gestor creado, pero el correo no pudo enviarse', {
                icon: '⚠️',
            });
        }

        if (onSuccess) {
            onSuccess();
        }
    }
  };

  const typeOptions = [
    { id: "band", name: "Gestor de Banda" },
    { id: "brotherhood", name: "Gestor de Hermandad" },
  ];

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 gap-y-4">
        <InputField
            label="Nombre"
            name="name"
            type="text"
            placeholder="Nombre del gestor"
            value={form.name}
            onChange={handleChange}
            required
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="gestor@example.com"
          value={form.email}
          onChange={handleChange}
          required
        />

        <SelectField
          label="Tipo de Gestor"
          options={typeOptions}
          value={form.type}
          onChange={handleTypeChange}
        />

        {form.type === "band" && (
           <div className="form-control w-full">
            <label className="label">
                <span className="label-text">Seleccionar Banda</span>
            </label>
            <select 
                className="select select-bordered w-full"
                name="band_id"
                value={form.band_id}
                onChange={handleSelectChange}
                required
            >
                <option value="">Selecciona una banda</option>
                {bands && bands.map(band => (
                    <option key={band.id} value={band.id}>{band.name}</option>
                ))}
            </select>
           </div>
        )}

        {form.type === "brotherhood" && (
           <div className="form-control w-full">
            <label className="label">
                <span className="label-text">Seleccionar Hermandad</span>
            </label>
            <select 
                className="select select-bordered w-full"
                name="brotherhood_id"
                value={form.brotherhood_id}
                onChange={handleSelectChange}
                required
            >
                <option value="">Selecciona una hermandad</option>
                {brotherhoods && brotherhoods.map(brotherhood => (
                    <option key={brotherhood.id} value={brotherhood.id}>{brotherhood.name}</option>
                ))}
            </select>
           </div>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
           {loading ? 'Creando...' : 'Crear Gestor'}
        </button>
      </div>
      
       {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
    </form>
  );
}

export default GestorForm;
