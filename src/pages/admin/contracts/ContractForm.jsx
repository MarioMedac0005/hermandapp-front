function ContractForm() {
  return (
    <fieldset className="fieldset border-base-300 rounded-box w-xs border p-4 mx-auto mt-10 bg-white">
      <legend className="fieldset-legend text-lg">Crear Contrato</legend>

      {/* Fecha */}
      <label className="label">Fecha</label>
      <input type="datetime-local" className="input input-sm" />

      {/* Estado */}
      <label className="label">Estado</label>
      <select className="select select-sm">
        <option disabled selected>
          Selecciona estado
        </option>
        <option value="expired">Expirado</option>
        <option value="pending">Pendiente</option>
        <option value="active">Activo</option>
      </select>

      {/* Importe */}
      <label className="label">Importe</label>
      <input
        type="number"
        step="0.01"
        placeholder="Cantidad"
        className="input input-sm"
      />

      {/* Descripción */}
      <label className="label">Descripción</label>
      <textarea
        className="textarea textarea-sm"
        placeholder="Descripción del contrato"
      ></textarea>

      {/* Banda */}
      <label className="label">Banda</label>
      <select className="select select-sm">
        <option disabled selected>
          Selecciona una banda
        </option>
        <option value="1">Banda 1</option>
        <option value="2">Banda 2</option>
      </select>

      {/* Procesión */}
      <label className="label">Procesión</label>
      <select className="select select-sm">
        <option disabled selected>
          Selecciona una procesión
        </option>
        <option value="1">Procesión 1</option>
        <option value="2">Procesión 2</option>
      </select>

      {/* Botón */}
      <button className="btn btn-sm bg-purple-100 text-purple-700 mt-2">
        Guardar
      </button>
    </fieldset>
  );
}

export default ContractForm;
