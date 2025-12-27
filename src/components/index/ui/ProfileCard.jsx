export default function ProfileCard({
	image,
	location,
	name,
	type,
	rating,
	reviews,
	actionText,
}) {
	return (
		<div className="card bg-base-100 shadow-sm hover:shadow-lg transition">
			<figure className="relative h-48">
				<img
					src={image}
					alt={name}
					className="w-full h-full object-cover"
				/>
				<span className="absolute top-3 right-3 badge badge-primary">
					{location}
				</span>
			</figure>

			<div className="card-body p-4">
				<h3 className="font-bold text-xl leading-tight">{name}</h3>
				<p className="text-sm text-base-content/70 mb-2">{type}</p>

				{rating && (
					<div className="flex items-center gap-1 text-amber-500 text-sm mb-3">
						{"★".repeat(Math.floor(rating))}
						<span className="text-xs text-base-content/60 ml-1">
							({reviews})
						</span>
					</div>
				)}

				<button className="btn btn-outline btn-primary w-full">
					{actionText}
				</button>
			</div>
		</div>
	);
}
