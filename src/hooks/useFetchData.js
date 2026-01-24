import { useEffect, useState } from "react";

export const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const resp = await fetch(url, {
          signal: controller.signal,
        });
        if (!resp.ok) throw new Error("Error al cargar los datos");

        const result = await resp.json();
        setData(result.data);
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

  }, []);

  return { data, loading, error };
};
