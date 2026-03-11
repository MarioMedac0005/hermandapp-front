import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useProfileForm } from "../../hooks/useProfileForm";
import { usePasswordChange } from "../../hooks/usePasswordChange";
import ProfileHeader from "../../components/perfilUsuario/ProfileHeader";
import ProfileTabs from "../../components/perfilUsuario/ProfileTabs";
import PersonalInfoSection from "../../components/perfilUsuario/PersonalInfoSection";
import SecuritySection from "../../components/perfilUsuario/SecuritySection";
import ProfileAnimations from "../../components/perfilUsuario/ProfileAnimations";

const PerfilUsuario = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const profileForm = useProfileForm();
  const { loading } = profileForm;
  const passwordChange = usePasswordChange();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-6 text-sm text-gray-500 hover:text-purple-600 transition-colors duration-200 group"
        >
          <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Volver al inicio
        </Link>

        <div className="space-y-8">
          <ProfileHeader />
          <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="grid grid-cols-1 gap-8">
            {activeTab === "personal" &&
              (loading ? (
                <div className="flex justify-center py-10">
                  <div className="w-6 h-6 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <PersonalInfoSection {...profileForm} />
              ))}

            {activeTab === "account" && <SecuritySection {...passwordChange} />}
          </div>
        </div>
        <ProfileAnimations />
      </main>
      <Footer />
    </div>
  );
};

export default PerfilUsuario;
