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
  UserGroupIcon
} from "@heroicons/react/24/outline";

function Navbar() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (loading && !user) {
    return (
      <div className="navbar bg-white shadow-sm px-6 h-16 flex items-center">
        <span className="text-sm text-gray-400">Cargando...</span>
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

              {user?.panel === 'gestor_banda' && (
                <li>
                  <Link to="/banda/panel/informacion">
                    Panel de Banda
                  </Link>
                </li>
              )}

              {user?.panel === 'gestor_hermandad' && (
                <li>
                  <Link to="/hermandad/panel/informacion">
                    Panel de Hermandad
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

        <div className="navbar-end flex items-center gap-4">
          {!user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-[#E9D5FF] rounded-lg transition-colors"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-all shadow-sm hover:shadow"
              >
                Solicitud de Registro
              </Link>
            </div>
          ) : (
            <Menu as="div" className="relative ml-3">
                <MenuButton className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 p-1 pr-2 hover:bg-gray-50 transition-colors">
                  <img
                    className="h-9 w-9 rounded-full object-cover border border-gray-200"
                    src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                    alt={user.name}
                  />
                  <div className="flex flex-col items-start sr-only sm:not-sr-only">
                    <span className="text-xs font-medium text-gray-700 max-w-[100px] truncate">
                      {user.name}
                    </span>
                  </div>
                  <ChevronDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100 transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
              >
                <div className="px-4 py-3">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    {user.organization}
                  </p>
                </div>

                <div className="py-1">
                  <MenuItem>
                    <Link
                      to="/perfil"
                      className="group flex items-center px-4 py-2 text-sm gap-3 text-gray-700 data-[focus]:bg-gray-50 data-[focus]:text-purple-700 transition-colors"
                    >
                      <UserIcon
                        className="h-5 w-5 text-gray-400 group-data-[focus]:text-purple-600"
                        aria-hidden="true"
                      />
                      Mi Perfil
                    </Link>
                  </MenuItem>

                  {user?.permissions?.can_access_admin && (
                    <MenuItem>
                      <Link
                        to="/admin-panel/dashboard"
                        className="group flex items-center px-4 py-2 text-sm gap-3 text-gray-700 data-[focus]:bg-gray-50 data-[focus]:text-purple-700 transition-colors"
                      >
                        <CommandLineIcon
                          className="h-5 w-5 text-gray-400 group-data-[focus]:text-purple-600"
                          aria-hidden="true"
                        />
                        Panel Administración
                      </Link>
                    </MenuItem>
                  )}

                  {user?.panel === 'gestor_banda' && (
                    <MenuItem>
                      <Link
                        to="/banda/panel/informacion"
                        className="group flex items-center px-4 py-2 text-sm gap-3 text-gray-700 data-[focus]:bg-gray-50 data-[focus]:text-purple-700 transition-colors"
                      >
                        <MusicalNoteIcon
                          className="h-5 w-5 text-gray-400 group-data-[focus]:text-purple-600"
                          aria-hidden="true"
                        />
                        Panel de Banda
                      </Link>
                    </MenuItem>
                  )}

                  {user?.panel === 'gestor_hermandad' && (
                    <MenuItem>
                      <Link
                        to="/hermandad/panel/informacion"
                        className="group flex items-center px-4 py-2 text-sm gap-3 text-gray-700 data-[focus]:bg-gray-50 data-[focus]:text-purple-700 transition-colors"
                      >
                        <UserGroupIcon
                          className="h-5 w-5 text-gray-400 group-data-[focus]:text-purple-600"
                          aria-hidden="true"
                        />
                        Panel de Hermandad
                      </Link>
                    </MenuItem>
                  )}
                </div>

                <div className="py-1">
                  <MenuItem>
                    <button
                      onClick={handleLogout}
                      className="group flex w-full items-center px-4 py-2 text-sm gap-3 text-gray-700 data-[focus]:bg-red-50 data-[focus]:text-red-700 transition-colors"
                    >
                      <ArrowRightStartOnRectangleIcon
                        className="h-5 w-5 text-gray-400 group-data-[focus]:text-red-500"
                        aria-hidden="true"
                      />
                      Cerrar Sesión
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
