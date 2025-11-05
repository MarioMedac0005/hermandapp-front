import { useState } from "react";
import {
  HomeIcon,
  MusicalNoteIcon,
  FolderOpenIcon,
  NewspaperIcon,
  UserIcon,
  CalendarDaysIcon,
  LightBulbIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import Logo from "../assets/img/logo.svg";

const menuItems = [
  { name: "Inicio", icon: HomeIcon, href: "#", active: false },
  { name: "Usuarios", icon: UserIcon, href: "#", active: false },
  { name: "Bandas", icon: MusicalNoteIcon, href: "#", active: false },
  { name: "Hermandades", icon: FolderOpenIcon, href: "#", active: true },
  { name: "Contratos", icon: NewspaperIcon, href: "#", active: false },
  { name: "Disponibilidad", icon: CalendarDaysIcon, href: "#", active: false },
  { name: "Procesiones", icon: LightBulbIcon, href: "#", active: false },
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* BOTÓN SUPERIOR EN MÓVIL */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <img src={Logo} alt="Logo" className="w-28" />
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <Bars3Icon className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* SIDEBAR PRINCIPAL */}
      <div
        className={`
          fixed md:static top-0 left-0 h-screen z-40 flex flex-col bg-white border-r border-[#e8e9ed] text-gray-800 text-[13px]
          transition-all duration-300
          ${collapsed ? "md:w-20" : "md:w-56"}
          ${
            mobileOpen
              ? "w-56 translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-gray-100">
          {!collapsed && (
            <img
              src={Logo}
              alt="Logo Cofradía"
              className="w-28 transition-all"
            />
          )}

          <div className="flex gap-1">
            {/* Botón colapsar en desktop */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:flex p-2 rounded-md hover:bg-gray-100 transition"
            >
              <Bars3Icon className="w-5 h-5 text-gray-700" />
            </button>

            {/* Botón cerrar en móvil */}
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
            >
              <XMarkIcon className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map(({ name, icon: Icon, href, active }) => (
            <a
              key={name}
              href={href}
              onClick={() => setMobileOpen(false)} // cerrar al hacer click en móvil
              className={`flex items-center gap-3 p-2 rounded-md transition ${
                active
                  ? "bg-purple-100 text-purple-700 font-medium"
                  : "hover:bg-gray-100"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="truncate">{name}</span>}
            </a>
          ))}
        </nav>
      </div>

      {/* BACKDROP OSCURO MÓVIL */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Sidebar;
