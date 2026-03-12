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
		<Link 
			to={actionTo}
			className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100/50 hover:border-gray-200 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-out"
		>
			<div className="relative h-56 w-full overflow-hidden p-2 pb-0">
				<div className="w-full h-full rounded-2xl overflow-hidden relative">
					<img
						src={image ?? "/placeholder.jpg"}
						alt={name}
						className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
					/>
					<div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
				</div>
			</div>

			<div className="flex flex-col flex-1 p-6">
				<div className="flex justify-between items-start mb-3">
					<p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
						{entityType === "band" ? "Banda" : "Hermandad"}
					</p>
					<span className="text-[11px] font-medium text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">
						{city}
					</span>
				</div>
				
				<h3 className="font-bold text-gray-900 text-xl leading-snug line-clamp-2 mb-6 group-hover:text-[#8a01e5] transition-colors duration-300">
					{name}
				</h3>

				<div className="mt-auto flex items-center gap-2 text-sm font-semibold text-gray-400 group-hover:text-[#8a01e5] transition-colors duration-300">
					<span>Descubrir perfil</span>
					<span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">
						→
					</span>
				</div>
			</div>
		</Link>
	);
}
