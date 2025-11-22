import { MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/outline";
import {
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const hermandadMenu = [
  { name: "Mi Perfil", icon: UserIcon, href: "/hermandad/panel/informacion" },
  { name: "Contratos", icon: DocumentTextIcon, href: "/hermandad/panel/contratos" },
  {
    name: "Buscar Banda",
    icon: MagnifyingGlassIcon,
    href: "/hermandad/panel/buscar-banda",
  },
];

export default hermandadMenu;
