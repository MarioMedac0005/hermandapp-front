import {
  UsersIcon,
  MusicalNoteIcon,
  MapPinIcon,
  BuildingLibraryIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline"

const cards = [
  {
    title: "Usuarios",
    value: "248",
    icon: UsersIcon,
    description: "Usuarios activos",
    href: "/usuarios",
  },
  {
    title: "Bandas",
    value: "42",
    icon: MusicalNoteIcon,
    description: "Bandas registradas",
    href: "/bandas",
  },
  {
    title: "Procesiones",
    value: "18",
    icon: MapPinIcon,
    description: "Procesiones programadas",
    href: "/procesiones",
  },
  {
    title: "Hermandades",
    value: "35",
    icon: BuildingLibraryIcon,
    description: "Hermandades activas",
    href: "/hermandades",
  },
  {
    title: "Disponibilidad",
    value: "156",
    icon: CalendarDaysIcon,
    description: "Días disponibles",
    href: "/disponibilidad",
  },
  {
    title: "Contratos",
    value: "64",
    icon: DocumentTextIcon,
    description: "Contratos activos",
    href: "/contratos",
  },
]

function DashboardCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <a
            key={card.title}
            href={card.href}
            className="group relative overflow-hidden rounded-2xl border border-purple-200 bg-white p-6 transition-all hover:border-purple-300 hover:shadow-lg hover:shadow-purple-200/50"
          >
            {/* Icon Container */}
            <div className="mb-4 inline-flex rounded-xl bg-purple-100 p-3 transition-colors group-hover:bg-purple-500">
              <Icon className="h-6 w-6 text-purple-600 transition-colors group-hover:text-white" />
            </div>

            {/* Content */}
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className="text-3xl font-semibold tracking-tight text-gray-900">{card.value}</p>
            </div>

            {/* Footer */}
            <div className="mt-4">
              <span className="text-sm text-gray-600">{card.description}</span>
            </div>

            {/* Hover Effect Border */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-purple-500 to-purple-300 opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
        )
      })}
    </div>
  )
}

export default DashboardCards;