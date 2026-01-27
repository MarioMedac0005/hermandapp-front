import { Link } from "react-router-dom";

export default function CardBusqueda({ data }) {
	const typeMap = {
		band: "banda",
		brotherhood: "hermandad",
	};

	const routeType = typeMap[data.type];

	// Buscar banner
	const banner =
		data.media?.find(m => m.category === "banner")?.path
		?? "/placeholder.jpg";

	return (
		<div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition">
			<img
				src={data.banner}
				alt={data.name}
				className="w-full h-40 object-cover"
			/>

			<div className="p-4">
				<span className="text-xs font-semibold text-purple-600 uppercase">
					{routeType} • {data.city}
				</span>

				<h3 className="font-semibold text-lg mt-1">
					{data.name}
				</h3>

				{data.description && (
					<p className="text-gray-600 text-sm mt-1 line-clamp-2">
						{data.description}
					</p>
				)}

				<Link
					to={`/perfil/${routeType}/${data.id}`}
					className="mt-4 block w-full bg-purple-100 text-purple-700 rounded-lg py-2 text-sm font-medium text-center hover:bg-purple-200 transition"
				>
					Ver más
				</Link>
			</div>
		</div>
	);
}
