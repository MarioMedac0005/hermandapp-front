import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function RegisterFormCard({
  children,
  onPrimary,
  onSecondary,
  primaryText = (
    <>
      Siguiente Paso <ArrowRightIcon className="w-4 h-4 ml-1" aria-hidden="true" />
    </>
  ),
  secondaryText = "Cancelar",
}) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body p-7">
        <h1 className="text-4xl font-extrabold tracking-tight text-base-content">
          Comencemos
        </h1>
        <p className="mt-2 text-sm text-base-content/60">
          Introduce los datos básicos para identificar tu organización en la plataforma.
        </p>

        {children}

        <div className="mt-6 flex items-center justify-between gap-3">
          <button type="button" className="btn btn-ghost" onClick={onSecondary}>
            {secondaryText}
          </button>
          <button type="button" className="bg-[#8a01e5] hover:bg-[#7000b8] text-white font-bold py-2.5 px-6 rounded-lg transition-all shadow-md active:scale-95" onClick={onPrimary}>
            {primaryText}
          </button>
        </div>
      </div>
    </div>
  );
}
