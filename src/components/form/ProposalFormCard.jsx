import { ArrowRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function ProposalFormCard({
    children,
    onPrimary,
    onSecondary,
    title,
    subtitle,
    primaryText = "Siguiente Paso",
    secondaryText = "Atrás",
    loading = false,
    isLastStep = false,
}) {
    return (
        <div className="card bg-base-100 shadow-2xl border border-base-200 overflow-hidden rounded-2xl">
            <div className="card-body p-8 sm:p-12">
                <header className="mb-10">
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-base-content">
                        {title}
                    </h1>
                    <div className="mt-4 text-base sm:text-lg font-medium text-base-content/40 leading-relaxed max-w-3xl">
                        {subtitle}
                    </div>
                </header>

                <div className="min-h-[350px]">
                    {children}
                </div>

                <div className="mt-16 flex items-center justify-between pt-10 border-t border-base-100">
                    <button
                        type="button"
                        className="group flex items-center gap-2 text-sm font-bold text-base-content/30 hover:text-base-content transition-colors px-6 py-3"
                        onClick={onSecondary}
                    >
                        <ChevronLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        {secondaryText}
                    </button>

                    <button
                        type="button"
                        disabled={loading}
                        className={[
                            "relative bg-[#8a01e5] hover:bg-[#7000b8] text-white font-black text-[13px] uppercase tracking-widest py-4 px-10 rounded-xl transition-all shadow-[0_10px_25px_rgba(138,1,229,0.2)] hover:shadow-[0_15px_30px_rgba(138,1,229,0.3)] active:scale-[0.98] disabled:opacity-50 flex items-center gap-3",
                            loading ? "cursor-wait" : "cursor-pointer"
                        ].join(" ")}
                        onClick={onPrimary}
                    >
                        {loading ? (
                            <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                            <>
                                {primaryText}
                                {!isLastStep && <ArrowRightIcon className="w-5 h-5" />}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
