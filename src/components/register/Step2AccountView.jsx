import { useState } from "react";

export default function Step2AccountView() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full">
      {/* Encabezado: lo mantienes como el paso 1 (luego cambias textos si quieres) */}
      <h1 className="text-4xl font-bold text-base-content">Comencemos</h1>
      <p className="mt-2 text-base-content/60">
        Introduce los datos básicos para identificar a tu usuario.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Nombre */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">Nombre</span>
          </label>
          <input
            className="input input-bordered w-full rounded-xl"
            placeholder="Juan Pérez"
            type="text"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">Teléfono</span>
          </label>
          <input
            className="input input-bordered w-full rounded-xl"
            placeholder="600 000 000"
            type="tel"
          />
        </div>

        {/* Email */}
        <div className="md:col-span-2">
          <label className="label">
            <span className="label-text font-semibold">Email de el usuario</span>
          </label>
          <input
            className="input input-bordered w-full rounded-xl"
            placeholder="usuario@dominio.com"
            type="email"
          />
        </div>

        {/* Contraseña con mostrar/ocultar */}
        <div className="md:col-span-2">
          <label className="label">
            <span className="label-text font-semibold">Contraseña</span>
          </label>

          <div className="relative">
            <input
              className="input input-bordered w-full rounded-xl pr-14"
              placeholder="********"
              type={showPassword ? "text" : "password"}
            />

            <button
              type="button"
              className="btn btn-ghost btn-sm absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>
      </div>

      {/* Botonera inferior (igual patrón que tu paso 1) */}
      <div className="mt-12 flex items-center justify-between">
        <button type="button" className="btn btn-ghost">
          Cancelar
        </button>

        <button
          type="button"
          className="btn rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 border-none"
        >
          Siguiente Paso →
        </button>
      </div>
    </div>
  );
}
