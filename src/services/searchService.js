// const API_URL = "http://127.0.0.1:8000/api/search";
const API_URL = "https://daw23.arenadaw.com.es/api/search";

export async function searchEntities(params = {}) {
    const query = new URLSearchParams(params).toString();

    const response = await fetch(`${API_URL}?${query}`);
    if (!response.ok) {
        throw new Error("Error en la búsqueda");
    }

    const json = await response.json();
    return json.data;
}
