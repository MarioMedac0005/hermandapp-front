import { getMediaByCategories } from "../../utils/media";

function HermandadGallery({ media }) {
    const gallery = getMediaByCategories(media, "gallery");

    if (!gallery.length) {
        return null; // no renderiza nada si no hay imágenes
    }

    return (
        <section id="galeria" className="mt-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 border-l-4 border-purple-600 pl-4">
                Galería
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {gallery.map((item) => (
                    <div
                        key={item.id}
                        className="group relative h-64 overflow-hidden rounded-2xl shadow-lg cursor-pointer bg-gray-100"
                    >
                        <img
                            src={item.url}
                            alt="Imagen de la hermandad"
                            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                        />
                         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default HermandadGallery;
