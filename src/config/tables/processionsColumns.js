export const processionsColumns = [
	{
		key: "name",
		label: "Nombre",
		className: "max-w-[150px] truncate",
	},
	{
		key: "type",
		label: "Tipo",
	},
	{
		key: "checkout_time",
		label: "Hora de Salida",
	},
	{
		key: "checkin_time",
		label: "Hora de Entrada",
	},
	{
		key: "brotherhood",
		label: "Hermandad",
		render: (item) => item.brotherhood?.name || "N/A",
	},
	{
		key: "created_at",
		label: "Fecha de Creación",
	},
];