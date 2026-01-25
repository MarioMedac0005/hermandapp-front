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
		<nav className="mt-8 bg-white rounded-xl shadow-md container mx-auto px-6 max-w-7xl">
			<div className="py-3 flex gap-x-8 text-gray-700">
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
		<div
			onClick={onClick}
			className={`flex items-center gap-2 pb-2 cursor-pointer
			${active
					? "border-b-2 border-purple-600 text-purple-600"
					: "hover:text-purple-600"
				}`}
		>
			<Icon className="size-5" />
			<span>{text}</span>
		</div>
	);
}
