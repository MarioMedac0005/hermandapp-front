function BrotherhoodForm() {
  return (
    <fieldset className="fieldset border-base-300 rounded-box w-xs border p-4 mx-auto mt-10 bg-white">
      <legend className="fieldset-legend text-lg">Crear Hermandad</legend>

      {/* Nombre */}
      <label className="label">Nombre</label>
      <input
        type="text"
        placeholder="Nombre de la hermandad"
        className="input input-sm"
      />

      {/* Ciudad */}
      <label className="label">Ciudad</label>
      <input type="text" placeholder="Ciudad" className="input input-sm" />

      {/* Oficina */}
      <label className="label">Oficina</label>
      <input
        type="text"
        placeholder="Dirección de la oficina"
        className="input input-sm"
      />

      {/* Teléfono (opcional) */}
      <label className="label">Teléfono</label>
      <input
        type="text"
        placeholder="Número de teléfono"
        className="input input-sm"
      />

      {/* Email (opcional) */}
      <label className="label">Email</label>
      <input
        type="email"
        placeholder="Email de contacto"
        className="input input-sm"
      />

      {/* Botón */}
      <button className="btn btn-sm bg-purple-100 text-purple-700 mt-2">
        Guardar
      </button>
    </fieldset>
  );
}

export default BrotherhoodForm;
