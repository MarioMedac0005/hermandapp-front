import { getMediaByCategory } from "../../utils/media";

function HermandadHeader({ hermandad }) {
    const banner = getMediaByCategory(hermandad.media, "banner");
    const profile = getMediaByCategory(hermandad.media, "profile");

    return (
        <div className="container mx-auto px-6 pt-8 max-w-7xl">
            <header className="relative h-64 rounded-xl overflow-hidden">
                {banner && (
                    <img
                        src={banner.url}
                        alt={hermandad.name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}

                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 flex items-end h-full p-6 text-white">
                    <div className="bg-white p-2 rounded-lg mr-4">
                        {profile ? (
                            <img
                                src={profile.url}
                                alt={hermandad.name}
                                className="w-20 h-20 object-contain"
                            />
                        ) : (
                            <div className="w-20 h-20 bg-gray-200 rounded-lg" />
                        )}
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold">{hermandad.name}</h1>
                        <p className="text-sm sm:text-base">{hermandad.city}</p>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default HermandadHeader;
