import Logo from "@assets/img/logo.png";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-base-content py-8 px-6 md:px-12 border-t border-gray-200">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="flex flex-col">
                        <Link to="/" className="inline-block mt-2">
                            <img src={Logo} alt="HermandApp Logo" className="w-32" />
                        </Link>
                    </div>

                    <div>
                        <h6 className="text-sm font-bold uppercase tracking-widest mb-3 text-[#8a01e5]">Acceso</h6>
                        <ul className="space-y-1.5">
                            <li><Link to="/login" className="hover:text-[#8a01e5] transition-colors">Iniciar Sesión</Link></li>
                            <li><Link to="/register" className="hover:text-[#8a01e5] transition-colors">Registrarse</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h6 className="text-sm font-bold uppercase tracking-widest mb-3 text-[#8a01e5]">Contacto</h6>
                        <ul className="space-y-1.5">
                            <li><a href="mailto:soporte@hermandapp.es" className="hover:text-[#8a01e5] transition-colors">Email</a></li>
                            <li><a href="tel:+34954123456" className="hover:text-[#8a01e5] transition-colors">Teléfono</a></li>
                        </ul>
                    </div>

                    <div>
                        <h6 className="text-sm font-bold uppercase tracking-widest mb-3 text-[#8a01e5]">Legal</h6>
                        <ul className="space-y-1.5">
                            <li><Link to="/terminos-uso" className="hover:text-[#8a01e5] transition-colors">Términos de Uso</Link></li>
                            <li><Link to="/politica-privacidad" className="hover:text-[#8a01e5] transition-colors">Privacidad</Link></li>
                            <li><Link to="/politica-cookies" className="hover:text-[#8a01e5] transition-colors">Cookies</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
