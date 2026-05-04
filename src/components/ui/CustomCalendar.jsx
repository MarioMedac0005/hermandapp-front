import { useState, useMemo } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function CustomCalendar({ bookedDates = [], selectedDate, onDateSelect }) {
	const [currentDate, setCurrentDate] = useState(new Date());

	const { days, monthLabel, weekDays } = useMemo(() => {
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();
		
		const firstDayOfMonth = new Date(year, month, 1).getDay();
		// Adjust for Monday start (0=Sunday, 1=Monday -> want 0=Monday)
		const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
		
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		
		const daysArray = [];

		// Empty slots for previous month
		for (let i = 0; i < startOffset; i++) {
			daysArray.push(null);
		}

		// Days of current month
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
		return bookedDates.some(
			booked => 
				booked.getDate() === date.getDate() &&
				booked.getMonth() === date.getMonth() &&
				booked.getFullYear() === date.getFullYear()
		);
	};

	const isToday = (date) => {
		if (!date) return false;
		const today = new Date();
		return (
			date.getDate() === today.getDate() &&
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear()
		);
	};

	const isSelected = (date) => {
        if (!date || !selectedDate) return false;
        return (
			date.getDate() === selectedDate.getDate() &&
			date.getMonth() === selectedDate.getMonth() &&
			date.getFullYear() === selectedDate.getFullYear()
		);
    };

	return (
		<div className="max-w-md mx-auto w-full">
			{/* Header */}
			<div className="flex items-center justify-between mb-6">
				<button 
                    type="button"
					onClick={prevMonth}
					className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
				>
					<ChevronLeftIcon className="size-5" />
				</button>
				<h3 className="text-lg font-semibold text-gray-900 capitalize">
					{monthLabel}
				</h3>
				<button 
                    type="button"
					onClick={nextMonth}
					className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
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
					const today = isToday(date);
                    const selected = isSelected(date);
					
					return (
						<button 
							key={date.toISOString()} 
                            type="button"
                            onClick={() => {
                                if (!booked && onDateSelect) {
                                    onDateSelect(date);
                                }
                            }}
                            disabled={booked}
							className={`
								aspect-square flex flex-col items-center justify-center rounded-xl text-sm font-medium transition-all relative
								${booked 
									? "bg-red-50 text-red-600 font-bold opacity-60 cursor-not-allowed" 
                                    : selected
                                        ? "bg-purple-600 text-white shadow-md shadow-purple-600/30 scale-105"
									: today && !selected
										? "bg-purple-100 text-purple-700 hover:bg-purple-200"
										: "hover:bg-gray-100 text-gray-700 cursor-pointer"
								}
							`}
						>
							<span>{date.getDate()}</span>
							{booked && (
								<span className="absolute bottom-1.5 w-1 h-1 bg-red-400 rounded-full" />
							)}
                            {!booked && selected && (
                                <span className="absolute bottom-1.5 w-1 h-1 bg-white rounded-full" />
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
                {onDateSelect && (
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-600" />
                        <span>Seleccionado</span>
                    </div>
                )}
				<div className="flex items-center gap-2">
					<div className="w-2 h-2 rounded-full bg-purple-200" />
					<span>Hoy</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-2 h-2 rounded-full border border-gray-200" />
					<span>Libre</span>
				</div>
			</div>
		</div>
	);
}
