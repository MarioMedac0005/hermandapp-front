export const brotherhoodsColumns = [
  {
    key: "name",
    label: "Nombre",
    className: "max-w-[150px] truncate",
  },
  {
    key: "city",
    label: "Ciudad",
    className: "max-w-[150px] truncate",
  },
  {
    key: "office",
    label: "Sede",
    className: "max-w-[150px] truncate",
  },
  {
    key: "phone_number",
    label: "Teléfono",
    render: (item) => item.phone_number || "Sin teléfono",
  },
  {
    key: "email",
    label: "Email",
    className: "max-w-[150px] truncate",
    render: (item) => item.email || "Sin email",
  },
  {
    key: "created_at",
    label: "Fecha de Creación",
    render: (item) => item.created_at || "Sin fecha",
  },
];
