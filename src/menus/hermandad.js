import {
  UserIcon,
  MapIcon,
  DocumentTextIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

const hermandadMenu = [
  {
    title: "Principal",
    items: [
      { name: "Perfil Hermandad", icon: UserIcon, href: "/hermandad/panel/informacion" },
      { name: "Contratos", icon: DocumentTextIcon, href: "/hermandad/panel/contratos" },
      { name: "Procesiones", icon: MapIcon, href: "/hermandad/panel/procesiones" },
      { name: "Galería", icon: PhotoIcon, href: "/hermandad/panel/galeria" },
    ]
  }
];

export default hermandadMenu;