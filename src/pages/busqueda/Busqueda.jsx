import { useMemo, useState } from "react";
import Pagination from "../../components/Pagination";
import BusquedaFilters from "../../components/busqueda/BusquedaFilters";
import BusquedaResultsGrid from "../../components/busqueda/BusquedaResultsGrid";

function Busqueda() {
  const [appliedFilters, setAppliedFilters] = useState({
    provincia: "",
    tipo: "",
    estilo: "",
  });
  //Esto luego vendria de la llamada a la API
  const allResults = useMemo(
    () => [
      { id: "1" },
      { id: "2" },
      { id: "3" },
      { id: "4" },
      { id: "5" },
    ],
    []
  );

  const filteredResults = useMemo(() => {
    return allResults.filter((r) => {
      // aquí aplicarías lógica real con provincia/tipo/estilo
      return true;
    });
  }, [allResults, appliedFilters]);

  return (
    <div className="mt-10 mx-5">
      <div className="grid grid-cols-1 md:grid-cols-[0.6fr_2fr] gap-8">
        <BusquedaFilters
          initialFilters={appliedFilters}
          onApply={setAppliedFilters}
        />

        <BusquedaResultsGrid items={filteredResults} />
      </div>

      <Pagination />
    </div>
  );
}

export default Busqueda;
