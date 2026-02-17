import React from "react";

const ProfileTabs = ({ activeTab, setActiveTab }) => {
    return (
        <div className="flex border-b border-gray-200 space-x-8">
            <button
                onClick={() => setActiveTab("personal")}
                className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === "personal" ? "text-purple-600" : "text-gray-500 hover:text-gray-700"
                    }`}
            >
                Información Personal
                {activeTab === "personal" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 rounded-full" />}
            </button>
            <button
                onClick={() => setActiveTab("account")}
                className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === "account" ? "text-purple-600" : "text-gray-500 hover:text-gray-700"
                    }`}
            >
                Seguridad y Cuenta
                {activeTab === "account" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 rounded-full" />}
            </button>
        </div>
    );
};

export default ProfileTabs;
