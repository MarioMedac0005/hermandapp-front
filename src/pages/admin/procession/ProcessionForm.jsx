function ProcessionForm() {
  return (
    <fieldset className="fieldset border-base-300 rounded-box w-xs border p-4 mx-auto mt-10 bg-white">
      <legend className="fieldset-legend text-lg">Crear Procesión</legend>

      {/* Nombre */}
      <label className="label">Nombre</label>
      <input
        type="text"
        placeholder="Nombre de la procesión"
        className="input input-sm"
      />

      {/* Tipo */}
      <label className="label">Tipo</label>
      <select className="select select-sm">
        <option disabled selected>
          Selecciona tipo
        </option>
        <option value="christ">Cristo</option>
        <option value="virgin">Virgen</option>
      </select>

      {/* Itinerario */}
      <label className="label">Itinerario</label>
      <textarea
        className="textarea textarea-sm"
        placeholder="Descripción del itinerario"
      ></textarea>

      {/* Hora de salida */}
      <label className="label">Hora de salida</label>
      <input type="datetime-local" className="input input-sm" />

      {/* Hora de llegada */}
      <label className="label">Hora de llegada</label>
      <input type="datetime-local" className="input input-sm" />

      {/* Hermandad */}
      <label className="label">Hermandad</label>
      <select className="select select-sm">
        <option disabled selected>
          Selecciona una hermandad
        </option>
        <option value="1">Hermandad 1</option>
        <option value="2">Hermandad 2</option>
      </select>

      {/* Botón */}
      <button className="btn btn-sm bg-purple-100 text-purple-700 mt-2">
        Guardar
      </button>
    </fieldset>
  );
}

export default ProcessionForm;
