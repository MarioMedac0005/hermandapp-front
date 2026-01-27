import { createContext, useContext, useEffect, useState } from "react";
import { API_ENDPOINTS } from "@config/api";

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  loading: true,
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  // Initialize state from local storage to avoid "flicker"
  // Initialize state from local storage to avoid "flicker"
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (!savedUser) return null;
      
      const parsedUser = JSON.parse(savedUser);
      // Handle "data" wrapper if it exists (fix for existing bad data)
      return parsedUser.data || parsedUser;
    } catch (e) {
      console.error("Error parsing user from localStorage", e);
      return null;
    }
  });

  // Initialize loading: true ONLY if we have a token but NO user data locally.
  // This ensures we wait for the server verify before showing "Login" buttons,
  // but if we have a user locally, we show key UI immediately (optimistic).
  const [loading, setLoading] = useState(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    // If we have a user, do NOT show loading screen, even if checking token validity
    if (savedUser) return false;
    // If we have a token but no user, we must verify before showing anything
    return !!token;
  });

  // Helper to check if token exists and load user
  const loadUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      localStorage.removeItem("user");
      setLoading(false);
      return null;
    }

    try {
      console.log("Cargando usuario con token...");
      const response = await fetch(API_ENDPOINTS.profile, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    });

      if (response.ok) {
        const responseData = await response.json();
        const userData = responseData.data || responseData; // Extract user from wrapped response
        console.log("Usuario autenticado:", userData);
        
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return userData;
      } else {
        // Only clear session if strictly unauthorized
        if (response.status === 401) {
            console.warn("Token expirado o inválido (401)");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
        } else {
            console.warn(`Error del servidor (${response.status}). Manteniendo sesión local.`);
            // Optionally we could choose to NOT update the user state if we trust local storage enough,
            // or just leave it as is. The user currently holds the localStorage value initially.
            // If we set User(null) here, we kill the session on 500 error. checking...
            // It's better NOT to setUser(null) on 500.
        }
        return null;
      }
    } catch (error) {
      console.error("Failed to load user (Network/Unknown)", error);
      // DO NOT clear session on network error.
      // This allows the user to stay logged in (optimistically) if the server is unreachable.
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (token, userData = null) => {
    localStorage.setItem("token", token);
    if (userData) {
      const finalUser = userData.data || userData; // Normalize structure
      setUser(finalUser);
      localStorage.setItem("user", JSON.stringify(finalUser));
      // We are logged in, so loading is false
      setLoading(false); 
      return finalUser;
    }
    return await loadUser(); // Reload user data and return it
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            await fetch(API_ENDPOINTS.logout, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error("Logout failed", error);
        }
    }
    
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
