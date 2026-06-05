import SelectField from "../register/SelectField";
import { useState, useMemo } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

function SelectableCalendar({ bookedDates = [], selectedDate, onDateSelect }) {
	const [currentDate, setCurrentDate] = useState(selectedDate || new Date());

	const { days, monthLabel, weekDays } = useMemo(() => {
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();
		
		const firstDayOfMonth = new Date(year, month, 1).getDay();
		const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
		
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		
		const daysArray = [];

		for (let i = 0; i < startOffset; i++) {
			daysArray.push(null);
		}

		for (let i = 1; i <= daysInMonth; i++) {
			daysArray.push(new Date(year, month, i));
		}

		const dateFormatter = new Intl.DateTimeFormat("es-ES", { month: "long", year: "numeric" });
		const label = dateFormatter.format(currentDate);
		const capitalizedLabel = label.charAt(0).toUpperCase() + label.slice(1);

		return {
			days: daysArray,
			monthLabel: capitalizedLabel,
			weekDays: ["L", "M", "X", "J", "V", "S", "D"]
		};
	}, [currentDate]);

	const nextMonth = () => {
		setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
	};

	const prevMonth = () => {
		setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
	};

	const isDateBooked = (date) => {
		if (!date) return false;
		return bookedDates?.some(
			booked => 
				booked.getDate() === date.getDate() &&
				booked.getMonth() === date.getMonth() &&
				booked.getFullYear() === date.getFullYear()
		);
	};

	const isDatePast = (date) => {
		if (!date) return false;
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		return date < today;
	};

	const isSelected = (date) => {
		if (!date || !selectedDate) return false;
		return (
			date.getDate() === selectedDate.getDate() &&
			date.getMonth() === selectedDate.getMonth() &&
			date.getFullYear() === selectedDate.getFullYear()
		);
	};

	const handleDateClick = (date) => {
		if (!date || isDateBooked(date) || isDatePast(date)) return;
		onDateSelect(date);
	};

	return (
		<div className="w-full">
			{/* Header */}
			<div className="flex items-center justify-between mb-6">
				<button 
					type="button"
					onClick={prevMonth}
					className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors cursor-pointer"
				>
					<ChevronLeftIcon className="size-5" />
				</button>
				<h3 className="text-lg font-semibold text-gray-900">
					{monthLabel}
				</h3>
				<button 
					type="button"
					onClick={nextMonth}
					className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors cursor-pointer"
				>
					<ChevronRightIcon className="size-5" />
				</button>
			</div>

			{/* Grid */}
			<div className="grid grid-cols-7 gap-1 md:gap-2 mb-4">
				{/* Weekdays */}
				{weekDays.map(day => (
					<div key={day} className="text-center text-xs font-semibold text-gray-400 py-2">
						{day}
					</div>
				))}

				{/* Days */}
				{days.map((date, index) => {
					if (!date) {
						return <div key={`empty-${index}`} className="aspect-square" />;
					}

					const booked = isDateBooked(date);
					const past = isDatePast(date);
					const selected = isSelected(date);
					
					return (
						<button 
							type="button"
							key={date.toISOString()} 
							onClick={() => handleDateClick(date)}
							disabled={booked || past}
							className={`
								aspect-square flex items-center justify-center rounded-xl text-sm transition-all relative
								${booked 
									? "bg-red-50 text-red-600 font-bold cursor-not-allowed opacity-50" 
									: past
										? "text-gray-300 font-medium cursor-not-allowed"
										: selected
											? "bg-purple-600 text-white font-medium shadow-md shadow-purple-200 cursor-pointer"
											: "hover:bg-gray-50 font-medium text-gray-700 hover:text-purple-600 cursor-pointer"
								}
							`}
						>
							{date.getDate()}
							{booked && (
								<span className="absolute bottom-1.5 w-1 h-1 bg-red-400 rounded-full" />
							)}
						</button>
					);
				})}
			</div>

			{/* Legend */}
			<div className="flex items-center justify-center gap-6 text-xs text-gray-500 mt-6 pt-4 border-t border-gray-100">
				<div className="flex items-center gap-2">
					<div className="w-2 h-2 rounded-full bg-red-400" />
					<span>Ocupado</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-2 h-2 rounded-full bg-purple-600" />
					<span>Seleccionado</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-2 h-2 rounded-full border border-gray-200" />
					<span>Libre</span>
				</div>
			</div>
		</div>
	);
}

export default function ServiceDetails({ formData, updateField, errors, processions = [], bookedDates = [] }) {
	const serviceOptions = [
		{ value: "procession", label: "Procesión" }
	];

	const processionOptions = processions.map(p => ({
		value: p.id,
		label: p.name
	}));

	const handleSelectChange = (e) => {
		const { name, value } = e.target;
		updateField(name, value);
	};

	const handleProcessionChange = (e) => {
		const { value } = e.target;
		updateField("procession_id", value);

		const selected = processions.find(p => p.id == value);
		if (selected && selected.itinerary) {
			updateField("approximate_route", selected.itinerary);
		}
	};

	const handleDateChange = (date) => {
		updateField("performance_date", date);
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
			<div className="flex flex-col gap-4">
				<SelectField
					label="Tipo de Actuación"
					placeholder="Selecciona el tipo"
					options={serviceOptions}
					name="performance_type"
					value={formData.performance_type}
					onChange={handleSelectChange}
					error={errors.performance_type}
				/>

				{processions.length > 0 && formData.performance_type === 'procession' && (
					<SelectField
						label="Seleccionar Procesión"
						placeholder="Elige una procesión..."
						options={processionOptions}
						name="procession_id"
						value={formData.procession_id}
						onChange={handleProcessionChange}
						error={errors.procession_id}
					/>
				)}

				{processions.length === 0 && formData.performance_type === 'procession' && (
					<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-3">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 mt-0.5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
						</svg>
						<div className="flex flex-col">
							<p className="text-sm font-bold">No tienes procesiones creadas</p>
							<p className="text-xs mt-1 text-red-600/80">Debes ir a tu panel de administración y crear al menos una procesión antes de poder seleccionarla para un contrato.</p>
						</div>
					</div>
				)}
			</div>

			<div className="flex flex-col gap-4">
				<div className="text-xs font-black text-base-content/40 uppercase tracking-widest flex items-center gap-2">
					<div className="w-1.5 h-1.5 rounded-full bg-[#8a01e5]"></div>
					Selecciona la Fecha del Evento
				</div>

				<div className="flex flex-col w-full">
					<div className={`w-full bg-white rounded-xl shadow-sm p-2 border ${errors.performance_date ? 'border-error/50 shadow-[0_0_40px_rgba(255,0,0,0.05)]' : 'border-base-200'}`}>
						<SelectableCalendar 
							bookedDates={bookedDates} 
							selectedDate={formData.performance_date} 
							onDateSelect={handleDateChange} 
						/>
					</div>

					{errors.performance_date && (
						<p className="mt-2 text-xs text-error">{errors.performance_date}</p>
					)}
				</div>
			</div>
		</div>
	);
}
