import { API_ENDPOINTS } from "@config/api";

export async function searchEntities(params = {}) {
    const query = new URLSearchParams(params).toString();

    const response = await fetch(
        `${API_ENDPOINTS.search}?${query}`
    );

    if (!response.ok) {
        throw new Error("Error en la búsqueda");
    }

    return response.json();
}