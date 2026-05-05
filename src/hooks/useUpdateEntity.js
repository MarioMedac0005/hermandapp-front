import { useState } from "react";
import toast from 'react-hot-toast';

export const useUpdateEntity = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const update = async (url, body) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(body)
            });

            let data = null;

            const contentType = res.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {
                data = await res.json();
            } else {
                throw new Error("Error del servidor. Inténtalo de nuevo más tarde.");
            }

            if (!res.ok) {
                throw new Error(data?.message || "Error al actualizar el registro");
            }

            toast.success("Registro actualizado correctamente");
            return data;

        } catch (error) {
            setError(error.message);
            toast.error(error.message || "Error al actualizar el registro");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        update,
        loading,
        error
    }
}
