import React from "react";
import { UserIcon, IdentificationIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

const PersonalInfoSection = ({
    personalInfo,
    handleInputChange,
    handleBlur,
    getInputClass,
    touched,
    errors
}) => {
    return (
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <UserIcon className="w-6 h-6 text-purple-600" />
                    Datos Personales
                </h2>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all shadow-md hover:shadow-lg active:scale-95 font-medium cursor-pointer">
                    Editar Perfil
                </button>
            </div>

            <div className="flex flex-col gap-6">
                {/* Nombre */}
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <div className="relative">
                        <IdentificationIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Ej. Juan"
                            value={personalInfo.nombre}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            className={getInputClass("nombre")}
                        />
                    </div>
                    {touched.nombre && errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
                    {touched.nombre && !errors.nombre && <p className="text-green-600 text-xs mt-1">Nombre válido</p>}
                </div>

                {/* Apellidos */}
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Apellidos</label>
                    <div className="relative">
                        <IdentificationIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            name="apellidos"
                            placeholder="Ej. García Pérez"
                            value={personalInfo.apellidos}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            className={getInputClass("apellidos")}
                        />
                    </div>
                    {touched.apellidos && errors.apellidos && <p className="text-red-500 text-xs mt-1">{errors.apellidos}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="relative">
                        <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="email"
                            name="email"
                            placeholder="correo@ejemplo.com"
                            value={personalInfo.email}
                            readOnly
                            className={`${getInputClass("email")} bg-gray-50 cursor-not-allowed opacity-75`}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PersonalInfoSection;
