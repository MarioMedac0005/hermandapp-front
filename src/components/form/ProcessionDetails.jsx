import TextField from "../register/TextField";

export default function ProcessionDetails({ formData, updateField, errors }) {
	const handleChange = (e) => {
		const { name, value } = e.target;
		updateField(name, value);
	};

	return (
		<div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
			<div className="group">
				<div className="text-xs font-black text-base-content/40 uppercase tracking-widest mb-4 flex items-center gap-2">
					<div className="w-1.5 h-1.5 rounded-full bg-[#8a01e5]"></div>
					Información del Recorrido
				</div>
				<textarea
					name="approximate_route"
					value={formData.approximate_route}
					onChange={handleChange}
					placeholder="Describe el recorrido aproximado, puntos clave o calles emblemáticas..."
					className={`textarea textarea-bordered w-full bg-base-50 rounded-2xl min-h-[220px] p-8 focus:border-[#8a01e5] focus:ring-4 focus:ring-[#8a01e5]/5 transition-all duration-300 border-2 text-base font-medium placeholder:text-base-content/20 ${errors.approximate_route ? 'border-error/50 bg-error/5 focus:border-error' : 'border-base-200'}`}
				></textarea>
				{errors.approximate_route && <p className="mt-2 text-xs font-bold text-error uppercase tracking-widest ml-2 font-black">{errors.approximate_route}</p>}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
				<TextField
					label="Duración Estimada"
					placeholder="Ej: 240"
					name="duration"
					type="number"
					value={formData.duration}
					onChange={handleChange}
					leftAdornment={<div className="w-1 h-4 bg-[#8a01e5]/20 rounded-full" />}
					rightAdornment={<span className="text-[10px] font-black opacity-30 uppercase tracking-tighter">Minutos</span>}
					error={errors.duration}
				/>

				<TextField
					label="Músicos Mínimos"
					placeholder="Ej: 50"
					name="minimum_musicians"
					type="number"
					value={formData.minimum_musicians}
					onChange={handleChange}
					leftAdornment={<div className="w-1 h-4 bg-[#8a01e5]/20 rounded-full" />}
					error={errors.minimum_musicians}
				/>
			</div>
            
            <div className="bg-[#8a01e5]/5 p-7 rounded-2xl border border-[#8a01e5]/10 flex gap-4">
                <div className="space-y-1">
                    <p className="text-sm font-black text-[#8a01e5] uppercase tracking-wider">Nota</p>
                    <p className="text-xs text-base-content/60 leading-relaxed font-medium">
                        La duración se debe indicar en minutos.
                    </p>
                </div>
            </div>
		</div>
	);
}
