import { useState } from "react";
import {
	NewspaperIcon,
	PhotoIcon,
	UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function HermandadNav({
	hasHistoria,
	hasGaleria,
	hasCortejos,
}) {
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

				{hasCortejos && (
					<Item
						icon={UserGroupIcon}
						text="Cortejos"
						active={active === "cortejos"}
						onClick={() => scrollTo("cortejos")}
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
