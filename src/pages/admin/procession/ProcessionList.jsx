import { Link } from "react-router-dom";
import Table from "@components/Table";

function ProcessionList() {
  const entidad = "processions";

  const columnas = [
    {
      key: "name",
      label: "Nombre",
    },
    {
      key: "type",
      label: "Tipo",
    },
    {
      key: "itinerary",
      label: "Itinerario",
    },
    {
      key: "checkout_time",
      label: "Hora de Salida",
    },
    {
      key: "checkin_time",
      label: "Hora de Entrada",
    },
    {
      key: "brotherhood_id",
      label: "ID Hermandad",
    },
    {
      key: "created_at",
      label: "Fecha de Creación",
    },
  ];

  const data = [
    {
      id: 1,
      name: "Procesión del Gran Poder",
      type: "christ",
      itinerary: "Calle Feria, Plaza Mayor, Catedral",
      checkout_time: "2024-03-28 18:00:00",
      checkin_time: "2024-03-28 22:30:00",
      brotherhood_id: 1,
      created_at: "2024-01-12",
    },
    {
      id: 2,
      name: "Procesión de la Macarena",
      type: "virgin",
      itinerary: "Plaza de la Esperanza, Calle Real, Iglesia Mayor",
      checkout_time: "2024-03-29 19:00:00",
      checkin_time: "2024-03-29 23:45:00",
      brotherhood_id: 2,
      created_at: "2024-02-03",
    },
    {
      id: 3,
      name: "Procesión del Silencio",
      type: "christ",
      itinerary: "Calle de la Cruz, Plaza del Silencio, Parroquia Central",
      checkout_time: "2024-03-30 21:00:00",
      checkin_time: "2024-03-31 01:00:00",
      brotherhood_id: 3,
      created_at: "2024-03-01",
    },
    {
      id: 4,
      name: "Procesión de Jesús Nazareno",
      type: "christ",
      itinerary: "Avenida de Andalucía, Plaza Nueva, Santuario Nazareno",
      checkout_time: "2024-03-31 18:45:00",
      checkin_time: "2024-03-31 23:00:00",
      brotherhood_id: 4,
      created_at: "2024-03-15",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold -mt-3 mb-2">Procesiones</h1>
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
            className="placeholder:text-xs"
          />
        </label>
        <Link to="/admin-panel/processions/create">
          <button type="button" className="btn btn-sm">
            Crear una procesion
          </button>
        </Link>
      </div>
      <Table columns={columnas} data={data} entity={entidad} />
    </div>
  );
}

export default ProcessionList;
