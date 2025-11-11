import { Outlet } from "react-router-dom";

function GuestLayout() {
  return (
    <div>
      <header>Header público</header>
      <main>
        <Outlet /> {/* Aquí se renderiza HermandadesForm */}
      </main>
      <footer>Footer público</footer>
    </div>
  );
}

export default GuestLayout;
