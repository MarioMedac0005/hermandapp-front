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
        <div className="flex items-center px-2 py-1 rounded-md bg-white border border-gray-300 overflow-hidden max-w-xs w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192.904 192.904"
            className="fill-gray-600 mr-2 w-3 h-3"
          >
            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
          </svg>
          <input
            type="email"
            placeholder="Search apps..."
            className="w-full outline-none bg-transparent text-slate-600 text-sm placeholder:text-xs"
          />
        </div>
        <Link
          to='/admin-panel/users/create'
        >
          <button
            type="button"
            className="text-slate-900 font-medium flex items-center px-3 py-1 rounded-md bg-white hover:bg-gray-50 border border-gray-300 overflow-hidden cursor-pointer text-xs hover:scale-105 transition"
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
