import { useState } from "react";
import InputField from "@components/forms/InputField";
// import { useCreateEntity } from "../../../hooks/useCreateEntity";

function BandForm() {
  // const { create, loading, error } = useCreateEntity();
  const [form, setForm] = useState({
    name: "",
    country: "",
    rehearsal_space: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const result = await create("/bands", form);
    // if (result) {
    //   alert("Banda creada correctamente");
    //   setForm({ name: "", country: "", rehearsal_space: "", email: "" });
    // }
    console.log("Submitting form:", form);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <InputField
        label="Nombre"
        name="name"
        type="text"
        placeholder="Nombre de la banda"
        value={form.name}
        onChange={handleChange}
      />

      <InputField
        label="País"
        name="country"
        type="text"
        placeholder="País"
        value={form.country}
        onChange={handleChange}
      />

      <InputField
        label="Lugar de Ensayo"
        name="rehearsal_space"
        type="text"
        placeholder="Local de ensayo"
        value={form.rehearsal_space}
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

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          // disabled={loading}
        >
          Guardar Banda
        </button>
      </div>

      {/* {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>} */}
    </form>
  );
}

export default BandForm;