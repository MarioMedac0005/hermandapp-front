export const contractColumns = [
  {
    key: "performance_date",
    label: "Fecha",
    render: (item) => {
      if (!item.performance_date) return "-";
      const date = new Date(item.performance_date);
      if (isNaN(date.getTime())) return "-";
      return date.toLocaleDateString("es-ES");
    },
  },
  {
    key: "performance_type",
    label: "Tipo",
    render: (item) => {
      const labels = {
        'procession': 'Procesión',
        'concert': 'Concierto',
        'transfer': 'Traslado',
        'festival': 'Certamen',
        'other': 'Otro'
      };
      return labels[item.performance_type] || item.performance_type || "-";
    }
  },
  {
    key: "status",
    label: "Estado",
    type: "status",
  },
  {
    key: "amount",
    label: "Importe",
    format: (value) => {
        if (!value) return "0,00 €";
        const val = parseFloat(value);
        return isNaN(val) ? value : `${val.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\u00A0€`;
    },
  },
  {
    key: "band",
    label: "Banda",
    format: (value) => value?.name || "-",
  },
  {
    key: "brotherhood",
    label: "Hermandad",
    format: (value) => value?.name || "-",
  },
  {
    key: "procession",
    label: "Procesión",
    format: (value) => value?.name || "-",
  },
];
