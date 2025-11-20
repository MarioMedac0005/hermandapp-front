import React from "react";

function AvailabilityForm() {
  return (
    <fieldset className="fieldset border-base-300 rounded-box w-xs border p-4 mx-auto mt-10 bg-white">
      <legend className="fieldset-legend text-lg">Crear Disponibilidad</legend>

      {/* Fecha */}
      <label className="label">Fecha</label>
      <input type="datetime-local" className="input input-sm" />

      {/* Estado */}
      <label className="label">Estado</label>
      <select className="select select-sm">
        <option disabled selected>
          Selecciona estado
        </option>
        <option value="free">Libre</option>
        <option value="occupied">Ocupado</option>
      </select>

      {/* Descripción */}
      <label className="label">Descripción</label>
      <textarea
        className="textarea textarea-sm"
        placeholder="Descripción (opcional)"
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

      {/* Botón */}
      <button className="btn btn-sm bg-purple-100 text-purple-700 mt-2">
        Guardar
      </button>
    </fieldset>
  );
}

export default AvailabilityForm;
