import { useState } from "react";
import { Calendar } from "primereact/calendar";
import { addLocale } from 'primereact/api';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/bootstrap4-light-purple/theme.css';

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

export default function ServiceDetails() {
	const [date, setDate] = useState(null);

	return (
		<div className="card bg-base-100 shadow p-6 rounded-xl">
			<h2 className="text-lg font-bold mb-4">1. Detalles del Servicio</h2>

			<div className="grid grid-cols-2 gap-4">
				<fieldset className="fieldset">
					<legend className="fieldset-legend">Seleccionar tipo de servicio</legend>
					<select defaultValue="" className="select select-bordered w-full">
						<option disabled>Seleccionar tipo de servicio</option>
						<option value="semana-santa">Semana Santa</option>
						<option value="otro">Otro</option>
					</select>
				</fieldset>

				<fieldset className="fieldset">
					<legend className="fieldset-legend">Selecciona un momento del día</legend>
					<select defaultValue="" className="select select-bordered w-full">
						<option disabled>Selecciona un momento del día</option>
						<option value="mañana">Mañana</option>
						<option value="tarde">Tarde</option>
						<option value="noche">Noche</option>
					</select>
				</fieldset>
			</div>

			<fieldset className="fieldset mt-6 rounded-xl transition p-2 mx-auto">
				<legend className="fieldset-legend mx-auto">Selecciona la fecha deseada</legend>
				<div>
					<Calendar
						className="text-sm"
						onChange={(e) => setDate(e.value)}
						value={date}
						inline
						locale="es"
					/>
				</div>
			</fieldset>
		</div>
	);
}
