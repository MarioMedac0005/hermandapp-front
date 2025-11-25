function Busqueda() {
  const provincias = [
    { id: 1, nombre: "Almería" },
    { id: 2, nombre: "Cádiz" },
    { id: 3, nombre: "Córdoba" },
    { id: 4, nombre: "Granada" },
    { id: 5, nombre: "Huelva" },
    { id: 6, nombre: "Jaén" },
    { id: 7, nombre: "Málaga" },
    { id: 8, nombre: "Sevilla" },
  ];

  const tipoBanda = [
    { id: 1, tipo: "Agrupación Musical" },
    { id: 2, tipo: "Banda de Cornetas y Tambores" },
    { id: 3, tipo: "Banda de Música" },
  ];

  return (
    <>
      <form className="w-full mt-4">
        <div className="flex w-full gap-2">
          <input className="input input-sm flex-1" placeholder="Search" />

          <select className="select select-sm w-48">
            <option value="" disabled>
              Provincia
            </option>
            {provincias.map((prov) => (
              <option key={prov.id} value={prov.nombre}>
                {prov.nombre}
              </option>
            ))}
          </select>

          <select className="select select-sm w-48">
            <option value="" disabled>
              Tipo
            </option>
            {tipoBanda.map((tipo) => (
              <option key={tipo.id} value={tipo.tipo}>{tipo.tipo}</option>
            ))}
          </select>

          <button type="submit" className="btn btn-sm">
            Search
          </button>
        </div>
      </form>
    </>
  );
}

export default Busqueda;
