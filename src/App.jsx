import { Route, Routes } from "react-router-dom"
import AdminLayout from "@layouts/AdminLayout"
import UserList from '@pages/admin/users/UserList'
import UserForm from '@pages/admin/users/UserForm'

function App() {
  return (
    <Routes>
      {/* Rutas para el panel de administracion nuestro */}
      <Route path="/admin-panel" element={<AdminLayout />}>
        <Route path="users" element={<UserList />}/>
        <Route path="users/create" element={<UserForm />}/>
      </Route>
    </Routes>
  )
}

export default App