import { MagnifyingGlassIcon, UserIcon, MapIcon } from "@heroicons/react/24/outline";
import {
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const hermandadMenu = [
  { name: "Mi Perfil", icon: UserIcon, href: "/hermandad/panel/informacion" },
  { name: "Perfil de Usuario", icon: UserIcon, href: "/perfil" },
  { name: "Contratos", icon: DocumentTextIcon, href: "/hermandad/panel/contratos" },
  {
    name: "Buscar Banda",
    icon: MagnifyingGlassIcon,
    href: "/hermandad/panel/buscar-banda",
  },
  {
    name: "Procesiones",
    icon: MapIcon,
    href: "/hermandad/panel/procesiones",
  },
];

export default hermandadMenu;
