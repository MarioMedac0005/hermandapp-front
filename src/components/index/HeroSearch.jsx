import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../SearchInput";

export default function HeroSearch() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        const trimmed = query.trim();

        if (trimmed) {
            navigate(`/busqueda?q=${encodeURIComponent(trimmed)}`);
        } else {
            navigate("/busqueda");
        }
    };

    return (
        <SearchInput
            value={query}
            onChange={setQuery}
            onSearch={handleSearch}
            placeholder="Busca una banda o una hermandad..."
        />
    );
}
