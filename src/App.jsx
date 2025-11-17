import { Route, Routes } from "react-router-dom";
import AdminLayout from "@layouts/AdminLayout";
import UserList from "@pages/admin/users/UserList";
import UserForm from "@pages/admin/users/UserForm";
import BandList from "@pages/admin/bands/BandList";
import BandForm from "@pages/admin/bands/BandForm";
import BrotherhoodList from "@pages/admin/brotherhoods/BrotherhoodList";
import BrotherhoodForm from "@pages/admin/brotherhoods/BrotherhoodForm";

function App() {
  return (
    <Routes>
      {/* Rutas para el panel de administracion nuestro */}
      <Route path="/admin-panel" element={<AdminLayout />}>
        <Route path="users" element={<UserList />} />
        <Route path="users/create" element={<UserForm />} />
        <Route path="bands" element={<BandList />} />
        <Route path="bands/create" element={<BandForm />} />
        <Route path="brotherhoods" element={<BrotherhoodList />} />
        <Route path="brotherhoods/create" element={<BrotherhoodForm />} />
      </Route>
    </Routes>
  );
}

export default App;
