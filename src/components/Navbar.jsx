import { Link, useNavigate } from "react-router-dom";
import Logo from "@assets/img/logo.svg";
import { useAuth } from "@contexts/AuthContext";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  UserIcon,
  ArrowRightStartOnRectangleIcon,
  CommandLineIcon,
  ChevronDownIcon
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
      {/* ===== DESKTOP NAVBAR ===== */}
      <div className="navbar bg-white shadow-sm px-6 hidden md:flex h-16 border-b border-gray-100 justify-between items-center z-50 relative">
        <div className="navbar-start">
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-28" />
          </Link>
        </div>

        <div className="navbar-end flex items-center gap-4">
          {!user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-all shadow-sm hover:shadow"
              >
                Registrarse
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
