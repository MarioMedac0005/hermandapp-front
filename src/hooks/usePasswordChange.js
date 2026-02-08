import { useState } from "react";

export const usePasswordChange = () => {
    const [pwdStep, setPwdStep] = useState(1);
    const [currentPwd, setCurrentPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [pwdError, setPwdError] = useState("");

    const handleValidateCurrentPwd = () => {
        if (currentPwd === "123456") {
            setPwdStep(2);
            setPwdError("");
        } else {
            setPwdError("Contraseña actual incorrecta");
        }
    };

    const handleChangePassword = () => {
        if (newPwd.length < 6) {
            setPwdError("La nueva contraseña debe tener al menos 6 caracteres");
        } else {
            alert("Contraseña actualizada con éxito");
            setPwdStep(1);
            setCurrentPwd("");
            setNewPwd("");
            setPwdError("");
        }
    };

    return {
        pwdStep,
        setPwdStep,
        currentPwd,
        setCurrentPwd,
        newPwd,
        setNewPwd,
        pwdError,
        setPwdError,
        handleValidateCurrentPwd,
        handleChangePassword
    };
};
