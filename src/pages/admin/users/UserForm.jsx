import { useState } from "react";
import InputField from "@components/forms/InputField";
import SelectField from "@components/forms/SelectField";
// import { useCreateEntity } from "../../../hooks/useCreateEntity";

function UserForm() {
  // const { create, loading, error } = useCreateEntity();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    user_type: "",
    band_id: "",
    brotherhood_id: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setForm({ ...form, user_type: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (loading) return;
    // const result = await create("/users", form); // Adjust endpoint if needed
    // if (result) {
      // alert("Usuario creado correctamente");
       // setForm({ firstname: "", lastname: "", email: "", password: "", user_type: "", band_id: "", brotherhood_id: "" });
    // }
    console.log("Submitting form:", form);
  };

  const userTypeOptions = [
    { id: "band_admin", name: "Administrador de Banda" },
    { id: "brotherhood_admin", name: "Administrador de Hermandad" },
    { id: "guest", name: "Invitado" },
  ];
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 gap-y-4">
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Nombre"
            name="firstname"
            type="text"
            placeholder="John"
            value={form.firstname}
            onChange={handleChange}
          />
          <InputField
            label="Apellido"
            name="lastname"
            type="text"
            placeholder="Doe"
            value={form.lastname}
            onChange={handleChange}
          />
        </div>

        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="john.doe@example.com"
          value={form.email}
          onChange={handleChange}
        />

        <InputField
          label="Contraseña"
          name="password"
          type="password"
          placeholder="********"
          value={form.password}
          onChange={handleChange}
        />

        <SelectField
          label="Tipo de Usuario"
          options={userTypeOptions}
          value={form.user_type}
          onChange={handleSelectChange}
        />

        {(form.user_type === "band_admin" || form.user_type === "guest") && ( // Show band ID if relevant, adjust logic as needed
           <InputField
            label="ID de Banda"
            name="band_id"
            type="number"
            placeholder="1"
            value={form.band_id}
            onChange={handleChange}
            description="Opcional: ID de la banda asociada"
          />
        )}

        {(form.user_type === "brotherhood_admin" || form.user_type === "guest") && (
           <InputField
            label="ID de Hermandad"
            name="brotherhood_id"
            type="number"
            placeholder="1"
            value={form.brotherhood_id}
            onChange={handleChange}
            description="Opcional: ID de la hermandad asociada"
          />
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          // disabled={loading}
        >
           Guardar Usuario
        </button>
      </div>
      
       {/* {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>} */}
    </form>
  );
}

export default UserForm;
