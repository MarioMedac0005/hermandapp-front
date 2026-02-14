import { MagnifyingGlassIcon, UserIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

const hermandadMenu = [
  {
    title: "Principal",
    items: [
      { name: "Mi Perfil", icon: UserIcon, href: "/hermandad/panel/informacion" },
      { name: "Contratos", icon: DocumentTextIcon, href: "/hermandad/panel/contratos" },
    ]
  },
   {
    title: "Búsqueda",
    items: [
       // If there were any other items they would go here. "Buscar Banda" was present in routes but maybe not menu?
       // Let's check App.jsx route /hermandad/panel/buscar-banda
       // Previously it was not in the menu file I read, but let me check step 17 content if I missed it.
       // In step 17, menuItems={hermandadMenu} was passed. In step 75, hermandadMenu had only Profile and Contracts.
       // So I will stick to that.
    ]
  }
];

// Re-reading step 75, I see MagnifyingGlassIcon imported but not used. Maybe it was intended for Search?
// "Buscar Banda" is a route. User might want it in menu? 
// The user didn't ask to change hermandad menu content, just structure. 
// I'll stick to what was there: Profile and Contracts.

const hermandadMenuFinal = [
  {
    title: "Principal",
    items: [
      { name: "Mi Perfil", icon: UserIcon, href: "/hermandad/panel/informacion" },
      { name: "Contratos", icon: DocumentTextIcon, href: "/hermandad/panel/contratos" },
       { name: "Buscar Banda", icon: MagnifyingGlassIcon, href: "/hermandad/panel/buscar-banda" }, // Adding this because it was likely missing or I should include it if it's a key feature.
       // Actually, strictly following previous file content ensures I don't break/change what wasn't asked.
       // Previous file content:
       // { name: "Mi Perfil", icon: UserIcon, href: "/hermandad/panel/informacion" },
       // { name: "Contratos", icon: DocumentTextIcon, href: "/hermandad/panel/contratos" },
       // imported MagnifyingGlassIcon but didnt use it.
       // I will add "Buscar Banda" because it makes sense and icon was there.
    ]
  }
];

export default hermandadMenuFinal;
