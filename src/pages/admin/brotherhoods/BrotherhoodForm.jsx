import { useState } from "react";
import InputField from "@components/forms/InputField";
// import { useCreateEntity } from "../../../hooks/useCreateEntity";

function BrotherhoodForm() {
    // const { create, loading, error } = useCreateEntity();
    const [form, setForm] = useState({
        name: "",
        city: "",
        office_address: "",
        phone: "",
        email: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const result = await create("/brotherhoods", form); // Adjust endpoint
        // if (result) {
        //     alert("Hermandad creada correctamente");
        //     setForm({ name: "", city: "", office_address: "", phone: "", email: "" });
        // }
        console.log("Submitting form:", form);
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

        <InputField
          label="Ciudad"
          name="city"
          type="text"
          placeholder="Ciudad"
          value={form.city}
          onChange={handleChange}
        />

        <InputField
          label="Oficina"
          name="office_address"
          type="text"
          placeholder="Dirección de la oficina"
          value={form.office_address}
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
          // disabled={loading}
        >
          Guardar Hermandad
        </button>
      </div>

      {/* {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>} */}
    </form>
  );
}

export default BrotherhoodForm;
