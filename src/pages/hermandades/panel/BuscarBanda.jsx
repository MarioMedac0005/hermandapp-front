import Header from "../../../components/panel-hermandad/buscar-banda/Header";
import Busqueda from "../../../components/panel-hermandad/buscar-banda/Busqueda";
import CardBusqueda from "../../../components/busqueda/CardBusqueda";
import Pagination from "../../../components/Pagination";

function BuscarBanda() {
  return (
    <>
      <Header />
      <Busqueda />

      <section
        className="
          grid gap-2 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-3 
          py-6
          sm:max-h-[50vh]
          md:max-h-[55vh]
          lg:max-h-[60vh]
          xl:max-h-[65vh]

          overflow-y-auto
        "
      >
        <CardBusqueda className="h-40 sm:h-44 md:h-48 lg:h-48" />
        <CardBusqueda className="h-40 sm:h-44 md:h-48 lg:h-48" />
        <CardBusqueda className="h-40 sm:h-44 md:h-48 lg:h-48" />
        <CardBusqueda className="h-40 sm:h-44 md:h-48 lg:h-48" />
        <CardBusqueda className="h-40 sm:h-44 md:h-48 lg:h-48" />
        <CardBusqueda className="h-40 sm:h-44 md:h-48 lg:h-48" />
        <CardBusqueda className="h-40 sm:h-44 md:h-48 lg:h-48" />
      </section>

      <div className="mt-4">
        <Pagination />
      </div>
    </>
  );
}

export default BuscarBanda;
