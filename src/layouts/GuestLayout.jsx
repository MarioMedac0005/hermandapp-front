import { Outlet } from "react-router-dom";
import Navbar from "@components/Navbar";

function GuestLayout() {
  return (
    <div>
      <Navbar></Navbar>
      <main>
        <Outlet /> {/* Aquí se renderiza HermandadesForm */}
      </main>
      <footer>Footer público</footer>
    </div>
  );
}

export default GuestLayout;
