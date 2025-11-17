import Table from "@components/Table";
import { Link } from "react-router-dom";

function UserList() {
  const entidad = "usuario";

  const columnas = [
    {
      key: "name",
      label: "Nombre",
    },
    {
      key: "surname",
      label: "Apellidos",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "type",
      label: "Rol",
    },
    {
      key: "band_id",
      label: "Banda",
    },
    {
      key: "brotherhood_id",
      label: "Hermandad",
    },
    {
      key: "created_at",
      label: "Fecha de Creación",
    },
  ];

  const data = [
    {
      id: 1,
      name: "Juan",
      surname: "Pérez",
      email: "juan.perez@example.com",
      type: "band_admin",
      band_id: 3,
      brotherhood_id: 7,
      created_at: "2024-01-10",
    },
    {
      id: 2,
      name: "Ana",
      surname: "Gómez",
      email: "ana.gomez@example.com",
      type: "brotherhood_admin",
      band_id: 2,
      brotherhood_id: 5,
      created_at: "2024-02-22",
    },
    {
      id: 3,
      name: "Carlos",
      surname: "López",
      email: "carlos.lopez@example.com",
      type: "guest",
      band_id: 1,
      brotherhood_id: 1,
      created_at: "2024-03-18",
    },
    {
      id: 4,
      name: "Lucía",
      surname: "Rodríguez",
      email: "lucia.rodriguez@example.com",
      type: "guest",
      band_id: 5,
      brotherhood_id: 3,
      created_at: "2024-04-30",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold -mt-3 mb-2">Usuarios</h1>
      <div className="flex gap-4 flex-wrap justify-between items-center mb-4">
        <label className="input">
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
          <input type="search" required placeholder="Search" />
        </label>
        <Link to="/admin-panel/users/create">
          <button
            type="button"
            className="btn"
          >
            Crear un usuario
          </button>
        </Link>
      </div>
      <Table columns={columnas} data={data} entity={entidad} />
    </div>
  );
}

export default UserList;
