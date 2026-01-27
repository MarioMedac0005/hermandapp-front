import {
  UsersIcon,
  MusicalNoteIcon,
  MapPinIcon,
  BuildingLibraryIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { useFetchData } from "./useFetchData";
import { API_ENDPOINTS } from "../config/api";

export const useDashboardCards = () => {
  const { data, loading, error } = useFetchData(API_ENDPOINTS.dashboard);

  const cards = data
    ? [
        {
          title: "Usuarios",
          value: data.users,
          icon: UsersIcon,
          description: "Usuarios activos",
          href: "/admin-panel/users",
        },
        {
          title: "Bandas",
          value: data.bands,
          icon: MusicalNoteIcon,
          description: "Bandas registradas",
          href: "/admin-panel/bands",
        },
        {
          title: "Procesiones",
          value: data.processions,
          icon: MapPinIcon,
          description: "Procesiones programadas",
          href: "/admin-panel/processions",
        },
        {
          title: "Hermandades",
          value: data.brotherhoods,
          icon: BuildingLibraryIcon,
          description: "Hermandades activas",
          href: "/admin-panel/brotherhoods",
        },
        {
          title: "Disponibilidad",
          value: data.availabilities,
          icon: CalendarDaysIcon,
          description: "Días disponibles",
          href: "/admin-panel/availabilities",
        },
        {
          title: "Contratos",
          value: data.contracts,
          icon: DocumentTextIcon,
          description: "Contratos activos",
          href: "/admin-panel/contracts",
        },
      ]
    : [];

  return { cards, loading, error };
};