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
		<nav className="mt-8 bg-white rounded-xl shadow-md container mx-auto px-6 max-w-7xl">
			<div className="py-3 flex gap-x-8 text-gray-700">
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
