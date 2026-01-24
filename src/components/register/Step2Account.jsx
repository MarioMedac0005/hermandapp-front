import TextField from "./TextField";

export default function Step2Account({ values, onChange }) {
  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TextField
          label="Nombre"
          placeholder="Ej. Juan"
          name="firstName"
          value={values?.firstName}
          onChange={onChange}
        />
        <TextField
          label="Apellidos"
          placeholder="Ej. García López"
          name="lastName"
          value={values?.lastName}
          onChange={onChange}
        />
      </div>

      <div className="mt-6">
        <TextField
          label="Email"
          placeholder="Ej. usuario@dominio.com"
          name="userEmail"
          value={values?.userEmail}
          onChange={onChange}
          type="email"
        />
      </div>

      <p className="mt-6 text-xs text-base-content/40">
        Tras completar el registro, te enviaremos un correo para que puedas establecer tu contraseña.
      </p>
    </>
  );
}
