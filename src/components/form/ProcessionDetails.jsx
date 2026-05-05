import TextField from "../register/TextField";
import CortejoCard from "../hermandad/CortejoCard";

export default function ProcessionDetails({ formData, updateField, errors, processions = [] }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        updateField(name, value);
    };

    const isProcession = formData.performance_type === 'procession';
    const selectedProcession = processions.find(p => p.id == formData.procession_id);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {isProcession && selectedProcession ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div className="group">
                        <div className="text-xs font-black text-base-content/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#8a01e5]"></div>
                            Recorrido Seleccionado
                        </div>
                        <div className="w-full">
                            <CortejoCard 
                                cortejo={selectedProcession} 
                                noHover={true} 
                                openInNewTab={true} 
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="text-xs font-black text-base-content/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#8a01e5]"></div>
                            Detalles Técnicos
                        </div>
                        <TextField
                            label="Duración Estimada (Minutos)"
                            placeholder="240"
                            name="duration"
                            type="number"
                            value={formData.duration || ""}
                            onChange={handleChange}
                            leftAdornment={<div className="w-1 h-4 bg-[#8a01e5]/20 rounded-full" />}
                            error={errors.duration}
                            min="1"
                        />

                        <TextField
                            label="Músicos Mínimos"
                            placeholder="50"
                            name="minimum_musicians"
                            type="number"
                            value={formData.minimum_musicians || ""}
                            onChange={handleChange}
                            leftAdornment={<div className="w-1 h-4 bg-[#8a01e5]/20 rounded-full" />}
                            error={errors.minimum_musicians}
                            min="1"
                        />
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="group">
                        <div className="text-xs font-black text-base-content/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#8a01e5]"></div>
                            Información del Recorrido
                        </div>
                        <textarea
                            name="approximate_route"
                            value={formData.approximate_route || ""}
                            onChange={handleChange}
                            placeholder="Describe el recorrido aproximado, puntos clave o calles emblemáticas..."
                            className={`textarea textarea-bordered w-full bg-base-50 rounded-2xl p-6 focus:border-[#8a01e5] focus:ring-4 focus:ring-[#8a01e5]/5 transition-all duration-300 border-2 text-base font-medium placeholder:text-base-content/20 ${errors.approximate_route ? 'border-error/50 bg-error/5 focus:border-error' : 'border-base-200'}`}
                            rows={4}
                        ></textarea>
                        {errors.approximate_route && <p className="mt-2 text-xs font-bold text-error uppercase tracking-widest ml-2 font-black">{errors.approximate_route}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                        <TextField
                            label="Duración Estimada (Minutos)"
                            placeholder="240"
                            name="duration"
                            type="number"
                            value={formData.duration || ""}
                            onChange={handleChange}
                            leftAdornment={<div className="w-1 h-4 bg-[#8a01e5]/20 rounded-full" />}
                            error={errors.duration}
                            min="1"
                        />

                        <TextField
                            label="Músicos Mínimos"
                            placeholder="50"
                            name="minimum_musicians"
                            type="number"
                            value={formData.minimum_musicians || ""}
                            onChange={handleChange}
                            leftAdornment={<div className="w-1 h-4 bg-[#8a01e5]/20 rounded-full" />}
                            error={errors.minimum_musicians}
                            min="1"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
