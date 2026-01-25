import { Link, useNavigate } from "react-router-dom";
import Logo from "@assets/img/logo.svg";
import useAuth from "../hooks/useAuth";

function Navbar() {
	const { user, loading, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		navigate("/login");
	};

	if (loading) {
		return (
			<div className="navbar bg-base-100 shadow px-6">
				<span className="text-sm opacity-60">Cargando…</span>
			</div>
		);
	}

	return (
		<>
			<div className="drawer md:hidden">
				<input id="main-drawer" type="checkbox" className="drawer-toggle" />

				<div className="drawer-content">

					<div className="navbar bg-base-100 shadow px-4">
						<div className="navbar-start">
							<label
								htmlFor="main-drawer"
								className="btn btn-ghost btn-circle"
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

							<img src={Logo} className="w-28 ml-2" />
						</div>
					</div>
				</div>

				<div className="drawer-side z-40">
					<label htmlFor="main-drawer" className="drawer-overlay"></label>

					<aside className="w-72 bg-base-100 p-6 flex flex-col">
						{user && (
							<div className="flex items-center gap-4 mb-8">
								<img
									src={user.avatar}
									className="w-12 h-12 rounded-full"
								/>
								<div>
									<p className="font-bold">{user.name}</p>
									<p className="text-sm opacity-70">
										{user.organization}
									</p>
								</div>
							</div>
						)}

						<ul className="menu gap-1 flex-1">
							<li><Link to="/perfil">Perfil</Link></li>

							{user?.permissions.can_access_admin && (
								<li>
									<Link to="/admin-panel/dashboard">
										Administración
									</Link>
								</li>
							)}
						</ul>

						{user && (
							<button
								className="btn btn-outline mt-4"
								onClick={handleLogout}
							>
								Cerrar sesión
							</button>
						)}
					</aside>
				</div>
			</div>
			{/* ===== MOBILE DRAWER ===== */}

			{/* ===== DESKTOP NAVBAR ===== */}
			<div className="navbar bg-base-100 shadow px-6 hidden md:flex">
				<div className="navbar-start">
					<Link to="/">
						<img src={Logo} className="w-32" />
					</Link>
				</div>

				<div className="navbar-end gap-2">
					{!user ? (
						<>
							<Link to="/login" className="btn btn-ghost">
								Iniciar sesión
							</Link>
							<Link to="/register" className="btn btn-primary">
								Registrarse
							</Link>
						</>
					) : (
						<div className="dropdown dropdown-end">
							<div tabIndex={0} className="btn btn-ghost btn-circle avatar">
								<div className="w-10 rounded-full">
									<img src={user.avatar} alt="Avatar" />
								</div>
							</div>

							<div className="dropdown-content mt-3 min-w-36 rounded-xl bg-base-100 shadow-lg border border-base-200">
								{/* Header usuario */}
								<div className="px-4 py-3">
									<p className="text-sm font-semibold leading-tight">
										{user.name}
									</p>
									<p className="text-xs text-base-content/70">
										{user.organization}
									</p>
								</div>

								<div className="divider my-0"></div>

								{/* Menú */}
								<ul className="menu menu-compact w-auto">
									<li>
										<Link to="/perfil">Perfil</Link>
									</li>

									{user?.permissions?.can_access_admin && (
										<li>
											<Link to="/admin-panel/dashboard">
												Administración
											</Link>
										</li>
									)}

									<li>
										<button
											onClick={handleLogout}
											className="text-error hover:bg-error/10"
										>
											Salir
										</button>
									</li>
								</ul>
							</div>
						</div>

					)}
				</div>
			</div>
		</>
	);
}

export default Navbar;
