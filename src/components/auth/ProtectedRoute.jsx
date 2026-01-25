import { useAuth } from "@contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, allowedPanels = [] }) {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
     // You might want to render a loading spinner here
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login page, but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has access to this panel
  if (allowedPanels.length > 0 && !allowedPanels.includes(user?.panel)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
