import { getMediaByCategories } from "../../utils/media";

function HermandadGallery({ media }) {
    const gallery = getMediaByCategories(media, "gallery");

    if (!gallery.length) {
        return null; // no renderiza nada si no hay imágenes
    }

    return (
        <section id="galeria" className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Galería
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {gallery.map((item) => (
                    <div
                        key={item.id}
                        className="overflow-hidden rounded-lg shadow-md bg-gray-100"
                    >
                        <img
                            src={item.url}
                            alt="Imagen de la hermandad"
                            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default HermandadGallery;
