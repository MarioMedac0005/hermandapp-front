function UserForm() {
  return (
    <fieldset className="fieldset border-base-300 rounded-box w-xs border p-4 mx-auto mt-10 bg-white">
      <legend className="fieldset-legend text-lg">
        Crear Usuario
      </legend>

      {/* Nombre */}
      <label className="label">Nombre</label>
      <input
        type="text"
        placeholder="Nombre del usuario"
        className="input input-sm"
      />

      {/* Apellido */}
      <label className="label">Apellido</label>
      <input
        type="text"
        placeholder="Apellido del usuario"
        className="input input-sm"
      />

      {/* Email */}
      <label className="label">Email</label>
      <input
        type="email"
        placeholder="Email"
        className="input input-sm"
      />

      {/* Password */}
      <label className="label">Contraseña</label>
      <input
        type="password"
        placeholder="Contraseña"
        className="input input-sm"
      />

      {/* Tipo */}
      <label className="label">Tipo</label>
      <select className="select select-sm">
        <option disabled selected>Selecciona un tipo</option>
        <option value="band_admin">Administrador de Banda</option>
        <option value="brotherhood_admin">Administrador de Hermandad</option>
        <option value="guest">Invitado</option>
      </select>

      {/* Band ID */}
      <label className="label">Banda</label>
      <input
        type="number"
        placeholder="ID de Banda"
        className="input input-sm"
      />

      {/* Brotherhood ID */}
      <label className="label">Hermandad</label>
      <input
        type="number"
        placeholder="ID de Hermandad"
        className="input input-sm"
      />

      {/* Botón */}
      <button className="btn btn-sm bg-purple-100 text-purple-700">
        Guardar
      </button>
    </fieldset>
  );
}

export default UserForm;
