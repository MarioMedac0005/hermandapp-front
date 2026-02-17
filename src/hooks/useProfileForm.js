import { useState } from "react";

export const useProfileForm = () => {
    const [personalInfo, setPersonalInfo] = useState({
        nombre: "Juan",
        apellidos: "García Pérez",
        email: "juan.garcia@example.com",
        telefono: "600123456",
        ciudad: "Sevilla",
        fechaNacimiento: "1990-05-15",
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validateField = (name, value) => {
        let error = "";
        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

        switch (name) {
            case "nombre":
            case "apellidos":
                if (!value) error = "Este campo es obligatorio";
                else if (value.length < 2) error = "Mínimo 2 caracteres";
                else if (!nameRegex.test(value)) error = "Solo se permiten letras";
                break;
            case "telefono":
                if (value && (!/^\d+$/.test(value) || value.length < 9)) {
                    error = "Mínimo 9 dígitos numéricos";
                }
                break;
            case "ciudad":
                if (value && (!nameRegex.test(value) || value.length > 50)) {
                    error = "Solo letras, máximo 50 caracteres";
                }
                break;
            case "fechaNacimiento":
                if (value) {
                    const selectedDate = new Date(value);
                    const today = new Date();
                    if (selectedDate > today) error = "La fecha no puede ser futura";
                }
                break;
            default:
                break;
        }
        return error;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo({ ...personalInfo, [name]: value });
        setErrors({ ...errors, [name]: validateField(name, value) });
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({ ...touched, [name]: true });
        setErrors({ ...errors, [name]: validateField(name, personalInfo[name]) });
    };

    const getInputClass = (name) => {
        const base = "w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors";
        if (!touched[name]) return `${base} border-gray-300 focus:ring-purple-200 focus:border-purple-400`;
        return errors[name]
            ? `${base} border-red-500 focus:ring-red-100 focus:border-red-500`
            : `${base} border-green-500 focus:ring-green-100 focus:border-green-500`;
    };

    return {
        personalInfo,
        setPersonalInfo,
        errors,
        touched,
        handleInputChange,
        handleBlur,
        getInputClass
    };
};
