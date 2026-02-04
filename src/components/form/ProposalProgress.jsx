import { CheckIcon } from "@heroicons/react/24/outline";

export default function ProposalProgress({ step = 1 }) {
    const steps = [
        { n: 1, title: "Detalles", subtitle: "Tipo y fecha" },
        { n: 2, title: "Recorrido", subtitle: "Detalles procesión" },
        { n: 3, title: "Oferta", subtitle: "Importe y mensaje" },
    ];

    const isDone = (n) => step > n;
    const isActive = (n) => step === n;

    return (
        <div className="card bg-base-100 shadow-xl border border-base-200 rounded-2xl overflow-hidden">
            <div className="card-body p-6">
                <h3 className="text-xs font-black text-base-content/40 uppercase tracking-widest mb-6 border-b border-base-100 pb-2">
                    Tu progreso
                </h3>

                <div className="space-y-6">
                    {steps.map((s) => (
                        <div key={s.n} className="flex items-start gap-4">
                            <div
                                className={[
                                    "w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all duration-300 shrink-0",
                                    isActive(s.n) || isDone(s.n)
                                        ? "bg-[#8a01e5] text-white shadow-[0_4px_12px_rgba(138,1,229,0.3)]"
                                        : "bg-base-200 text-base-content/30 border-2 border-dashed border-base-300",
                                ].join(" ")}
                            >
                                {isDone(s.n) ? <CheckIcon className="w-5 h-5 stroke-[3]" /> : s.n}
                            </div>

                            <div className="min-w-0">
                                <p
                                    className={[
                                        "text-[10px] font-black uppercase tracking-wider transition-colors duration-300",
                                        isActive(s.n) || isDone(s.n)
                                            ? "text-[#8a01e5]"
                                            : "text-base-content/30",
                                    ].join(" ")}
                                >
                                    {s.title}
                                </p>
                                <p
                                    className={[
                                        "text-sm font-semibold truncate transition-colors duration-300 leading-tight",
                                        isActive(s.n) || isDone(s.n)
                                            ? "text-base-content"
                                            : "text-base-content/30",
                                    ].join(" ")}
                                >
                                    {s.subtitle}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
