import { useNavigate, useLocation } from "react-router-dom";

/**
 * Hook to provide a safer navigation experience, 
 * especially for 'go back' actions that might trap or exit the app
 * if the user entered via a direct URL.
 */
export const useSafeNavigate = () => {
    const navigate = useNavigate();
    const location = useLocation();

    /**
     * Navigates back if there's internal history, otherwise goes to the fallback route.
     * @param {string} fallback - The route to navigate to if no history is available.
     */
    const safeBack = (fallback = "/") => {
        // location.key is 'default' on the first page load of the application session
        // in most React Router configurations.
        if (location.key && location.key !== "default") {
            navigate(-1);
        } else {
            navigate(fallback);
        }
    };

    return { navigate, safeBack };
};
