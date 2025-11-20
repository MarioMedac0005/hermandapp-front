import { Link } from "react-router-dom";
import Table from "@components/Table";

function BandList() {
  const entidad = "banda";

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
      key: "rehearsal_space",
      label: "Lugar de Ensayo",
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
      name: "Banda de Cornetas y Tambores Santa Cecilia",
      city: "Sevilla",
      rehearsal_space: "Calle San Luis 42",
      email: "santacecilia@gmail.com",
      created_at: "2024-01-15",
    },
    {
      id: 2,
      name: "Agrupación Musical Cristo del Amor",
      city: "Córdoba",
      rehearsal_space: "Av. de la Paz 10",
      email: "cristodelamor@gmail.com",
      created_at: "2024-02-05",
    },
    {
      id: 3,
      name: "Banda de Música Virgen del Rosario",
      city: "Granada",
      rehearsal_space: "Plaza Nueva 8",
      email: "virgendelrosario@gmail.com",
      created_at: "2024-03-20",
    },
    {
      id: 4,
      name: "Banda de Cornetas y Tambores La Estrella",
      city: "Málaga",
      rehearsal_space: "Calle Larios 25",
      email: "laestrella@gmail.com",
      created_at: "2024-04-02",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold -mt-3 mb-2">Bandas</h1>
      <div className="flex gap-4 flex-wrap justify-between items-center mb-4">
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
          <input type="search" required placeholder="Search" />
        </label>
        <Link to="/admin-panel/bands/create">
          <button type="button" className="btn btn-sm">
            Crear una banda
          </button>
        </Link>
      </div>
      <Table columns={columnas} data={data} entity={entidad} />
    </div>
  );
}

export default BandList;
