import { useState } from "react";
import toast from 'react-hot-toast';

export const useCreateEntity = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const create = async (url, body) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(body)
            })

            const data = await res.json();


            if (!res.ok) {
                console.error("Backend Error Data:", data);
                throw new Error(data.details || data.message || JSON.stringify(data) || 'Error al crear un registro')
            }
            
            setData(data)
            toast.success("Registro creado correctamente");
            return data;

        } catch (error) {
            console.error("Error creating entity:", error);
            setError(error.message)
            toast.error(error.message || "Error al crear el registro");
            return null;
        } finally {
            setLoading(false)
        }
    }

    return {
        create,
        data,
        loading,
        error
    }
}