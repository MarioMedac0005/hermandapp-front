import Sidebar from "@components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function AdminLayout({ menuItems, profile: staticProfile, children }) {
  const location = useLocation();
  const { user } = useAuth();

  let profile = staticProfile;

  // If no static profile is provided, or if we want to prefer user entity data:
  // We can check the route or the user roles to decide what to show.
  // The user asked: "when I am manager of a band or brotherhood, show band/brotherhood name and photo"
  
  if (user) {
      if (user.band) {
          profile = {
              nombre: user.band.name, 
              logo: user.band.profile_image?.url || user.avatar || null
          };
      } else if (user.brotherhood) {
          profile = {
              nombre: user.brotherhood.name,
              logo: user.brotherhood.profile_image?.url || user.avatar || null
          };
      } else if (!profile) {
          // Fallback to user if no entity and no static profile
           profile = {
              nombre: user.name,
              logo: user.avatar || null
          };
      }
  }

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
