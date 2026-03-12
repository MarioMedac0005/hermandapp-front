import { Link, useNavigate } from "react-router-dom";
import Logo from "@assets/img/logo.png";
import { useAuth } from "@contexts/AuthContext";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
	UserIcon,
	ArrowRightStartOnRectangleIcon,
	CommandLineIcon,
	ChevronDownIcon,
	MusicalNoteIcon,
	UserGroupIcon,
	Bars3Icon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
	const { user, loading, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		navigate("/login");
	};

	if (loading && !user) {
		return (
			<header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-20 flex items-center px-6">
				<div className="w-full max-w-7xl mx-auto flex">
					<span className="text-sm font-medium text-gray-400 animate-pulse">Cargando...</span>
				</div>
			</header>
		);
	}

	return (
		<header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
			<div className="w-full max-w-7xl mx-auto">
				{/* ===== MOBILE DRAWER ===== */}
				<div className="drawer md:hidden">
					<input id="main-drawer" type="checkbox" className="drawer-toggle" />

					<div className="drawer-content flex items-center justify-between h-20 px-4">
						<Link to="/" className="shrink-0 transition-transform active:scale-95">
							<img src={Logo} alt="HermandApp" className="h-8 w-auto mix-blend-multiply" />
						</Link>

						<label
							htmlFor="main-drawer"
							className="p-2 -mr-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full cursor-pointer transition-colors"
						>
							<Bars3Icon className="h-7 w-7 stroke-[1.5px]" />
						</label>
					</div>

					<div className="drawer-side z-60">
						<label htmlFor="main-drawer" className="drawer-overlay bg-black/20 backdrop-blur-sm"></label>

						<aside className="w-[280px] sm:w-[320px] min-h-screen bg-white shadow-2xl flex flex-col pt-8 pb-6 px-6">
							<Link to="/" className="mb-8 block">
								<img src={Logo} alt="HermandApp" className="h-8 w-auto mix-blend-multiply" />
							</Link>

							{user && (
								<div className="flex items-center gap-4 mb-8 bg-gray-50 p-4 rounded-2xl border border-gray-100">
									<img
										src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
										className="w-12 h-12 rounded-full ring-2 ring-white shadow-sm object-cover"
										alt={user.name}
									/>
									<div className="overflow-hidden">
										<p className="font-bold text-gray-900 truncate">{user.name}</p>
										<p className="text-xs text-gray-500 font-medium truncate">
											{user.organization || "Usuario"}
										</p>
									</div>
								</div>
							)}

							<nav className="flex-1 flex flex-col gap-1">
								{!user ? (
									<>
										<Link
											to="/login"
											className="flex items-center gap-3 py-3.5 px-4 text-gray-600 hover:bg-gray-50 hover:text-[#8a01e5] rounded-xl font-medium transition-colors"
										>
											<ArrowRightStartOnRectangleIcon className="h-5 w-5" />
											Iniciar Sesión
										</Link>
										<Link
											to="/register"
											className="flex items-center gap-3 py-3.5 px-4 text-gray-600 hover:bg-gray-50 hover:text-[#8a01e5] rounded-xl font-medium transition-colors"
										>
											<UserGroupIcon className="h-5 w-5" />
											Solicitud de Registro
										</Link>
									</>
								) : (
									<>
										<Link
											to="/perfil"
											className="flex items-center gap-3 py-3.5 px-4 text-gray-600 hover:bg-gray-50 hover:text-[#8a01e5] rounded-xl font-medium transition-colors"
										>
											<UserIcon className="h-5 w-5" />
											Mi Perfil
										</Link>

										{user?.permissions?.can_access_admin && (
											<Link
												to="/admin-panel/dashboard"
												className="flex items-center gap-3 py-3.5 px-4 text-gray-600 hover:bg-gray-50 hover:text-[#8a01e5] rounded-xl font-medium transition-colors"
											>
												<CommandLineIcon className="h-5 w-5" />
												Panel Administración
											</Link>
										)}

										{user?.panel === 'gestor_banda' && (
											<Link
												to="/banda/panel/informacion"
												className="flex items-center gap-3 py-3.5 px-4 text-gray-600 hover:bg-gray-50 hover:text-[#8a01e5] rounded-xl font-medium transition-colors"
											>
												<MusicalNoteIcon className="h-5 w-5" />
												Panel de Banda
											</Link>
										)}

										{user?.panel === 'gestor_hermandad' && (
											<Link
												to="/hermandad/panel/informacion"
												className="flex items-center gap-3 py-3.5 px-4 text-gray-600 hover:bg-gray-50 hover:text-[#8a01e5] rounded-xl font-medium transition-colors"
											>
												<UserGroupIcon className="h-5 w-5" />
												Panel de Hermandad
											</Link>
										)}

										<button
											onClick={handleLogout}
											className="mt-6 flex items-center gap-3 py-3.5 px-4 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl font-medium transition-colors w-full text-left"
										>
											<ArrowRightStartOnRectangleIcon className="h-5 w-5" />
											Cerrar Sesión
										</button>
									</>
								)}
							</nav>
						</aside>
					</div>
				</div>

				{/* ===== DESKTOP NAVBAR ===== */}
				<div className="hidden md:flex h-20 items-center justify-between px-6 lg:px-8">
					<div className="shrink-0">
						<Link to="/" className="transition-transform hover:scale-105 active:scale-95 inline-block">
							<img src={Logo} className="h-8 w-auto mix-blend-multiply" alt="HermandApp" />
						</Link>
					</div>

					<div className="flex items-center gap-4 lg:gap-6">
						{!user ? (
							<div className="flex items-center gap-3">
								<Link
									to="/login"
									className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
								>
									Iniciar sesión
								</Link>
								<Link
									to="/register"
									className="px-6 py-2.5 text-sm font-bold text-white bg-gray-900 hover:bg-gray-800 rounded-full shadow-lg shadow-gray-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
								>
									Registro
								</Link>
							</div>
						) : (
							<div className="flex items-center gap-6">
								<div className="h-6 w-px bg-gray-200"></div>

								<Menu as="div" className="relative">
									<MenuButton className="flex items-center gap-3 rounded-full focus:outline-none p-1.5 pr-3 hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
										<img
											className="h-10 w-10 rounded-full object-cover border border-gray-100 shadow-sm"
											src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
											alt={user.name}
										/>
										<div className="flex flex-col items-start sr-only lg:not-sr-only">
											<span className="text-sm font-bold text-gray-900 max-w-[120px] truncate leading-tight">
												{user.name}
											</span>
											<span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
												Mi Cuenta
											</span>
										</div>
										<ChevronDownIcon className="h-4 w-4 text-gray-400 ml-1" aria-hidden="true" />
									</MenuButton>

									<MenuItems
										transition
										className="absolute right-0 mt-3 w-64 origin-top-right rounded-2xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] ring-1 ring-gray-100 focus:outline-none overflow-hidden transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0 data-closed:-translate-y-2"
									>
										<div className="p-4 bg-gray-50 border-b border-gray-100">
											<p className="text-sm font-bold text-gray-900 truncate">
												{user.name}
											</p>
											<p className="text-xs font-medium text-gray-500 truncate mt-1">
												{user.organization || "Usuario"}
											</p>
										</div>

										<div className="p-2 space-y-0.5">
											<MenuItem>
												<Link
													to="/perfil"
													className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl gap-3 text-gray-600 data-focus:bg-purple-50 data-focus:text-[#8a01e5] transition-colors"
												>
													<UserIcon className="h-5 w-5 text-gray-400 group-data-focus:text-[#8a01e5]" aria-hidden="true" />
													Mi Perfil
												</Link>
											</MenuItem>

											{user?.permissions?.can_access_admin && (
												<MenuItem>
													<Link
														to="/admin-panel/dashboard"
														className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl gap-3 text-gray-600 data-focus:bg-purple-50 data-focus:text-[#8a01e5] transition-colors"
													>
														<CommandLineIcon className="h-5 w-5 text-gray-400 group-data-focus:text-[#8a01e5]" aria-hidden="true" />
														Panel Administración
													</Link>
												</MenuItem>
											)}

											{user?.panel === 'gestor_banda' && (
												<MenuItem>
													<Link
														to="/banda/panel/informacion"
														className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl gap-3 text-gray-600 data-focus:bg-purple-50 data-focus:text-[#8a01e5] transition-colors"
													>
														<MusicalNoteIcon className="h-5 w-5 text-gray-400 group-data-focus:text-[#8a01e5]" aria-hidden="true" />
														Panel de Banda
													</Link>
												</MenuItem>
											)}

											{user?.panel === 'gestor_hermandad' && (
												<MenuItem>
													<Link
														to="/hermandad/panel/informacion"
														className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl gap-3 text-gray-600 data-focus:bg-purple-50 data-focus:text-[#8a01e5] transition-colors"
													>
														<UserGroupIcon className="h-5 w-5 text-gray-400 group-data-focus:text-[#8a01e5]" aria-hidden="true" />
														Panel de Hermandad
													</Link>
												</MenuItem>
											)}
										</div>

										<div className="p-2 border-t border-gray-100 bg-gray-50/50">
											<MenuItem>
												<button
													onClick={handleLogout}
													className="group flex w-full items-center px-3 py-2.5 text-sm font-medium rounded-xl gap-3 text-red-600 data-focus:bg-red-50 data-focus:text-red-700 transition-colors"
												>
													<ArrowRightStartOnRectangleIcon className="h-5 w-5 text-red-400 group-data-focus:text-red-500" aria-hidden="true" />
													Cerrar Sesión
												</button>
											</MenuItem>
										</div>
									</MenuItems>
								</Menu>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
