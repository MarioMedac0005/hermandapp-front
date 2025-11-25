import { Link } from "react-router-dom";
import Table from "@components/Table";

function AvailabilityList() {
  const entidad = "availabilities";

  const columnas = [
    {
      key: "date",
      label: "Fecha",
    },
    {
      key: "status",
      label: "Estado",
    },
    {
      key: "description",
      label: "Descripción",
    },
    {
      key: "band_id",
      label: "ID Banda",
    },
    {
      key: "created_at",
      label: "Fecha de Creación",
    },
  ];

  const data = [
    {
      id: 1,
      date: "2024-04-05 10:00:00",
      status: "free",
      description: "Disponibilidad para la banda en la mañana",
      band_id: 1,
      created_at: "2024-01-10",
    },
    {
      id: 2,
      date: "2024-04-06 14:00:00",
      status: "occupied",
      description: "Ocupada por evento especial",
      band_id: 2,
      created_at: "2024-02-15",
    },
    {
      id: 3,
      date: "2024-04-07 16:00:00",
      status: "free",
      description: "Disponible para cualquier evento",
      band_id: 3,
      created_at: "2024-03-05",
    },
    {
      id: 4,
      date: "2024-04-08 18:00:00",
      status: "occupied",
      description: "Ocupada por concierto de la banda",
      band_id: 4,
      created_at: "2024-04-01",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold -mt-3 mb-2">Disponibilidades</h1>
      <div className="flex gap-4 flex-wrap justify-between items-center mb-4 text-xs">
        <label className="input input-sm">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            required
            placeholder="Search"
          />
        </label>
        <Link to="/admin-panel/availabilities/create">
          <button type="button" className="btn btn-sm">
            Crear una disponibilidad
          </button>
        </Link>
      </div>
      <Table columns={columnas} data={data} entity={entidad} />
    </div>
  );
}

export default AvailabilityList;
