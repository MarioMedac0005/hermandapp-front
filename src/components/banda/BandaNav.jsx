import { useState } from "react";
import {
	NewspaperIcon,
	MusicalNoteIcon,
	PhotoIcon,
	CalendarDaysIcon
} from "@heroicons/react/24/outline";

export default function BandaNav({ hasRepertorio, hasGaleria }) {
	const [active, setActive] = useState("historia");

	const scrollTo = id => {
		const section = document.getElementById(id);
		if (section) {
			section.scrollIntoView({ behavior: "smooth" });
			setActive(id);
		}
	};

	return (
		<nav className="container mx-auto px-6 max-w-6xl">
			<div className="flex gap-x-8 text-gray-500 overflow-x-auto no-scrollbar">
				<Item
					icon={NewspaperIcon}
					text="Historia"
					active={active === "historia"}
					onClick={() => scrollTo("historia")}
				/>

				{hasRepertorio && (
					<Item
						icon={MusicalNoteIcon}
						text="Repertorio"
						active={active === "repertorio"}
						onClick={() => scrollTo("repertorio")}
					/>
				)}

				{hasGaleria && (
					<Item
						icon={PhotoIcon}
						text="Galería"
						active={active === "galeria"}
						onClick={() => scrollTo("galeria")}
					/>
				)}

				<Item
					icon={CalendarDaysIcon}
					text="Disponibilidad"
					active={active === "disponibilidad"}
					onClick={() => scrollTo("disponibilidad")}
				/>
			</div>
		</nav>
	);
}

function Item({ icon: Icon, text, onClick, active }) {
	return (
		<button
			onClick={onClick}
			className={`flex items-center gap-2 py-4 px-2 cursor-pointer transition-all duration-300 border-b-2 whitespace-nowrap
			${active
					? "border-purple-600 text-purple-600 font-medium"
					: "border-transparent hover:text-purple-600 hover:border-purple-200"
				}`}
		>
			<Icon className="size-5" />
			<span>{text}</span>
		</button>
	);
}
