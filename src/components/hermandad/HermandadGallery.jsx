import { getMediaByCategories } from "../../utils/media";

function HermandadGallery({ media }) {
    const gallery = getMediaByCategories(media, "gallery");

    if (!gallery.length) {
        return null;
    }

    return (
        <section id="galeria" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-purple-600 rounded-full"></span>
                Galería
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4">
                {gallery.map((item) => (
                    <div
                        key={item.id}
                        className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 cursor-zoom-in"
                    >
                        <img
                            src={item.url}
                            alt="Imagen de la hermandad"
                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                        />
                         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default HermandadGallery;
