import { Link } from "react-router-dom";
import Table from "@components/Table";

function BrotherhoodList() {
  const entidad = "hermandad";

  const columnas = [
    {
      key: "name",
      label: "Nombre",
    },
    {
      key: "city",
      label: "Ciudad",
    },
    {
      key: "office",
      label: "Sede",
    },
    {
      key: "phone_number",
      label: "Teléfono",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "created_at",
      label: "Fecha de Creación",
    },
  ];

  const data = [
    {
      id: 1,
      name: "Hermandad del Gran Poder",
      city: "Sevilla",
      office: "Calle Feria 12",
      phone_number: "955-123-456",
      email: "granpoder@gmail.com",
      created_at: "2024-01-10",
    },
    {
      id: 2,
      name: "Hermandad de la Macarena",
      city: "Sevilla",
      office: "Plaza de la Esperanza 5",
      phone_number: "955-234-567",
      email: "macarena@gmail.com",
      created_at: "2024-02-22",
    },
    {
      id: 3,
      name: "Hermandad del Silencio",
      city: "Córdoba",
      office: "Calle de la Cruz 8",
      phone_number: "957-345-678",
      email: "silencio@gmail.com",
      created_at: "2024-03-18",
    },
    {
      id: 4,
      name: "Hermandad de Jesús Nazareno",
      city: "Málaga",
      office: "Avenida de Andalucía 20",
      phone_number: "952-456-789",
      email: "jesusnazareno@gmail.com",
      created_at: "2024-04-30",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold -mt-3 mb-2">Hermandades</h1>
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
          <input type="search" required placeholder="Search" className="placeholder:text-xs"/>
        </label>
        <Link to="/admin-panel/brotherhoods/create">
          <button
            type="button"
            className="btn btn-sm"
          >
            Crear una hermandad
          </button>
        </Link>
      </div>
      <Table columns={columnas} data={data} entity={entidad} />
    </div>
  );
}

export default BrotherhoodList;
