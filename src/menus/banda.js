import { DocumentTextIcon, UserIcon } from "@heroicons/react/24/outline";

const menuBanda = [
  {
    title: "Principal",
    items: [
      { name: "Mi Perfil", icon: UserIcon, href: "/banda/panel/informacion" },
      { name: "Disponibilidad", icon: DocumentTextIcon, href: "/banda/panel/disponibilidad" },
    ]
  },
  {
    title: "Gestión",
    items: [
      { 
        name: "Contratos", 
        icon: DocumentTextIcon, 
        submenu: [
            { name: "Todos", href: "/banda/panel/contratos" },
            { name: "Pendientes", href: "/banda/panel/contratos-pendientes" },
            { name: "Por Firmar", href: "/banda/panel/contratos-por-firmar" },
        ]
      },
    ]
  }
];

export default menuBanda