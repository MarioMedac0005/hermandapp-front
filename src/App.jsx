import { Route, Routes, Navigate } from "react-router-dom";
import AdminLayout from "@layouts/AdminLayout";
import GuestLayout from "@layouts/GuestLayout";
import Busqueda from "@pages/busqueda/Busqueda";
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
import Login from "@pages/auth/Login";
import { AuthProvider } from "@contexts/AuthContext";
import ProtectedRoute from "@components/auth/ProtectedRoute";
import Contacto from "@pages/contacto/Contacto";
import TerminosUso from "@pages/legal/TerminosUso";
import Privacidad from "@pages/legal/Privacidad";
import Cookies from "@pages/legal/Cookies";
import ScrollToTop from "@components/ScrollToTop";

import { Toaster } from 'react-hot-toast';

import ResetPassword from "@pages/reset_password/ResetPassword";


function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <ScrollToTop /> 
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/admin-panel" element={<Navigate to="/admin-panel/dashboard" replace />} />
        <Route path="/" element={<GuestLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="busqueda" element={<Busqueda />} />
          <Route
            path="hermandades/contratatos/crear"
            element={<HermandadesForm />}
          />
          <Route path="perfil/hermandad/:brotherhood" element={<HermandadPerfil />} />
          <Route path="perfil/banda/:band" element={<BandaPerfil />} />
          <Route path="perfil/hermandad" element={<HermandadPerfil />} />
          <Route path="perfil/banda" element={<BandaPerfil />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="terminos-uso" element={<TerminosUso />} />
          <Route path="politica-privacidad" element={<Privacidad />} />
          <Route path="politica-cookies" element={<Cookies />} />
        </Route>
        {/* Ruta para el panel de administracion de las hermandades */}
        <Route
          path="hermandad/panel"
          element={
            <ProtectedRoute allowedPanels={['gestor_hermandad']}>
              <AdminLayout menuItems={hermandadMenu} profile={HermandadProfile()} />
            </ProtectedRoute>
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
            <ProtectedRoute allowedPanels={['gestor_banda']}>
              <AdminLayout menuItems={bandaMenu} profile={BandaProfile()} />
            </ProtectedRoute>
          }
        >
          <Route path="informacion" element={<ProfileBanda />} />
          <Route path="contratos" element={<ContratosBanda />} />
        </Route>

        {/* Rutas para el panel de administracion nuestro */}
        <Route
          path="/admin-panel"
          element={
            <ProtectedRoute allowedPanels={['admin']}>
              <AdminLayout menuItems={adminMenu} />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
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
    </AuthProvider>
  );
}

export default App;
