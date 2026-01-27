import DashboardCards from "../../../components/DashboardCards";
import { useDashboardCards } from "../../../hooks/useDashboardCards";

function Dashboard() {
  const { cards, loading, error } = useDashboardCards();



  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <DashboardCards cards={cards} />
    </div>
  );
}

export default Dashboard;
