import { useState } from "react";
import {
	NewspaperIcon,
	PhotoIcon,
	UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function HermandadNav({
	hasHistoria,
	hasGaleria,
	hasProcesiones,
}) {
	const [active, setActive] = useState("historia");

	const scrollTo = id => {
		const section = document.getElementById(id);
		if (section) {
			const offset = 100;
			const elementPosition = section.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.pageYOffset - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth"
			});
			setActive(id);
		}
	};

	return (
		<nav className="container mx-auto px-6 max-w-6xl py-3">
			<div className="flex justify-center md:justify-start gap-2 overflow-x-auto no-scrollbar pb-1">
				{hasHistoria && (
					<Item
						icon={NewspaperIcon}
						text="Historia"
						active={active === "historia"}
						onClick={() => scrollTo("historia")}
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

				{hasProcesiones && (
					<Item
						icon={UserGroupIcon}
						text="Procesiones"
						active={active === "procesiones"}
						onClick={() => scrollTo("procesiones")}
					/>
				)}
			</div>
		</nav>
	);
}

function Item({ icon: Icon, text, onClick, active }) {
	return (
		<button
			onClick={onClick}
			className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
			${active
					? "bg-purple-600 text-white shadow-md shadow-purple-200"
					: "bg-white text-gray-500 hover:bg-gray-50 hover:text-purple-600 border border-gray-100"
				}`}
		>
			<Icon className="size-4" />
			<span>{text}</span>
		</button>
	);
}
