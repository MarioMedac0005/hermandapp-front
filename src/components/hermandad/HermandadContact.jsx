import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
} from "@heroicons/react/24/outline";

function HermandadContact({ hermandad }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
                Contacto
            </h3>

            <div className="flex items-center gap-3 mb-3 text-gray-700">
                <MapPinIcon className="w-5 h-5 text-purple-600" />
                <span>{hermandad.office}</span>
            </div>

            <div className="flex items-center gap-3 mb-3 text-gray-700">
                <EnvelopeIcon className="w-5 h-5 text-purple-600" />
                <a
                    href={`mailto:${hermandad.email}`}
                    className="hover:text-purple-600"
                >
                    {hermandad.email}
                </a>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
                <PhoneIcon className="w-5 h-5 text-purple-600" />
                <span>{hermandad.phone_number}</span>
            </div>
        </div>
    );
}

export default HermandadContact;
