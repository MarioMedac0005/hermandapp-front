export default function ProposalSummaryCard({ formData }) {
    const formatDate = (date) => {
        if (!date) return "Sin seleccionar";
        if (date instanceof Date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }
        return String(date);
    };

    const getServiceLabel = (type) => {
        if (!type) return "Sin seleccionar";
        const labels = {
            'semana-santa': 'Semana Santa',
            'gloria': 'Gloria / Ordinaria',
            'otro': 'Otro evento'
        };
        return labels[type] || 'Tipo de servicio';
    };

    return (
        <div className="card bg-base-100 shadow-xl border border-base-200 rounded-2xl animate-in fade-in duration-700">
            <div className="card-body p-6">
                <h3 className="text-xs font-black text-[#8a01e5] uppercase tracking-widest mb-6 border-b border-[#8a01e5]/10 pb-2">
                    Resumen
                </h3>

                <div className="space-y-5">
                    <div>
                        <p className="text-[10px] font-black text-base-content/40 uppercase tracking-widest mb-1">Servicio</p>
                        <p className={`text-sm font-bold capitalize ${formData.serviceType ? 'text-base-content' : 'text-base-content/20 italic font-medium'}`}>
                            {getServiceLabel(formData.serviceType)}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-[10px] font-black text-base-content/40 uppercase tracking-widest mb-1">Horario</p>
                            <p className={`text-sm font-bold capitalize ${formData.moment ? 'text-base-content' : 'text-base-content/20 italic font-medium'}`}>
                                {formData.moment || "Sin seleccionar"}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-base-content/40 uppercase tracking-widest mb-1">Fecha</p>
                            <p className={`text-sm font-bold ${formData.date ? 'text-base-content' : 'text-base-content/20 italic font-medium'}`}>
                                {formatDate(formData.date)}
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-[10px] font-black text-base-content/40 uppercase tracking-widest mb-1">Duración</p>
                        <p className={`text-sm font-bold ${formData.duration ? 'text-base-content' : 'text-base-content/20 italic font-medium'}`}>
                            {formData.duration ? `${formData.duration} h` : "Sin seleccionar"}
                        </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-base-100">
                        <p className="text-[10px] font-black text-[#8a01e5] uppercase tracking-widest mb-1">Presupuesto</p>
                        <div className="flex items-baseline gap-1">
                            <span className={`text-3xl font-black ${formData.offer ? 'text-base-content' : 'text-base-content/10'}`}>
                                {formData.offer ? Number(formData.offer).toLocaleString('es-ES') : "0"}
                            </span>
                            <span className="text-sm font-bold text-base-content/40">€</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
