import TextField from "./TextField";

export default function Step2Account({ values, onChange, errors = {} }) {
  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TextField
          label="Nombre"
          placeholder="Juan Perez"
          name="firstName"
          value={values?.firstName}
          onChange={onChange}
          error={errors.firstName}
        />

        <TextField
          label="Apellidos"
          placeholder="Martinez de la torre"
          name="lastName"
          value={values?.lastName}
          onChange={onChange}
          error={errors.lastName}
        />
      </div>

      <div className="mt-6">
        <TextField
          label="Email de del usuario"
          placeholder="usuario@dominio.com"
          name="userEmail"
          value={values?.userEmail}
          onChange={onChange}
          error={errors.userEmail}
          type="email"
        />
      </div>

      <p className="mt-6 text-xs text-base-content/40">
        Tras completar el registro, te enviaremos un correo para que puedas establecer tu contraseña.
      </p>
    </>
  );
}
