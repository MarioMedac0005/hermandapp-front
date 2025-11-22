import { Route, Routes } from "react-router-dom";
import AdminLayout from "@layouts/AdminLayout";
import GuestLayout from "@layouts/GuestLayout";
import Busqueda from "@pages/busqueda/busqueda";
import HermandadInicio from "@pages/hermandades/panel/HermandadInicio";
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
import Dashboard from '@pages/admin/dashboard/Dashboard'
import LandingPage from "@pages/landing/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GuestLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="busqueda" element={<Busqueda />} />
        <Route path="hermandades/panel" element={<HermandadInicio />} />
        <Route path="hermandades/contratatos/crear" element={<HermandadesForm />} />
      </Route>
      {/* Rutas para el panel de administracion nuestro */}
      <Route path="/admin-panel" element={<AdminLayout />}>
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
