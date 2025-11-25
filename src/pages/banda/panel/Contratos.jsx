import Table from "@components/Table";

function Contratos() {
  const entidad = "contracts";

  const columnas = [
    { key: "date", label: "Fecha del Contrato" },
    { key: "status", label: "Estado" },
    { key: "amount", label: "Coste" },
    { key: "description", label: "Descripción" },
    { key: "procession", label: "Procesión" },
    { key: "created_at", label: "Fecha de Creación" },
  ];

  const data = [
    {
      id: 1,
      date: "2024-03-28 18:30:00",
      status: "active",
      amount: 1200.0,
      description: "Procesión Jueves Santo - Banda acompañamiento acordado.",
      procession: "Jesús Nazareno",
      created_at: "2024-01-10",
    },
    {
      id: 2,
      date: "2024-03-29 21:00:00",
      status: "pending",
      amount: 900.0,
      description: "Marchas para procesión del Silencio.",
      procession: "Cristo del Silencio",
      created_at: "2024-02-01",
    },
    {
      id: 3,
      date: "2024-04-06 18:00:00",
      status: "expired",
      amount: 1100.0,
      description: "Contrato no renovado para procesión de la Esperanza.",
      procession: "Virgen de la Esperanza",
      created_at: "2023-12-21",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold -mt-3 mb-2">Contratos</h1>
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
        {/* <Link to="/admin-panel/bands/create">
          <button type="button" className="btn btn-sm">
            Crear una banda
          </button>
        </Link> */}
      </div>
      <Table columns={columnas} data={data} entity={entidad} />
    </div>
  );
}

export default Contratos;
