import SegmentedToggle from "./SegmentedToggle";
import TextField from "./TextField";
import SelectField from "./SelectField";

export default function RegisterStep1Identity({ values, onChange }) {
  const cityOptions = [
    { value: "sevilla", label: "Sevilla" },
    { value: "malaga", label: "Málaga" },
    { value: "cadiz", label: "Cádiz" },
    { value: "granada", label: "Granada" },
  ];

  const orgType = values?.orgType ?? "brotherhood";

  const setOrgType = (t) => onChange({ target: { name: "orgType", value: t } });

  return (
    <>
      <div className="mt-6">
        <div className="text-xs font-bold text-base-content/80 mb-2">
          Tipo de Organización
        </div>

        <SegmentedToggle
          active={orgType === "brotherhood" ? "left" : "right"}
          leftLabel="Hermandad"
          rightLabel="Banda"
          onLeft={() => setOrgType("brotherhood")}
          onRight={() => setOrgType("band")}
        />
      </div>

      {/* HERMANDAD */}
      {orgType === "brotherhood" && (
        <>
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <TextField
              label="Nombre de la Hermandad"
              placeholder="Ej. Hermandad del Gran Poder"
              name="brotherhoodName"
              value={values?.brotherhoodName}
              onChange={onChange}
            />
            <SelectField
              label="Ciudad"
              placeholder="Selecciona una ciudad"
              options={cityOptions}
              name="brotherhoodCity"
              value={values?.brotherhoodCity}
              onChange={onChange}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <TextField
              label="NIF/CIF"
              placeholder="Ej. G12345678"
              name="brotherhoodNifCif"
              value={values?.brotherhoodNifCif}
              onChange={onChange}
            />
            <TextField
              label="Sede canónica"
              placeholder="Ej. Parroquia de..."
              name="brotherhoodCanonicalSeat"
              value={values?.brotherhoodCanonicalSeat}
              onChange={onChange}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <TextField
              label="Teléfono"
              placeholder="Ej. 600 000 000"
              name="brotherhoodPhone"
              value={values?.brotherhoodPhone}
              onChange={onChange}
            />
            <TextField
              label="Email"
              placeholder="Ej. contacto@hermandad.com"
              name="brotherhoodEmail"
              value={values?.brotherhoodEmail}
              onChange={onChange}
            />
          </div>
        </>
      )}

      {/* BANDA */}
      {orgType === "band" && (
        <>
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <TextField
              label="Nombre de la banda"
              placeholder="Ej. Banda de CC y TT..."
              name="bandName"
              value={values?.bandName}
              onChange={onChange}
            />
            <TextField
              label="Descripción (opcional)"
              placeholder="Ej. Banda fundada en..."
              name="bandDescription"
              value={values?.bandDescription}
              onChange={onChange}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <SelectField
              label="Ciudad"
              placeholder="Selecciona una ciudad"
              options={cityOptions}
              name="bandCity"
              value={values?.bandCity}
              onChange={onChange}
            />
            <TextField
              label="Sitio de ensayo"
              placeholder="Ej. Polideportivo / Local..."
              name="bandRehearsalPlace"
              value={values?.bandRehearsalPlace}
              onChange={onChange}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <TextField
              label="NIF/CIF"
              placeholder="Ej. G12345678"
              name="bandNifCif"
              value={values?.bandNifCif}
              onChange={onChange}
            />
            <TextField
              label="Email"
              placeholder="Ej. contacto@banda.com"
              name="bandEmail"
              value={values?.bandEmail}
              onChange={onChange}
            />
          </div>
        </>
      )}
    </>
  );
}
