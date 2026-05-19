import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
} from "@heroicons/react/24/outline";

function HermandadContact({ hermandad }) {
    let formattedPhone = null;
    if (hermandad.phone_number) {
        const cleanPhone = hermandad.phone_number.replace(/\s+/g, '');
        if (cleanPhone.startsWith('+')) {
            formattedPhone = cleanPhone;
        } else if (cleanPhone.startsWith('34') && cleanPhone.length >= 11) {
            formattedPhone = `+${cleanPhone}`;
        } else {
            formattedPhone = `+34${cleanPhone}`;
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-purple-600 rounded-full inline-block"></span>
                Contacto
            </h3>

            <div className="space-y-3">
                <ContactItem icon={MapPinIcon} value={hermandad.office} />
                <ContactItem 
                    icon={EnvelopeIcon} 
                    value={hermandad.email} 
                    href={`mailto:${hermandad.email}`} 
                />
                <ContactItem 
                    icon={PhoneIcon} 
                    value={formattedPhone} 
                />
            </div>
        </div>
    );
}

function ContactItem({ icon: Icon, value, href }) {
    if (!value) return null;

    const content = (
        <div className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors group/item">
            <div className="p-1.5 bg-purple-50 text-purple-600 rounded-md shrink-0 group-hover/item:bg-purple-100 transition-colors">
                <Icon className="size-4" />
            </div>
            <span className="text-gray-600 text-sm font-medium break-all">{value}</span>
        </div>
    );

    return href ? (
        <a href={href} className="block">
            {content}
        </a>
    ) : content;
}

export default HermandadContact;
