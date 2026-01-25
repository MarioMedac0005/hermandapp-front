import { Calendar } from "primereact/calendar";

export default function BandaDisponibilidad({ date, setDate }) {
	return (
		<section className="bg-white p-6 rounded-xl shadow-lg">
			<h2 className="text-2xl font-semibold mb-6">
				Disponibilidad
			</h2>

			<div className="flex justify-center">
				<Calendar
					value={date}
					onChange={e => setDate(e.value)}
					inline
					showWeek
					locale="es"
				/>
			</div>
		</section>
	);
}
