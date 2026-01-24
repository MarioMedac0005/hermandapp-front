import { useState } from "react";

export const useCreateEntity = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const create = async (url, body) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL_LOCAL2}${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })

            const data = await res.json();

            console.log("Respuesta del backend:", data);
            if (!res.ok) throw new Error(data.details || 'Error al crear un registro')
            
            setData(data)
            return data;

        } catch (error) {
            setError(error.message)
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