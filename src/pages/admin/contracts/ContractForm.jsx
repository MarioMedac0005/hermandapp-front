import { useState } from "react";
import InputField from "@components/forms/InputField";
import SelectField from "@components/forms/SelectField";
// import { useCreateEntity } from "../../../hooks/useCreateEntity";

function ContractForm() {
    // const { create, loading, error } = useCreateEntity();
    const [form, setForm] = useState({
        date: "",
        status: "",
        amount: "",
        description: "",
        band_id: "",
        procession_id: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (name, value) => {
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const result = await create("/contracts", form);
        // if (result) {
        //     alert("Contrato creado correctamente");
        //     setForm({ date: "", status: "", amount: "", description: "", band_id: "", procession_id: "" });
        // }
        console.log("Submitting form:", form);
    };

    const statusOptions = [
        { id: "expired", name: "Expirado" },
        { id: "pending", name: "Pendiente" },
        { id: "active", name: "Activo" },
    ];
    
    // TODO: Fetch real bands and processions
    const bandOptions = [
        { id: "1", name: "Banda 1" },
        { id: "2", name: "Banda 2" },
    ];

    const processionOptions = [
        { id: "1", name: "Procesión 1" },
        { id: "2", name: "Procesión 2" },
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
          type="text"
          placeholder="Descripción del contrato"
          value={form.description}
          onChange={handleChange} 
        />

        <SelectField
          label="Banda"
          options={bandOptions}
          value={form.band_id}
          onChange={(val) => handleSelectChange("band_id", val)}
        />

        <SelectField
          label="Procesión"
          options={processionOptions}
          value={form.procession_id}
          onChange={(val) => handleSelectChange("procession_id", val)}
        />

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          // disabled={loading}
        >
          Guardar Contrato
        </button>
      </div>

      {/* {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>} */}
    </form>
  );
}

export default ContractForm;
