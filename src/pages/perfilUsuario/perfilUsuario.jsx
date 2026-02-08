import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { useProfileLayout } from "../../hooks/useProfileLayout";
import { useProfileForm } from "../../hooks/useProfileForm";
import { usePasswordChange } from "../../hooks/usePasswordChange";
import ProfileHeader from "../../components/perfilUsuario/ProfileHeader";
import ProfileTabs from "../../components/perfilUsuario/ProfileTabs";
import PersonalInfoSection from "../../components/perfilUsuario/PersonalInfoSection";
import SecuritySection from "../../components/perfilUsuario/SecuritySection";
import ProfileAnimations from "../../components/perfilUsuario/ProfileAnimations";

const PerfilUsuario = () => {
    const [activeTab, setActiveTab] = useState("personal");

    const { menuItems, profileData } = useProfileLayout();
    const profileForm = useProfileForm();
    const passwordChange = usePasswordChange();

    return (
        <AdminLayout menuItems={menuItems} profile={profileData}>
            <div className="space-y-8">
                <ProfileHeader />
                <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className="grid grid-cols-1 gap-8">
                    {activeTab === "personal" && (
                        <PersonalInfoSection {...profileForm} />
                    )}

                    {activeTab === "account" && (
                        <SecuritySection {...passwordChange} />
                    )}
                </div>
            </div>
            <ProfileAnimations />
        </AdminLayout>
    );
};

export default PerfilUsuario;
