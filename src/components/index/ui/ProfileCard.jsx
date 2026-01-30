import { Link } from "react-router-dom";

export default function ProfileCard({
	image,
	city,
	name,
	entityType,
	actionText,
	actionTo,
}) {
	return (
		<div className="card bg-base-100 shadow-sm hover:shadow-lg transition">
			<figure className="relative h-48">
				<img
					src={image ?? "/placeholder.jpg"}
					alt={name}
					className="w-full h-full object-cover"
				/>
				<span className="absolute top-3 right-3 badge bg-[#8a01e5] text-white border-none">
					{city}
				</span>
			</figure>

			<div className="card-body p-4">
				<h3 className="font-bold text-xl leading-tight">{name}</h3>

				<p className="text-sm text-base-content/70 mb-4 capitalize">
					{entityType === "band" ? "Banda de Música" : "Hermandad"}
				</p>

				<Link
					to={actionTo}
					className="btn btn-outline border-[#8a01e5] text-[#8a01e5] hover:bg-[#8a01e5] hover:border-[#8a01e5] hover:text-white w-full rounded-lg transition-all duration-300"
				>
					{actionText}
				</Link>
			</div>
		</div>
	);
}
