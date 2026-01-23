import Logo from "@assets/img/isotipo.png";

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
                    <a className="link link-hover">Iniciar Sesión</a>
                    <a className="link link-hover">Registrarse</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Contacto</h6>
                    <a className="link link-hover">Email</a>
                    <a className="link link-hover">Telefono</a>
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
