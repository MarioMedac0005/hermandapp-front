import { EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { getMediaByCategory } from "../../utils/media";

export default function BandaHeader({ banda }) {
	const banner = getMediaByCategory(banda.media, "banner");
	const perfil = getMediaByCategory(banda.media, "perfil");

	return (
		<div className="container mx-auto px-6 pt-8 max-w-7xl">
			<header className="relative h-64 rounded-xl overflow-hidden">
				{banner ? (
					<img
						src={banner.url}
						className="absolute inset-0 w-full h-full object-cover"
						alt="Banner"
					/>
				) : (
					<div className="absolute inset-0 bg-gray-800" />
				)}

				<div className="absolute inset-0 bg-black/40" />

				<div className="relative z-10 flex items-end h-full p-6 gap-6 text-white">
					<div className="bg-white p-2 rounded-lg">
						{perfil ? (
							<img
								src={perfil.url}
								className="w-20 h-20 object-contain"
								alt="Perfil"
							/>
						) : (
							<div className="w-20 h-20 flex items-center justify-center text-black font-bold">
								{banda.name.charAt(0)}
							</div>
						)}
					</div>

					<div>
						<h1 className="text-3xl font-bold">{banda.name}</h1>
						<p className="flex items-center gap-1">
							<MapPinIcon className="size-4" />
							{banda.city}
						</p>

						{banda.email && (
							<p className="flex items-center gap-1 mt-1">
								<EnvelopeIcon className="size-4" />
								{banda.email}
							</p>
						)}
					</div>
				</div>
			</header>
		</div>
	);
}
