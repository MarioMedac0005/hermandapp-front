import { API_ENDPOINTS } from '../config/api';

export const invoiceService = {
  /**
   * Descarga una factura en formato PDF
   * @param {number} invoiceId - ID de la factura a descargar
   * @returns {Promise<void>}
   */
  async downloadInvoice(invoiceId) {
    try {
      const response = await fetch(`${API_ENDPOINTS.invoices}/${invoiceId}/download`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al descargar la factura');
      }

      // Obtener el blob del PDF
      const blob = await response.blob();
      
      // Crear un enlace temporal para descargar el archivo
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `factura_${invoiceId}.pdf`;
      document.body.appendChild(a);
      a.click();
      
      // Limpiar
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error descargando la factura:', error);
      throw error;
    }
  }
};
