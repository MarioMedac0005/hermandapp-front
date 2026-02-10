// src/hooks/useSearch.js
import { useEffect, useState } from "react";
import { searchEntities } from "../services/searchService";

export default function useSearch(filters) {
    const [results, setResults] = useState([]);      // ← siempre array
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        const fetchSearch = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await searchEntities(filters);

                // response = { success, message, data }
                const paginated = response.data;

                if (!cancelled) {
                    setResults(
                        Array.isArray(paginated?.data)
                            ? paginated.data
                            : []
                    );

                    setPagination(
                        paginated
                            ? {
                                currentPage: paginated.current_page,
                                lastPage: paginated.last_page,
                                links: paginated.links,
                            }
                            : null
                    );
                }
            } catch (err) {
                if (!cancelled) {
                    console.error(err);
                    setResults([]);
                    setPagination(null);
                    setError(err.message ?? "Error inesperado");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchSearch();

        return () => {
            cancelled = true;
        };
    }, [filters]);

    return {
        results,
        pagination,
        loading,
        error,
    };
}