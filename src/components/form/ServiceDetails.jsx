import { Calendar } from "primereact/calendar";
import { addLocale } from 'primereact/api';
import SelectField from "../register/SelectField";

// CSS for PrimeReact Calendar
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/bootstrap4-light-purple/theme.css';

// Configure Spanish locale
addLocale('es', {
	firstDayOfWeek: 1,
	showMonthAfterYear: true,
	dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
	dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
	dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
	monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
	monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
	today: 'Hoy',
	clear: 'Limpiar'
});

export default function ServiceDetails({ formData, updateField, errors }) {
	const serviceOptions = [
		{ value: "semana-santa", label: "Semana Santa" },
		{ value: "gloria", label: "Gloria / Ordinaria" },
		{ value: "otro", label: "Otro evento" },
	];

	const momentOptions = [
		{ value: "mañana", label: "Mañana" },
		{ value: "tarde", label: "Tarde" },
		{ value: "noche", label: "Noche" },
	];

	const handleSelectChange = (e) => {
		const { name, value } = e.target;
		updateField(name, value);
	};

	const handleDateChange = (e) => {
		updateField("date", e.value);
	};

	return (
		<div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<SelectField
					label="Tipo de Servicio"
					placeholder="Selecciona el tipo"
					options={serviceOptions}
					name="serviceType"
					value={formData.serviceType}
					onChange={handleSelectChange}
					error={errors.serviceType}
				/>

				<SelectField
					label="Momento del Día"
					placeholder="Selecciona el horario"
					options={momentOptions}
					name="moment"
					value={formData.moment}
					onChange={handleSelectChange}
					error={errors.moment}
				/>
			</div>

			<div className="flex flex-col gap-6">
				<div className="text-xs font-black text-base-content/40 uppercase tracking-widest flex items-center gap-2">
					<div className="w-1.5 h-1.5 rounded-full bg-[#8a01e5]"></div>
					Selecciona la Fecha del Evento
				</div>

				<div className={`p-4 sm:p-8 border-2 border-dashed rounded-[2rem] bg-base-50/30 flex flex-col items-center hover:border-[#8a01e5]/30 transition-all duration-500 overflow-hidden ${errors.date ? 'border-error/50 bg-error/5 shadow-[0_0_40px_rgba(255,0,0,0.05)]' : 'border-base-200'}`}>
					<div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-base-100">
						<Calendar
							value={formData.date}
							onChange={handleDateChange}
							inline
							showWeek
							locale="es"
							className="service-proposal-calendar w-full"
						/>
					</div>

					{errors.date && (
						<div className="mt-8 animate-in fade-in zoom-in duration-300">
							<p className="text-xs font-black text-error uppercase tracking-[0.2em] bg-error/10 px-6 py-3 rounded-xl border border-error/20">
								{errors.date}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
