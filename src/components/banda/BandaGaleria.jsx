import { getMediaByCategories } from "../../utils/media";

export default function BandaGaleria({ media }) {
	const galeria = getMediaByCategories(media, "gallery");

	return (
		<section>
			<h2 className="text-2xl font-semibold mb-4">Galería</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{galeria.map(item => (
					<img
						key={item.id}
						src={item.url}
						alt="Imagen galería"
						className="h-64 w-full object-cover rounded-xl shadow"
					/>
				))}
			</div>
		</section>
	);
}
