import React from "react";

const ProfileHeader = () => {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 border-l-4 border-purple-600 pl-4">
                    Perfil de Usuario
                </h1>
                <p className="mt-2 text-gray-600 ml-5 italic">
                    Gestiona tu información personal y seguridad de la cuenta.
                </p>
            </div>
        </div>
    );
};

export default ProfileHeader;
