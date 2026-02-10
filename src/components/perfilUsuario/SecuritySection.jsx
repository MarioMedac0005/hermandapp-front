import React from "react";
import { LockClosedIcon, CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

const SecuritySection = ({
    pwdStep,
    currentPwd,
    setCurrentPwd,
    newPwd,
    setNewPwd,
    pwdError,
    setPwdError,
    handleValidateCurrentPwd,
    handleChangePassword,
    setPwdStep
}) => {
    return (
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <LockClosedIcon className="w-6 h-6 text-purple-600" />
                Seguridad
            </h2>

            <div className="max-w-md space-y-4">
                <p className="text-sm text-gray-600">
                    Sigue los pasos para actualizar tu contraseña de forma segura.
                </p>

                {pwdStep === 1 ? (
                    <div className="space-y-4 animate-fadeIn">
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Contraseña Actual</label>
                            <div className="relative">
                                <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    placeholder="Introduce tu contraseña actual"
                                    value={currentPwd}
                                    onChange={(e) => {
                                        setCurrentPwd(e.target.value);
                                        setPwdError("");
                                    }}
                                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${pwdError ? "border-red-500 focus:ring-red-100" : "border-gray-300 focus:ring-purple-200 focus:border-purple-400"
                                        }`}
                                />
                            </div>
                            {pwdError && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><ExclamationCircleIcon className="w-3 h-3" /> {pwdError}</p>}
                        </div>
                        <button
                            onClick={handleValidateCurrentPwd}
                            className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-medium"
                        >
                            Validar Contraseña
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4 animate-fadeIn">
                        <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg text-sm mb-4">
                            <CheckCircleIcon className="w-5 h-5 shrink-0" />
                            Validación correcta. Introduce tu nueva contraseña.
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
                            <div className="relative">
                                <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    placeholder="Mínimo 6 caracteres"
                                    value={newPwd}
                                    onChange={(e) => {
                                        setNewPwd(e.target.value);
                                        setPwdError("");
                                    }}
                                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${pwdError ? "border-red-500 focus:ring-red-100" : "border-gray-300 focus:ring-purple-200 focus:border-purple-400"
                                        }`}
                                />
                            </div>
                            {pwdError && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><ExclamationCircleIcon className="w-3 h-3" /> {pwdError}</p>}
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setPwdStep(1)}
                                className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleChangePassword}
                                className="flex-1 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-medium shadow-md"
                            >
                                Actualizar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default SecuritySection;
