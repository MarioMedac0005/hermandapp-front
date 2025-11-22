import { HomeIcon, BuildingLibraryIcon, CalendarDaysIcon, DocumentTextIcon, MapPinIcon, MusicalNoteIcon, UserIcon } from "@heroicons/react/24/outline";

const adminMenu = [
  { name: "Escritorio", icon: HomeIcon, href: "/admin-panel/dashboard" },
  { name: "Usuarios", icon: UserIcon, href: "/admin-panel/users" },
  { name: "Bandas", icon: MusicalNoteIcon, href: "/admin-panel/bands" },
  {
    name: "Hermandades",
    icon: BuildingLibraryIcon,
    href: "/admin-panel/brotherhoods",
  },
  { name: "Contratos", icon: DocumentTextIcon, href: "/admin-panel/contracts" },
  {
    name: "Disponibilidad",
    icon: CalendarDaysIcon,
    href: "/admin-panel/availabilities",
  },
  {
    name: "Procesiones",
    icon: MapPinIcon,
    href: "/admin-panel/processions",
  },
];

export default adminMenu