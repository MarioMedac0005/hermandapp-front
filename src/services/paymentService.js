import { API_ENDPOINTS } from "../config/api";

export const paymentService = {
  /**
   * Crea una sesión de pago para un contrato
   * @param {number|string} contractId - ID del contrato
   * @returns {Promise<{url: string}>} - URL de redirección a Stripe
   */
  async createPaymentSession(contractId) {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${API_ENDPOINTS.contracts}/${contractId}/create-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al crear la sesión de pago');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating payment session:', error);
      throw error;
    }
  }
};
