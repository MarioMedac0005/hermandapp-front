import { useState } from "react";
import InputField from "@components/forms/InputField";
import SelectField from "@components/forms/SelectField";
// import { useCreateEntity } from "../../../hooks/useCreateEntity";

function AvailabilityForm() {
    // const { create, loading, error } = useCreateEntity();
    const [form, setForm] = useState({
        date: "",
        status: "",
        description: "",
        band_id: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (name, value) => {
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const result = await create("/availabilities", form);
        // if (result) {
        //     alert("Disponibilidad creada correctamente");
        //     setForm({ date: "", status: "", description: "", band_id: "" });
        // }
        console.log("Submitting form:", form);
    };

    const statusOptions = [
        { id: "free", name: "Libre" },
        { id: "occupied", name: "Ocupado" },
    ];
    
    // TODO: Fetch real bands
    const bandOptions = [
        { id: "1", name: "Banda 1" },
        { id: "2", name: "Banda 2" },
        { id: "3", name: "Banda 3" },
        { id: "4", name: "Banda 4" },
        { id: "5", name: "Banda 5" },
        { id: "6", name: "Banda 6" },
        { id: "7", name: "Banda 7" },
        { id: "8", name: "Banda 8" },
        { id: "9", name: "Banda 9" },
        { id: "10", name: "Banda 10" },
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

        <SelectField
          label="Banda"
          options={bandOptions}
          value={form.band_id}
          onChange={(val) => handleSelectChange("band_id", val)}
        />

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          // disabled={loading}
        >
          Guardar Disponibilidad
        </button>
      </div>

      {/* {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>} */}
    </form>
  );
}

export default AvailabilityForm;
