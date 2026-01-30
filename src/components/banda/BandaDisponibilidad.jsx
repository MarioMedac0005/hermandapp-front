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
		<section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
			<h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
				<span className="w-1.5 h-8 bg-purple-600 rounded-full"></span>
				Disponibilidad
			</h2>

			<div className="flex justify-center bg-gray-50/50 p-6 rounded-2xl border border-gray-100/50">
				<div className="w-full">
					<style>{`
						.p-calendar .p-datepicker {
							border: none;
							border-radius: 1rem;
							padding: 1.5rem;
							background: white;
                            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
                            width: 100% !important;
                            min-width: unset !important;
						}
                        .p-calendar {
                            width: 100%;
                        }
						.p-datepicker table td.p-datepicker-today > span {
                            background: #f3e8ff;
                            border-radius: 50%;
                            color: #9333ea;
                            font-weight: bold;
                        }
						.p-datepicker table td > span.p-highlight {
							background: #9333ea !important;
							color: white !important;
                            border-radius: 50%;
						}
                        .p-datepicker table {
                            width: 100% !important;
                            margin: 0 !important;
                            font-size: 1rem; /* Better readability */
                        }
                        .p-datepicker table th {
                            padding: 1rem 0;
                            color: #6b7280;
                        }
                        .p-datepicker table td {
                            padding: 0.5rem;
                        }
                        /* Responsive font adjustments */
                        @media (max-width: 640px) {
                            .p-datepicker table {
                                font-size: 0.875rem;
                            }
                            .p-datepicker {
                                padding: 0.5rem !important;
                            }
                        }
                        /* Hide Weekday Headers */
                        .p-datepicker table thead {
                            display: none;
                        }
					`}</style>
					<Calendar
						value={null}
						inline
						showWeek
						locale="es"
						disabledDates={bookedDates}
						dateTemplate={dateTemplate}
						readOnlyInput
						className="w-full shadow-none"
					/>
				</div>
			</div>
		</section>
	);
}
