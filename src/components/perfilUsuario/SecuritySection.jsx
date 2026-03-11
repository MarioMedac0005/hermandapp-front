import React from "react";
import { LockClosedIcon, EnvelopeIcon, CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

const SecuritySection = ({ sending, resetStatus, resetMessage, handleSendResetEmail }) => {
    return (
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <LockClosedIcon className="w-6 h-6 text-purple-600" />
                Seguridad
            </h2>

            <div className="max-w-md space-y-4">
                <p className="text-sm text-gray-600">
                    Para cambiar tu contraseña, te enviaremos un correo electrónico con un enlace seguro para restablecerla.
                </p>

                {resetStatus === "success" && (
                    <div className="flex items-start gap-2 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
                        <CheckCircleIcon className="w-5 h-5 shrink-0 mt-0.5" />
                        <span>{resetMessage}</span>
                    </div>
                )}

                {resetStatus === "error" && (
                    <div className="flex items-start gap-2 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                        <ExclamationCircleIcon className="w-5 h-5 shrink-0 mt-0.5" />
                        <span>{resetMessage}</span>
                    </div>
                )}

                <button
                    onClick={handleSendResetEmail}
                    disabled={sending || resetStatus === "success"}
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-medium shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {sending ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Enviando...
                        </>
                    ) : (
                        <>
                            <EnvelopeIcon className="w-4 h-4" />
                            Enviar correo de restablecimiento
                        </>
                    )}
                </button>
            </div>
        </section>
    );
};

export default SecuritySection;
