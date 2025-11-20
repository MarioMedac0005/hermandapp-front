import { Route, Routes } from "react-router-dom";
import AdminLayout from "@layouts/AdminLayout";
import GuestLayout from "@layouts/GuestLayout";
import Busqueda from "@pages/busqueda/busqueda";
import HermandadInicio from "@pages/hermandades/panel/HermandadInicio";
import HermandadesForm from "@pages/hermandades/HermandadesForm";
import UserList from "@pages/admin/users/UserList";
import UserForm from "@pages/admin/users/UserForm";
import HermandadPerfil from "./pages/perfil/hermandad/HermandadPerfil";
import BandaPerfil from "./pages/perfil/banda/BandaPerfil";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GuestLayout />}>
        <Route path="busqueda" element={<Busqueda />} />
        <Route path="hermandades/panel" element={<HermandadInicio />} />
        <Route
          path="hermandades/contratatos/crear"
          element={<HermandadesForm />}
        />
        <Route path="perfil/hermandad" element={<HermandadPerfil />} />
        <Route path="perfil/banda" element={<BandaPerfil />} />
      </Route>
      {/* Rutas para el panel de administracion nuestro */}
      <Route path="/admin-panel" element={<AdminLayout />}>
        <Route path="users" element={<UserList />} />
        <Route path="users/create" element={<UserForm />} />
      </Route>
    </Routes>
  );
}

export default App;
