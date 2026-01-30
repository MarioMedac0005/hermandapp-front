import { getMediaByCategory } from "../../utils/media";
import { MapPinIcon } from "@heroicons/react/24/outline";

function HermandadHeader({ hermandad }) {
    const banner = getMediaByCategory(hermandad.media, "banner");
    const profile = getMediaByCategory(hermandad.media, "profile");

    return (
        <header className="relative w-full mb-8 md:mb-16 md:h-[50vh] md:min-h-[400px]">
            {/* Banner Background */}
            <div className="absolute inset-0 w-full h-full">
                {banner ? (
                    <img
                        src={banner.url}
                        alt={hermandad.name}
                        className="w-full h-full object-cover"
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
                            {profile ? (
                                <img
                                    src={profile.url}
                                    alt={hermandad.name}
                                    className="w-full h-full object-contain rounded-xl"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-5xl font-bold bg-gray-50 rounded-xl">
                                    {hermandad.name.charAt(0)}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Text Details */}
                    <div className="flex-1 text-white pb-2 flex flex-col items-center md:items-start">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2 md:mb-4 text-shadow-lg leading-tight">
                            {hermandad.name}
                        </h1>
                        
                        <p className="flex items-center gap-2 text-lg md:text-xl text-gray-200 font-medium bg-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors">
                            <MapPinIcon className="size-5" />
                            {hermandad.city}
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HermandadHeader;
