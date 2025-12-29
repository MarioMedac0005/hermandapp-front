import { Link } from "react-router-dom";
import Logo from "@assets/img/logo.svg";

const userRole = "Banda";

function Navbar() {
	const linkClasses =
		"active:bg-transparent focus:bg-transparent hover:text-primary";

	const closeDrawer = () => {
		const drawer = document.getElementById("main-drawer");
		if (drawer) drawer.checked = false;
	};

	const NavLinks = ({ onClick }) => (
		<>
			<li>
				<Link to="/" className={linkClasses} onClick={onClick}>
					Inicio
				</Link>
			</li>
			<li>
				<Link to="/perfil/banda" className={linkClasses} onClick={onClick}>
					Bandas
				</Link>
			</li>
			<li>
				<Link to="/perfil/hermandad" className={linkClasses} onClick={onClick}>
					Hermandades
				</Link>
			</li>
			<li>
				<a className={linkClasses} onClick={onClick}>
					Contacto
				</a>
			</li>
			<li>
				<Link to="/admin-panel/dashboard" className={linkClasses} onClick={onClick}>
					Dashboard
				</Link>
			</li>
		</>
	);

	return (
		<div className="drawer">
			{/* Toggle */}
			<input id="main-drawer" type="checkbox" className="drawer-toggle" />

			{/* CONTENIDO */}
			<div className="drawer-content flex flex-col">
				<div className="navbar bg-base-100 shadow-sm px-4 md:px-7">
					<div className="navbar-start">
						<label
							htmlFor="main-drawer"
							className="btn btn-ghost btn-circle md:hidden"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</label>

						<Link to="/" className="inline-flex items-center w-fit ml-2">
							<img src={Logo} alt="Logo" className="w-28" />
						</Link>
					</div>

					{/* Menu Desktop */}
					<div className="navbar-center hidden md:flex">
						<ul className="menu menu-horizontal px-4">
							<NavLinks />
						</ul>
					</div>

					{/* Avatar desktop */}
					<div className="navbar-end hidden md:flex">
						<div className="dropdown dropdown-end">
							<div tabIndex={0} className="btn btn-ghost btn-circle avatar">
								<div className="w-10 rounded-full">
									<img
										src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
										alt="Avatar"
									/>
								</div>
							</div>
							<ul className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-40">
								<li><a className={linkClasses}>Perfil</a></li>
								<li><a className={linkClasses}>Ajustes</a></li>
								<li><a className={linkClasses}>Salir</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			{/* DRAWER */}
			<div className="drawer-side z-40">
				<label htmlFor="main-drawer" className="drawer-overlay"></label>

				<aside className="w-72 bg-base-100 p-6 flex flex-col">
					{/* Avatar + rol */}
					<div className="flex items-center gap-4 mb-8">
						<div className="avatar">
							<div className="w-12 rounded-full">
								<img
									src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
									alt="Avatar"
								/>
							</div>
						</div>
						<div>
							<p className="font-bold">Usuario</p>
							<p className="text-sm text-base-content/70">{userRole}</p>
						</div>
					</div>

					{/* Menu Movil*/}
					<ul className="menu gap-1 flex-1">
						<NavLinks onClick={closeDrawer} />
					</ul>

					{/* Acción */}
					<div className="border-t pt-4">
						<button className="btn btn-outline w-full" onClick={closeDrawer}>
							Cerrar sesión
						</button>
					</div>
				</aside>
			</div>
		</div>
	);
}

export default Navbar;
