import { API_ENDPOINTS } from "@/config/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useProfileForm = () => {
    const [personalInfo, setPersonalInfo] = useState({
        nombre: "",
        apellidos: "",
        email: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState({});

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                setLoading(true)
                const response = await fetch(API_ENDPOINTS.profile, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`  
                    }
                })
                const { data: { name, surname, email } } = await response.json()

                setPersonalInfo(prev => ({
                    ...prev,
                    nombre: name,
                    apellidos: surname,
                    email: email
                }))
            } catch (error) {
                toast.error(error?.message || 'Error al obtener los datos del usuario')
            } finally {
                setLoading(false)
            }
        }

        getUserDetails()
    }, [])

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
        getInputClass,
        loading
    };
};
