import { API_ENDPOINTS } from "../config/api";

export const brotherhoodService = {
  /**
   * Actualiza el perfil de una hermandad
   * @param {string|number} id - ID de la hermandad
   * @param {Object} data - Datos a actualizar
   * @returns {Promise<Object>} - Hermandad actualizada
   */
  async updateProfile(id, data) {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${API_ENDPOINTS.brotherhoods}/${id}`, {
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
        throw new Error(errorData.message || 'Error al actualizar el perfil de la hermandad');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating brotherhood profile:', error);
      throw error;
    }
  }
};
