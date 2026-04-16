export const availabilitiesColumns = [
  {
    key: "date",
    label: "Fecha",
  },
  {
    key: "description",
    label: "Descripción",
    className: "max-w-[150px] truncate",
  },
  {
    key: "band",
    label: "Banda",
    render: (item) => item.band?.name || "N/A",
  },
];
