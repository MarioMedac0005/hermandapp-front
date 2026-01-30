import { EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { getMediaByCategory } from "../../utils/media";

export default function BandaHeader({ banda }) {
	const banner = getMediaByCategory(banda.media, "banner");
	const perfil = getMediaByCategory(banda.media, "profile");

	return (
		<header className="relative w-full mb-8 md:mb-16 md:h-[50vh] md:min-h-[400px]">
			{/* Banner Background */}
			<div className="absolute inset-0 w-full h-full">
				{banner ? (
					<img
						src={banner.url}
						className="w-full h-full object-cover"
						alt="Banner"
					/>
				) : (
					<div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800" />
				)}
				<div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
			</div>

			{/* Content */}
			<div className="relative md:absolute md:inset-0 container mx-auto px-6 max-w-6xl flex flex-col justify-end pb-8 pt-24 md:pt-0 min-h-[400px] md:h-full">
				<div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 mb-4 md:mb-8 text-center md:text-left">
					{/* Profile Image */}
					<div className="relative shrink-0">
						<div className="w-28 h-28 md:w-48 md:h-48 rounded-2xl bg-white p-2 shadow-2xl relative z-10 overflow-hidden transform transition-transform hover:scale-105 duration-300">
							{perfil ? (
								<img
									src={perfil.url}
									className="w-full h-full object-contain rounded-xl"
									alt="Perfil"
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center text-gray-400 text-5xl font-bold bg-gray-50 rounded-xl">
									{banda.name.charAt(0)}
								</div>
							)}
						</div>
					</div>

					{/* Text Details */}
					<div className="flex-1 text-white pb-2 flex flex-col items-center md:items-start">
						<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2 md:mb-4 text-shadow-lg leading-tight">
							{banda.name}
						</h1>
						
						<div className="flex flex-wrap gap-4 text-gray-200 font-medium text-lg justify-center md:justify-start">
							<p className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors">
								<MapPinIcon className="size-5" />
								{banda.city}
							</p>

							{banda.email && (
								<p className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors">
									<EnvelopeIcon className="size-5" />
									<a href={`mailto:${banda.email}`} className="hover:text-white transition-colors">
										{banda.email}
									</a>
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
