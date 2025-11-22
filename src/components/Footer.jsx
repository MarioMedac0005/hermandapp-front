import Logo from "@assets/img/logo.svg";

export default function Footer() {
    return (
        <>
            <footer className="footer sm:footer-horizontal bg-gray-100 text-base-content p-10 mx-10">
                <aside>
                    <div className="flex-1">
                        <img src={Logo} alt="Logo" className="w-28" />
                    </div>
                </aside>
                <nav>
                    <h6 className="footer-title">Servicios</h6>
                    <a className="link link-hover">Contrataciones</a>
                    <a className="link link-hover">Hermandades</a>
                    <a className="link link-hover">Bandas</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Compañia</h6>
                    <a className="link link-hover">Sobre Nosotros</a>
                    <a className="link link-hover">Contacto</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Términos de Uso</a>
                    <a className="link link-hover">Política de Privacida</a>
                    <a className="link link-hover">Política de Cookies</a>
                </nav>
            </footer>
        </>
    )
}
