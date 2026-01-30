import { Calendar } from "primereact/calendar";

export default function BandaDisponibilidad({ bookedDates }) {
	const dateTemplate = date => {
		if (!bookedDates || bookedDates.length === 0) {
			return date.day;
		}

		const isBooked = bookedDates.some(
			bookedDate =>
				bookedDate.getDate() === date.day &&
				bookedDate.getMonth() === date.month &&
				bookedDate.getFullYear() === date.year
		);

		if (isBooked) {
			return (
				<div
					className="bg-red-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center"
					title="Fecha ocupada"
				>
					{date.day}
				</div>
			);
		}

		return date.day;
	};

	return (
		<section className="bg-white p-6 rounded-xl shadow-lg">
			<h2 className="text-2xl font-semibold mb-6">
				Disponibilidad
			</h2>

			<div className="flex justify-center">
				<Calendar
					value={null}
					inline
					showWeek
					locale="es"
					disabledDates={bookedDates}
					dateTemplate={dateTemplate}
					readOnlyInput
				/>
			</div>
		</section>
	);
}
