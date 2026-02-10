import Sidebar from "@components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";

function AdminLayout({ menuItems, profile, children }) {
  const location = useLocation();

  if (location.pathname === '/perfil') {
    return children || <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <Sidebar menuItems={menuItems} profile={profile} />

      <main
        className="
          flex-1 
          w-full 
          p-4 sm:p-6 md:p-8 
          overflow-y-auto 
          md:ml-0
          transition-all
          bg-gray-50
        "
      >
        <div className="max-w-6xl mx-auto w-full">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
