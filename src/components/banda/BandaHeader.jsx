import { EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { getMediaByCategory } from "../../utils/media";

export default function BandaHeader({ banda }) {
	const banner = getMediaByCategory(banda.media, "banner");
	const perfil = getMediaByCategory(banda.media, "profile");

	return (
		<header className="relative w-full mb-12 md:mb-16 md:h-[40vh] md:min-h-[350px] group">
			{/* Banner Background */}
			<div className="absolute inset-0 w-full h-full overflow-hidden rounded-b-3xl">
				<div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/40 to-transparent z-10" />
				{banner ? (
					<img
						src={banner.url}
						className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
						alt="Banner"
					/>
				) : (
					<div className="w-full h-full bg-linear-to-br from-indigo-900 to-purple-900" />
				)}
			</div>

			{/* Content */}
			<div className="relative z-20 container mx-auto px-6 max-w-6xl h-full flex flex-col justify-end pb-8 pt-32 md:pt-0">
				<div className="flex flex-col md:flex-row items-end gap-6">
					{/* Profile Image */}
					<div className="relative shrink-0 -mb-12 md:-mb-16 mx-auto md:mx-0">
						<div className="w-32 h-32 md:w-44 md:h-44 rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-white/20 overflow-hidden relative z-20">
							{perfil ? (
								<img
									src={perfil.url}
									className="w-full h-full object-contain rounded-xl"
									alt="Perfil"
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl font-bold bg-gray-50 rounded-xl">
									{banda.name.charAt(0)}
								</div>
							)}
						</div>
					</div>

					{/* Text Details */}
					<div className="flex-1 text-white pb-1 w-full text-center md:text-left pt-12 md:pt-0">
						<h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 text-shadow-sm leading-none px-4 md:px-0">
							{banda.name}
						</h1>
						
						<div className="flex flex-wrap items-center gap-3 text-gray-200 font-medium text-sm md:text-base justify-center md:justify-start">
							<span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors">
								<MapPinIcon className="size-4" />
								{banda.city}
							</span>

							{banda.email && (
								<a 
									href={`mailto:${banda.email}`}
									className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors"
								>
									<EnvelopeIcon className="size-4" />
									{banda.email}
								</a>
							)}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
