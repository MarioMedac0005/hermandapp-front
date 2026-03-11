import { useState } from "react";
import { API_ENDPOINTS } from "@config/api";

export const usePasswordChange = () => {
    const [sending, setSending] = useState(false);
    const [resetStatus, setResetStatus] = useState(null); // null | "success" | "error"
    const [resetMessage, setResetMessage] = useState("");

    const handleSendResetEmail = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const email = user?.email;

        if (!email) {
            setResetStatus("error");
            setResetMessage("No se encontró el email del usuario.");
            return;
        }

        setSending(true);
        setResetStatus(null);
        setResetMessage("");

        try {
            const response = await fetch(API_ENDPOINTS.forgotPassword, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setResetStatus("success");
                setResetMessage(`Se ha enviado un correo a ${email} con las instrucciones para restablecer tu contraseña.`);
            } else {
                const data = await response.json().catch(() => ({}));
                setResetStatus("error");
                setResetMessage(data.message || "Ha ocurrido un error. Inténtalo de nuevo.");
            }
        } catch {
            setResetStatus("error");
            setResetMessage("No se pudo conectar con el servidor. Comprueba tu conexión.");
        } finally {
            setSending(false);
        }
    };

    return {
        sending,
        resetStatus,
        resetMessage,
        handleSendResetEmail,
    };
};
