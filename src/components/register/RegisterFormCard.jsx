export default function RegisterFormCard({
  children,
  onPrimary,
  onSecondary,
  primaryText = (
    <>
      Siguiente Paso <span aria-hidden="true">→</span>
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
          <button type="button" className="btn btn-primary" onClick={onPrimary}>
            {primaryText}
          </button>
        </div>
      </div>
    </div>
  );
}
