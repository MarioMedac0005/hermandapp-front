import {
  MagnifyingGlassIcon,
  UserIcon,
  MapIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const hermandadMenu = [
  {
    title: "Principal",
    items: [
      { name: "Mi Perfil", icon: UserIcon, href: "/hermandad/panel/informacion" },
      { name: "Contratos", icon: DocumentTextIcon, href: "/hermandad/panel/contratos" },
      { name: "Procesiones", icon: MapIcon, href: "/hermandad/panel/procesiones" },
      { name: "Buscar Banda", icon: MagnifyingGlassIcon, href: "/busqueda" },
    ]
  }
];

// Re-reading step 75, I see MagnifyingGlassIcon imported but not used. Maybe it was intended for Search?
// "Buscar Banda" is a route. User might want it in menu?
// The user didn't ask to change hermandad menu content, just structure.
// I'll stick to what was there: Profile and Contracts.

export default hermandadMenu;