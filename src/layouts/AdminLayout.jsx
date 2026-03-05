import Sidebar from "@components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { stripeService } from "../services/stripeService";
import { cn } from "@/lib/utils";

function AdminLayout({ menuItems, profile: staticProfile, children }) {
  const location = useLocation();
  const { user, login } = useAuth();

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


  // Check Stripe account status when entering the panel
  // We use user.band.id as dependency so it runs once when the band is loaded.
  // We do NOT include 'user' or 'profile' to avoid infinite loops if we update the user object.
  useEffect(() => {
    if (user?.band?.id) {
      const checkStripeStatus = async () => {
        try {
          const status = await stripeService.checkAccountStatus();

          if (status.success && status.onboarding_completed !== user.band.stripe_onboarding_completed) {

            const updatedUser = {
              ...user,
              band: {
                ...user.band,
                stripe_onboarding_completed: status.onboarding_completed
              }
            };

            // Updates global state
            await login(localStorage.getItem('token'), updatedUser);
          }
        } catch (error) {
          console.error("Stripe status check failed", error);
        }
      };

      checkStripeStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.band?.id]);
  const isGisRoute = location.pathname.includes('crear-procesion') || location.pathname.includes('editar-procesion');

  if (location.pathname === '/perfil') {
    return children || <Outlet />;
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col md:flex-row overflow-hidden relative">
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
