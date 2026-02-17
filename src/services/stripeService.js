import { API_ENDPOINTS } from "../config/api";

export const stripeService = {
  /**
   * Obtiene el enlace de onboarding de Stripe
   * @returns {Promise<{url: string}>} - URL de redirección a Stripe
   */
  async getOnboardingLink() {
    const token = localStorage.getItem('token');
    
    try {
      // Assuming the endpoint is /api/stripe/onboarding-link based on the plan
      // We need to add this to API_ENDPOINTS in config/api.js first or hardcode/append here.
      // Ideally update config/api.js. for now I will append to base url if not in endpoints
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/stripe/onboarding-link`, { // Changed from onboarding-link to onboarding based on standard practices or user request? User said /api/stripe/onboarding-link.
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al iniciar onboarding de Stripe');
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting stripe onboarding link:', error);
      throw error;
    }
  },

  /**
   * Verifica el estado del onboarding (opcional, si el backend no lo hace automágicamente al redireccionar)
   * Realmente el backend maneja esto via webhooks, el frontend solo necesita refrescar el usuario.
   */
  /**
   * Verifica el estado de la cuenta de Stripe de la banda
   * @returns {Promise<Object>} - Estado de la cuenta
   */
  async checkAccountStatus() {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/stripe/account-status`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al verificar estado de Stripe');
      }

      return await response.json();
    } catch (error) {
      console.error('Error checking stripe account status:', error);
      throw error;
    }
  },
};
