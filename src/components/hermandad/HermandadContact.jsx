import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
} from "@heroicons/react/24/outline";

function HermandadContact({ hermandad }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24 z-10 lg:static lg:sticky lg:top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-1 bg-purple-600 rounded-full inline-block"></span>
                Contacto
            </h3>

            <div className="space-y-4">
                <ContactItem icon={MapPinIcon} value={hermandad.office} />
                <ContactItem 
                    icon={EnvelopeIcon} 
                    value={hermandad.email} 
                    href={`mailto:${hermandad.email}`} 
                />
                <ContactItem icon={PhoneIcon} value={hermandad.phone_number} />
            </div>
        </div>
    );
}

function ContactItem({ icon: Icon, value, href }) {
    if (!value) return null;

    const content = (
        <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg shrink-0">
                <Icon className="w-5 h-5" />
            </div>
            <span className="text-gray-700 font-medium break-all py-1">{value}</span>
        </div>
    );

    return href ? (
        <a href={href} className="block group">
            {content}
        </a>
    ) : content;
}

export default HermandadContact;
