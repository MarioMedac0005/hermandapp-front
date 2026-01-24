function Item({ label, value }) {
  const v = value ? String(value) : "—";

  return (
    <div>
      <p className="text-xs text-base-content/50">{label}</p>
      <p className="font-semibold text-base-content">{v}</p>
    </div>
  );
}

export default function Step3Confirm({ org, account, cityLabels }) {
  const orgType = org?.orgType ?? "brotherhood";

  const orgSummary =
    orgType === "brotherhood"
      ? {
          Tipo: "Hermandad",
          Ciudad: cityLabels?.[org.brotherhoodCity] ?? org.brotherhoodCity,
          "NIF/CIF": org.brotherhoodNifCif,
          "Sede canónica": org.brotherhoodCanonicalSeat,
          Teléfono: org.brotherhoodPhone,
          Email: org.brotherhoodEmail,
          Nombre: org.brotherhoodName,
        }
      : {
          Tipo: "Banda",
          Ciudad: cityLabels?.[org.bandCity] ?? org.bandCity,
          "NIF/CIF": org.bandNifCif,
          "Sitio de ensayo": org.bandRehearsalPlace,
          Email: org.bandEmail,
          "Nombre de la banda": org.bandName,
          "Descripción (opcional)": org.bandDescription,
        };

  const accountSummary = {
    Nombre: account?.firstName,
    Apellidos: account?.lastName,
    Email: account?.userEmail,
  };

  return (
    <div className="mt-6 grid grid-cols-1 gap-4">
      <div className="rounded-2xl border border-base-200 bg-base-100 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold tracking-tight text-base-content">
            Resumen de la organización
          </h3>
          <button type="button" className="btn btn-ghost btn-sm">
            Editar
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {Object.entries(orgSummary).map(([k, v]) => (
            <Item key={k} label={k} value={v} />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-base-200 bg-base-100 p-6">
        <h3 className="text-base font-extrabold tracking-tight text-base-content">
          Resumen de la cuenta
        </h3>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {Object.entries(accountSummary).map(([k, v]) => (
            <Item key={k} label={k} value={v} />
          ))}
        </div>
      </div>
    </div>
  );
}
