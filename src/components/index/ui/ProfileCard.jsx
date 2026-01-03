export default function ProfileCard({
	image,
	city,
	name,
	entityType,
	actionText,
}) {
	return (
		<div className="card bg-base-100 shadow-sm hover:shadow-lg transition">
			<figure className="relative h-48">
				<img
					src={image ?? "/placeholder.jpg"}
					alt={name}
					className="w-full h-full object-cover"
				/>
				<span className="absolute top-3 right-3 badge badge-primary">
					{city}
				</span>
			</figure>

			<div className="card-body p-4">
				<h3 className="font-bold text-xl leading-tight">{name}</h3>

				<p className="text-sm text-base-content/70 mb-4 capitalize">
					{entityType === "band" ? "Banda de Música" : "Hermandad"}
				</p>

				<button className="btn btn-outline btn-primary w-full">
					{actionText}
				</button>
			</div>
		</div>
	);
}
