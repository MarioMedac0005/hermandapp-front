export const contractColumns = [
  {
    key: "date",
    label: "Fecha",
    format: (value) => {
      if (!value) return "-";
      const date = new Date(value);
      return isNaN(date.getTime()) ? "Fecha inválida" : date.toLocaleDateString("es-ES");
    },
  },
  {
    key: "status",
    label: "Estado",
    type: "status",
  },
  {
    key: "amount",
    label: "Importe",
    format: (value) => (value ? `${parseFloat(value).toFixed(2)}\u00A0€` : "-"),
  },
  {
    key: "description",
    label: "Descripción",
    className: "max-w-[200px] truncate",
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
