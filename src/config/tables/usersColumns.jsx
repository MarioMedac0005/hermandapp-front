export const userColumns = [
  {
    key: "name",
    label: "Nombre",
    className: "max-w-[150px] truncate",
    render: (item) => item.name || "Sin nombre",
  },
  {
    key: "surname",
    label: "Apellidos",
    className: "max-w-[150px] truncate",
    render: (item) => item.surname || "Sin apellidos",
  },
  {
    key: "email",
    label: "Email",
    className: "max-w-[150px] truncate",
    render: (item) => item.email || "Sin email",
  },
  {
    key: "roles",
    label: "Rol",
    render: (item) => {
        const role = item.role || item.roles;
        if (!role) return "Sin rol";
        return (
            <span className={`badge badge-sm badge-soft ${role === 'admin' ? 'badge-secondary' : 'badge-info'}`}>
                {role}
            </span>
        );
    }
  },
  {
    key: "band_id",
    label: "Banda",
    render: (item) => item.band ? item.band.name : (item.band_id ? `Banda ${item.band_id}` : "Sin banda"),
  },
  {
    key: "brotherhood_id",
    label: "Hermandad",
    render: (item) => item.brotherhood ? item.brotherhood.name : (item.brotherhood_id ? `Hermandad ${item.brotherhood_id}` : "Sin hermandad"),
  },
  {
    key: "created_at",
    label: "Fecha de Creación",
    render: (item) => {
        if (!item.created_at) return "Sin fecha";
        return new Date(item.created_at).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long', 
            day: 'numeric'
        });
    }
  },
];
