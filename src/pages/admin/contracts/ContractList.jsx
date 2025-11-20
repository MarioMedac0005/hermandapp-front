import { Link } from "react-router-dom";
import Table from "@components/Table";

function ContractList() {
  const entidad = "contracts";

  const columnas = [
    {
      key: "name",
      label: "Nombre del Contrato",
    },
    {
      key: "type",
      label: "Tipo de Contrato",
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
      name: "Contrato de Procesión de Semana Santa",
      type: "christ",
      itinerary: "Calle Real, Plaza Mayor, Iglesia de San Juan",
      checkout_time: "2024-04-05 18:00:00",
      checkin_time: "2024-04-05 22:00:00",
      brotherhood_id: 1,
      created_at: "2024-01-15",
    },
    {
      id: 2,
      name: "Contrato de Procesión Virgen de la Esperanza",
      type: "virgin",
      itinerary:
        "Avenida de la Constitución, Plaza del Sol, Iglesia de la Esperanza",
      checkout_time: "2024-04-06 17:30:00",
      checkin_time: "2024-04-06 21:30:00",
      brotherhood_id: 2,
      created_at: "2024-02-10",
    },
    {
      id: 3,
      name: "Contrato Procesión del Silencio",
      type: "christ",
      itinerary: "Calle de la Paz, Plaza del Mar, Iglesia del Silencio",
      checkout_time: "2024-04-07 19:00:00",
      checkin_time: "2024-04-07 23:00:00",
      brotherhood_id: 3,
      created_at: "2024-03-12",
    },
    {
      id: 4,
      name: "Contrato Procesión de Jesús Nazareno",
      type: "christ",
      itinerary:
        "Avenida de Andalucía, Plaza de la Cruz, Iglesia de Jesús Nazareno",
      checkout_time: "2024-04-08 18:45:00",
      checkin_time: "2024-04-08 22:45:00",
      brotherhood_id: 4,
      created_at: "2024-04-01",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold -mt-3 mb-2">Contratos</h1>
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
        <Link to="/admin-panel/contracts/create">
          <button type="button" className="btn btn-sm">
            Crear un contrato
          </button>
        </Link>
      </div>
      <Table columns={columnas} data={data} entity={entidad} />
    </div>
  );
}

export default ContractList;
