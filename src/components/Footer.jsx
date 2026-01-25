import { Link } from "react-router-dom";
import Logo from "@assets/img/logo.svg";

export default function Footer() {
    return (
        <footer className="footer sm:footer-horizontal bg-gray-100 text-base-content p-10">
            <aside>
                <Link to="/" className="flex items-center">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="w-28 cursor-pointer"
                    />
                </Link>
            </aside>

            <nav>
                <h6 className="footer-title">Servicios</h6>
                <a className="link link-hover">Contrataciones</a>
                <a className="link link-hover">Hermandades</a>
                <a className="link link-hover">Bandas</a>
            </nav>

            <nav>
                <h6 className="footer-title">Compañía</h6>
                <a className="link link-hover">Sobre Nosotros</a>
                <a className="link link-hover">Contacto</a>
            </nav>

            <nav>
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Términos de Uso</a>
                <a className="link link-hover">Política de Privacidad</a>
                <a className="link link-hover">Política de Cookies</a>
            </nav>
        </footer>
    );
}
