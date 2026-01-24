export default function ProgressCard({ step = 1 }) {
  const items = [
    { n: 1, title: "Paso 1", subtitle: "Identidad" },
    { n: 2, title: "Paso 2", subtitle: "Datos de la Cuenta" },
    { n: 3, title: "Paso 3", subtitle: "Confirmación" },
  ];

  const isDone = (n) => step > n;
  const isActive = (n) => step === n;

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h3 className="text-base font-extrabold text-base-content">
          Tu progreso
        </h3>

        <div className="mt-4 space-y-5">
          {items.map((it) => (
            <div key={it.n} className="flex items-start gap-4">
              {/* Círculo */}
              <div
                className={[
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold",
                  isActive(it.n) || isDone(it.n)
                    ? "bg-indigo-600 text-white"
                    : "bg-base-200 text-base-content/50",
                ].join(" ")}
              >
                {isActive(it.n) ? "✓" : it.n}
              </div>

              {/* Texto */}
              <div className="leading-tight">
                <div
                  className={[
                    "text-sm font-extrabold",
                    isActive(it.n) || isDone(it.n)
                      ? "text-indigo-700"
                      : "text-base-content/40",
                  ].join(" ")}
                >
                  {it.title}
                </div>

                <div
                  className={[
                    "text-sm font-semibold",
                    isActive(it.n) || isDone(it.n)
                      ? "text-base-content"
                      : "text-base-content/40",
                  ].join(" ")}
                >
                  {it.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
