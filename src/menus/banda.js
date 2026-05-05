import { DocumentTextIcon, UserIcon, MusicalNoteIcon, PhotoIcon } from "@heroicons/react/24/outline";

const menuBanda = [
  {
    title: "Principal",
    items: [
      { name: "Perfil de la Banda", icon: UserIcon, href: "/banda/panel/informacion" },
      { name: "Disponibilidad", icon: DocumentTextIcon, href: "/banda/panel/disponibilidad" },
    ]
  },
  {
    title: "Gestión",
    items: [
      { 
        name: "Contratos", 
        icon: DocumentTextIcon, 
        href: "/banda/panel/contratos" 
      },
      {
        name: "Repertorio",
        icon: MusicalNoteIcon,
        href: "/banda/panel/repertorio"
      },
      {
        name: "Galería",
        icon: PhotoIcon,
        href: "/banda/panel/galeria"
      },
    ]
  }
];

export default menuBanda