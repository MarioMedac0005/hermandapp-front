import { useAuth } from "../contexts/AuthContext";
import adminMenu from "../menus/admin";
import hermandadMenu from "../menus/hermandad";
import bandaMenu from "../menus/banda";
import BandaProfile from "../services/BandaProfile";
import HermandadProfile from "../services/HermandadProfile";

export const useProfileLayout = () => {
    const { user } = useAuth();

    let menuItems = [];
    let profileData = null;

    if (user?.panel === 'admin') {
        menuItems = adminMenu;
    } else if (user?.panel === 'gestor_hermandad') {
        menuItems = hermandadMenu;
        profileData = HermandadProfile();
    } else if (user?.panel === 'gestor_banda') {
        menuItems = bandaMenu;
        profileData = BandaProfile();
    }

    return { menuItems, profileData };
};
