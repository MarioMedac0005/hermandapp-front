import { useEffect, useState } from "react";
import { searchEntities } from "../services/searchService";

export default function useSearch(filters) {
    const [results, setResults] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        searchEntities(filters)
            .then(data => {
                setResults(data.data);
                setPagination({
                    currentPage: data.current_page,
                    lastPage: data.last_page,
                    links: data.links,
                });
            })
            .finally(() => setLoading(false));
    }, [filters]);

    return { results, pagination, loading };
}
