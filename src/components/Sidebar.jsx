import { useState } from "react";
import { Bars3Icon, XMarkIcon, ArrowLeftStartOnRectangleIcon, HomeIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import Logo from "@assets/img/logo.png";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Sidebar({ menuItems, profile }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const urlActive = useLocation();
  const { logout } = useAuth();

  const toggleSubmenu = (name) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const isLinkActive = (href) => {
      // Exact match for root or specific paths
      if (href === "/admin-panel") return urlActive.pathname === href;
      // Prevent /contratos from matching /contratos-pendientes by checking matching segment
      if (href === urlActive.pathname) return true;
      return urlActive.pathname.startsWith(href + '/');
  };

  // Helper handling legacy flat structure if necessary (though we migrated all)
  const standardizedMenu = Array.isArray(menuItems) && menuItems[0]?.items 
    ? menuItems 
    : [{ title: "", items: menuItems }];

  return (
    <>
      {/* BOTÓN SUPERIOR EN MÓVIL */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-[#e8e9ed]">
        <Link to="/admin-panel/dashboard">
          <img src={Logo} alt="Logo" className="w-28" />
        </Link>
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
          fixed md:sticky top-0 left-0 h-screen z-40 flex flex-col bg-white border-r border-[#e8e9ed] text-gray-800
          transition-all duration-300
          ${collapsed ? "md:w-20" : "md:w-64"}
          ${
            mobileOpen
              ? "w-64 translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-[#e8e9ed]">
          {!collapsed && (
            <Link to='/admin-panel/dashboard'>
              <img
                src={Logo}
                alt="Logo Cofradía"
                className="w-28 transition-all"
              />
            </Link>
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
        <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
          {/* PERFIL */}
          {profile && !collapsed && (
            <div className="flex items-center gap-3 px-4 pt-3 pb-6 my-2 border-b border-gray-100">
              <img
                src={profile.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.nombre)}&background=random`}
                alt={profile.nombre}
                className="size-14 rounded-full object-cover"
              />
              <div className="flex flex-col gap-2">
                <span className="font-medium text-sm">{profile.nombre}</span>
                <span className="text-gray-500 text-[10px] uppercase tracking-wider">
                  Panel de Gestión
                </span>
              </div>
            </div>
          )}

          {standardizedMenu.map((section, sectionIdx) => (
             <div key={sectionIdx}>
                {section.title && !collapsed && (
                    <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        {section.title}
                    </h3>
                )}
                <ul className="space-y-1">
                    {section.items?.map((item, itemIdx) => {
                         const hasSubmenu = item.submenu && item.submenu.length > 0;
                         const Icon = item.icon;
                         // Check if any child is active
                         const isChildActive = hasSubmenu && item.submenu.some(sub => isLinkActive(sub.href));
                         const isActive = item.href ? isLinkActive(item.href) : false;
                         const isOpen = openSubmenus[item.name] || isChildActive; // Auto-open if active

                         if (hasSubmenu) {
                             return (
                                 <li key={itemIdx}>
                                     <button
                                        onClick={() => toggleSubmenu(item.name)}
                                        className={`w-full flex items-center justify-between gap-3 p-2 rounded-md transition cursor-pointer hover:bg-gray-100 ${
                                            isChildActive ? 'bg-purple-50 text-purple-700' : 'text-gray-700'
                                        }`}
                                     >
                                        <div className="flex items-center gap-3">
                                            {Icon && <Icon className="w-5 h-5 shrink-0" />}
                                            {!collapsed && <span className="text-[13px] font-normal">{item.name}</span>}
                                        </div>
                                        {!collapsed && (
                                            isOpen ? <ChevronUpIcon className="w-3 h-3" /> : <ChevronDownIcon className="w-3 h-3" />
                                        )}
                                     </button>
                                     
                                     {/* SUBMENU */}
                                     {isOpen && !collapsed && (
                                         <ul className="mt-1 ml-9 space-y-1">
                                             {item.submenu.map((sub, subIdx) => (
                                                 <li key={subIdx}>
                                                     <Link
                                                        to={sub.href}
                                                        onClick={() => setMobileOpen(false)}
                                                        className={`block p-2 text-[13px] rounded-md transition ${
                                                            isLinkActive(sub.href) 
                                                                ? "text-purple-700 bg-purple-100 font-normal" 
                                                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-normal"
                                                        }`}
                                                     >
                                                         {sub.name}
                                                     </Link>
                                                 </li>
                                             ))}
                                         </ul>
                                     )}
                                 </li>
                             );
                         }

                         return (
                            <li key={itemIdx}>
                                <Link
                                    to={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`flex items-center gap-3 p-2 rounded-md transition text-[13px] font-normal ${
                                    isActive
                                        ? "bg-purple-100 text-purple-700"
                                        : "hover:bg-gray-100 text-gray-700"
                                    } ${collapsed ? "justify-center" : ""}`}
                                >
                                    {Icon && <Icon className="w-5 h-5 shrink-0" />}
                                    {!collapsed && <span className="truncate">{item.name}</span>}
                                </Link>
                            </li>
                         );
                    })}
                </ul>
             </div>
          ))}
        </nav>

        {/* FOOTER ACTIONS */}
        <div className="p-4 border-t border-[#e8e9ed] space-y-1">
          {/* VOLVER A LA WEB */}
          <Link
            to="/"
            className={`flex items-center gap-3 p-2 rounded-md transition w-full text-left text-gray-600 hover:bg-gray-100 ${
              collapsed ? "justify-center" : ""
            }`}
            title="Volver a la web"
          >
            <HomeIcon className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="truncate font-normal text-[13px]">Volver a la web</span>}
          </Link>

          {/* LOGOUT */}
          <button
            onClick={logout}
            className={`flex items-center gap-3 p-2 rounded-md transition w-full text-left text-red-600 hover:bg-red-50 ${
              collapsed ? "justify-center" : ""
            }`}
            title="Cerrar Sesión"
          >
            <ArrowLeftStartOnRectangleIcon className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="truncate font-normal text-[13px]">Cerrar Sesión</span>}
          </button>
        </div>
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
