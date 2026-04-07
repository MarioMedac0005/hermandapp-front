import { API_ENDPOINTS } from "../config/api";

export const bandService = {
  /**
   * Actualiza el perfil de una banda
   * @param {string|number} id - ID de la banda
   * @param {Object} data - Datos a actualizar (name, description, city, rehearsal_space)
   * @returns {Promise<Object>} - Banda actualizada
   */
  async updateProfile(id, data) {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${API_ENDPOINTS.bands}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al actualizar el perfil de la banda');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating band profile:', error);
      throw error;
    }
  }
};
