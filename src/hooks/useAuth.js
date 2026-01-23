import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000/api";

export default function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        fetch(`${API_URL}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        })
            .then(res => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then(data => setUser(data))
            .catch(() => {
                localStorage.removeItem("token");
                setUser(null);
            })
            .finally(() => setLoading(false));
    }, []);

    const logout = async () => {
        const token = localStorage.getItem("token");

        await fetch(`${API_URL}/logout`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        localStorage.removeItem("token");
        setUser(null);
    };

    return { user, loading, logout };
}
