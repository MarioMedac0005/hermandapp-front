function BandForm() {
  return (
    <fieldset className="fieldset border-base-300 rounded-box w-xs border p-4 mx-auto mt-10 bg-white">
      <legend className="fieldset-legend text-lg">Crear Banda</legend>

      {/* Nombre */}
      <label className="label">Nombre</label>
      <input
        type="text"
        placeholder="Nombre de la banda"
        className="input input-sm"
      />

      {/* Ciudad */}
      <label className="label">Ciudad</label>
      <input type="text" placeholder="Ciudad" className="input input-sm" />

      {/* Espacio de ensayo */}
      <label className="label">Lugar de Ensayo</label>
      <input
        type="text"
        placeholder="Local de ensayo"
        className="input input-sm"
      />

      {/* Email */}
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

export default BandForm;
