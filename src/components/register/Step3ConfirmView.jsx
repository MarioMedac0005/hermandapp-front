export default function Step3ConfirmView() {
  return (
    <div className="w-full">
      {/* Encabezado: igual que paso 1 */}
      <h1 className="text-4xl font-bold text-base-content">Comencemos</h1>
      <p className="mt-2 text-base-content/60">
        Introduce los datos básicos para identificar tu organización en la plataforma.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6">
        {/* Resumen organización */}
        <div className="rounded-2xl border border-base-200 bg-base-100 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-base-content">
              Resumen de la organización
            </h3>

            <button type="button" className="btn btn-ghost btn-sm">
              Editar
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-base-content/50">Tipo</p>
              <p className="font-semibold text-base-content">—</p>
            </div>
            <div>
              <p className="text-sm text-base-content/50">Año de Fundación</p>
              <p className="font-semibold text-base-content">—</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-base-content/50">Nombre</p>
              <p className="font-semibold text-base-content">—</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-base-content/50">Ciudad de Origen</p>
              <p className="font-semibold text-base-content">—</p>
            </div>
          </div>
        </div>

        {/* Resumen cuenta */}
        <div className="rounded-2xl border border-base-200 bg-base-100 p-6">
          <h3 className="text-lg font-semibold text-base-content">
            Resumen de la cuenta
          </h3>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-base-content/50">Nombre</p>
              <p className="font-semibold text-base-content">—</p>
            </div>
            <div>
              <p className="text-sm text-base-content/50">Teléfono</p>
              <p className="font-semibold text-base-content">—</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-base-content/50">Email</p>
              <p className="font-semibold text-base-content">—</p>
            </div>
          </div>
        </div>
      </div>

      {/* Botonera inferior */}
      <div className="mt-12 flex items-center justify-between">
        <button type="button" className="btn btn-ghost">
          Atrás
        </button>

        <button
          type="button"
          className="btn rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 border-none"
        >
          Finalizar registro
        </button>
      </div>
    </div>
  );
}
