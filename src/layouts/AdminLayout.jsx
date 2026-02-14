import Sidebar from "@components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

function AdminLayout({ menuItems, profile, children }) {
  const location = useLocation();
  const isGisRoute = location.pathname.includes('crear-procesion') || location.pathname.includes('editar-procesion');

  if (location.pathname === '/perfil') {
    return children || <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row overflow-hidden">
      <Sidebar menuItems={menuItems} profile={profile} />

      <main
        className={cn(
          "flex-1 w-full bg-gray-50 transition-all",
          isGisRoute ? "p-0 overflow-hidden" : "p-4 sm:p-6 md:p-8 overflow-y-auto"
        )}
      >
        <div className={cn("mx-auto w-full", isGisRoute ? "max-w-none h-full" : "max-w-6xl")}>
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
