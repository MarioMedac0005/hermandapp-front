import CardBusqueda from "./CardBusqueda";

export default function BusquedaResultsGrid({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <CardBusqueda key={item.id} data={item} />
      ))}
    </div>
  );
}
