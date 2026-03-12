import Logo from "@assets/img/logo.png";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-white text-gray-500 py-16 px-6 md:px-12 border-t border-gray-100 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                
                <div className="flex flex-col max-w-sm">
                    <Link to="/" className="mb-6 inline-block opacity-90 hover:opacity-100 transition-opacity">
                        <img src={Logo} alt="HermandApp Logo" className="w-28 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
                    </Link>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Conectando hermandades y bandas con una plataforma elegante, moderna y funcional.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-8 w-full md:w-auto">
                    <div>
                        <h6 className="text-[11px] font-bold uppercase tracking-widest mb-4 text-gray-900">Acceso</h6>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/login" className="hover:text-[#8a01e5] transition-colors">Iniciar Sesión</Link></li>
                            <li><Link to="/register" className="hover:text-[#8a01e5] transition-colors">Registrarse</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h6 className="text-[11px] font-bold uppercase tracking-widest mb-4 text-gray-900">Contacto</h6>
                        <ul className="space-y-3 text-sm">
                            <li><a href="mailto:soporte@hermandapp.es" className="hover:text-[#8a01e5] transition-colors">Soporte</a></li>
                            <li><a href="tel:+34954123456" className="hover:text-[#8a01e5] transition-colors">Llámanos</a></li>
                        </ul>
                    </div>

                    <div className="col-span-2 md:col-span-1">
                        <h6 className="text-[11px] font-bold uppercase tracking-widest mb-4 text-gray-900">Legal</h6>
                        <ul className="space-y-3 text-sm flex flex-col md:block">
                            <li><Link to="/terminos-uso" className="hover:text-[#8a01e5] transition-colors">Términos</Link></li>
                            <li><Link to="/politica-privacidad" className="hover:text-[#8a01e5] transition-colors">Privacidad</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
                <p>&copy; {new Date().getFullYear()} HermandApp. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}
