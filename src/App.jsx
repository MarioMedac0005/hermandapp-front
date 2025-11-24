import { Route, Routes } from "react-router-dom";
import AdminLayout from "@layouts/AdminLayout";
import GuestLayout from "@layouts/GuestLayout";
import Busqueda from "@pages/busqueda/busqueda";
import Informacion from "@pages/hermandades/panel/Informacion";
import ProfileBanda from "@pages/banda/panel/Perfil";
import HermandadesForm from "@pages/hermandades/HermandadesForm";
import UserList from "@pages/admin/users/UserList";
import UserForm from "@pages/admin/users/UserForm";
import BandList from "@pages/admin/bands/BandList";
import BandForm from "@pages/admin/bands/BandForm";
import BrotherhoodList from "@pages/admin/brotherhoods/BrotherhoodList";
import BrotherhoodForm from "@pages/admin/brotherhoods/BrotherhoodForm";
import ContractList from "@pages/admin/contracts/ContractList";
import ContractForm from "@pages/admin/contracts/ContractForm";
import AvailabilityList from "@pages/admin/availabilities/AvailabilityList";
import AvailabilityForm from "@pages/admin/availabilities/AvailabilityForm";
import ProcessionList from "@pages/admin/procession/ProcessionList";
import ProcessionForm from "@pages/admin/procession/ProcessionForm";
import Dashboard from "@pages/admin/dashboard/Dashboard";
import BuscarBanda from "@pages/hermandades/panel/BuscarBanda";
import adminMenu from "./menus/admin";
import hermandadMenu from "./menus/hermandad";
import bandaMenu from "./menus/banda";
import Contratos from "@pages/hermandades/panel/Contratos";
import ContratosBanda from "@pages/banda/panel/Contratos";
import HermandadProfile from "../src/services/HermandadProfile";
import BandaProfile from "../src/services/BandaProfile";
import HermandadPerfil from "./pages/perfil/hermandad/HermandadPerfil";
import BandaPerfil from "./pages/perfil/banda/BandaPerfil";
import LandingPage from "@pages/landing/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GuestLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="busqueda" element={<Busqueda />} />
        <Route
          path="hermandades/contratatos/crear"
          element={<HermandadesForm />}
        />
        <Route path="perfil/hermandad" element={<HermandadPerfil />} />
        <Route path="perfil/banda" element={<BandaPerfil />} />
      </Route>
      {/* Ruta para el panel de administracion de las hermandades */}
      <Route
        path="hermandad/panel"
        element={
          <AdminLayout menuItems={hermandadMenu} profile={HermandadProfile()} />
        }
      >
        <Route path="informacion" element={<Informacion />} />
        <Route path="buscar-banda" element={<BuscarBanda />} />
        <Route path="contratos" element={<Contratos />} />
      </Route>

      {/* Rutas para el panel de administracion de la banda */}
      <Route
        path="banda/panel"
        element={
          <AdminLayout menuItems={bandaMenu} profile={BandaProfile()} />
        }
      >
        <Route path="informacion" element={<ProfileBanda />} />
        <Route path="contratos" element={<ContratosBanda />} />
      </Route>

      {/* Rutas para el panel de administracion nuestro */}
      <Route
        path="/admin-panel"
        element={<AdminLayout menuItems={adminMenu} />}
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<UserList />} />
        <Route path="users/create" element={<UserForm />} />
        <Route path="bands" element={<BandList />} />
        <Route path="bands/create" element={<BandForm />} />
        <Route path="brotherhoods" element={<BrotherhoodList />} />
        <Route path="brotherhoods/create" element={<BrotherhoodForm />} />
        <Route path="contracts" element={<ContractList />} />
        <Route path="contracts/create" element={<ContractForm />} />
        <Route path="availabilities" element={<AvailabilityList />} />
        <Route path="availabilities/create" element={<AvailabilityForm />} />
        <Route path="processions" element={<ProcessionList />} />
        <Route path="processions/create" element={<ProcessionForm />} />
      </Route>
    </Routes>
  );
}

export default App;
