import TextField from "../register/TextField";

export default function OfferMessage({ formData, updateField, errors }) {
	const handleChange = (e) => {
		const { name, value } = e.target;
		updateField(name, value);
	};

	return (
		<div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
			<div className="max-w-md">
				<TextField
					label="Propuesta Económica"
					placeholder="Escribe el importe..."
					name="amount"
					type="number"
					value={formData.amount}
					onChange={handleChange}
					leftAdornment={<span className="text-xl font-black text-[#8a01e5]">€</span>}
					error={errors.amount}
				/>
				<p className="mt-2 text-[10px] font-bold text-base-content/30 uppercase tracking-widest px-1 font-sans">
					Importe neto sugerido para el servicio
				</p>
			</div>

			<div className="group">
				<div className="text-xs font-black text-base-content/40 uppercase tracking-widest mb-4 flex items-center gap-2">
					<div className="w-1.5 h-1.5 rounded-full bg-[#8a01e5]"></div>
					Información Adicional
				</div>
				<textarea
					name="additional_information"
					value={formData.additional_information}
					onChange={handleChange}
					placeholder="Añade cualquier detalle adicional, requisitos técnicos o peticiones musicales..."
					className="textarea textarea-bordered w-full bg-base-50 rounded-2xl min-h-[180px] p-8 focus:border-[#8a01e5] focus:ring-4 focus:ring-[#8a01e5]/5 transition-all duration-300 border-2 border-base-200 text-base font-medium placeholder:text-base-content/20"
				></textarea>
			</div>
		</div>
	);
}
