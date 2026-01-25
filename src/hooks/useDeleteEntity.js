import { useState } from "react";
import toast from 'react-hot-toast';

export const useDeleteEntity = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const destroy = async (url) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            // Some APIs might return 204 No Content
            if (res.status === 204) {
                toast.success("Registro eliminado correctamente");
                return true;
            }

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Error al eliminar el registro');
            
            toast.success(data.message || "Registro eliminado correctamente");
            return true;

        } catch (error) {
            setError(error.message);
            toast.error(error.message || "Error al eliminar el registro");
            return false;
        } finally {
            setLoading(false);
        }
    }

    return {
        destroy,
        loading,
        error
    }
}
