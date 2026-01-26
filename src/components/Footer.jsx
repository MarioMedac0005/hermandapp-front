import Logo from "@assets/img/logo.png";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
            <footer className="footer sm:footer-horizontal bg-gray-100 text-base-content p-10">
                <aside>
                    <div className="flex-1">
                        <img src={Logo} alt="Logo" className="w-38" />
                    </div>
                </aside>
                <nav>
                    <h6 className="footer-title">Acceso</h6>
                    <Link to="/login" className="link link-hover">Iniciar Sesión</Link>
                    <Link to="/register" className="link link-hover">Registrarse</Link>
                </nav>
                <nav>
                    <h6 className="footer-title">Contacto</h6>
                    <a href="mailto:soporte@hermandapp.es" className="link link-hover">Email</a>
                    <a href="tel:+34954123456" className="link link-hover">Teléfono</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <Link to="/terminos-uso" className="link link-hover">Términos de Uso</Link>
                    <Link to="/politica-privacidad" className="link link-hover">Política de Privacidad</Link>
                    <Link to="/politica-cookies" className="link link-hover">Política de Cookies</Link>
                </nav>
            </footer>
        </>
    )
}
