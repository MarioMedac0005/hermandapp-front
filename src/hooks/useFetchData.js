import { useEffect, useState } from "react";

export const useFetchData = (url, page = 1) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        // Append page param
        const separator = url.includes('?') ? '&' : '?';
        const finalUrl = `${url}${separator}page=${page}`;

        const resp = await fetch(finalUrl, {
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (resp.status === 401) {
             throw new Error("No autorizado");
        }
        const result = await resp.json();
        
        if (!resp.ok) {
           throw new Error(result.message || result.details || "Error al cargar los datos");
        }

        // Handle Laravel pagination structure
        if (result.data && Array.isArray(result.data)) {
            setData(result.data);
            setPagination(result.meta || null);
        } else if (result.data && result.data.data) {
             // Sometimes API returns data: { data: [...], meta: ... }
             setData(result.data.data);
             setPagination(result.data.meta || result.meta || null);
        } else {
            setData(result.data || []);
        }

      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData()

    return () => controller.abort()

  }, [url, page]);

  // Manual refetch
  const refetch = async () => {
    setLoading(true);
    try {
        const separator = url.includes('?') ? '&' : '?';
        const finalUrl = `${url}${separator}page=${page}`;

        const resp = await fetch(finalUrl, {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
          });
          if (!resp.ok) throw new Error("Error al cargar los datos");
          const result = await resp.json();
          
          if (result.data && Array.isArray(result.data)) {
            setData(result.data);
            setPagination(result.meta || null);
          } else if (result.data && result.data.data) {
             setData(result.data.data);
             setPagination(result.data.meta || result.meta || null);
          } else {
             setData(result.data || []);
          }
    } catch(err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
  }

  return { data, loading, error, refetch, pagination };
};
