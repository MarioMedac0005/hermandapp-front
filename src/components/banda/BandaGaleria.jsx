import { getMediaByCategories } from "../../utils/media";

export default function BandaGaleria({ media }) {
	const galeria = getMediaByCategories(media, "gallery");

	return (
		<section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
			<h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
				<span className="w-1 h-6 bg-purple-600 rounded-full"></span>
				Galería
			</h2>

			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
				{galeria.map(item => (
					<div 
						key={item.id} 
						className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 cursor-zoom-in group"
					>
						<img
							src={item.url}
							alt="Imagen galería"
							className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
							loading="lazy"
						/>
						<div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
					</div>
				))}
			</div>
		</section>
	);
}
