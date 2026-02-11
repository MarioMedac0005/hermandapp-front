import SegmentedToggle from "./SegmentedToggle";
import TextField from "./TextField";
import SelectField from "./SelectField";

export default function RegisterStep1Identity({ values, onChange, errors = {} }) {
  const cityOptions = [
    { value: "Sevilla", label: "Sevilla" },
    { value: "Malaga", label: "Málaga" },
    { value: "Cadiz", label: "Cádiz" },
    { value: "Granada", label: "Granada" },
    { value: "Huelva", label: "Huelva" },
    { value: "Cordoba", label: "Córdoba" },
    { value: "Almeria", label: "Almería" },
    { value: "Jaen", label: "Jaén" },
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

      {orgType === "brotherhood" && (
        <>
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <TextField
              label="Nombre"
              placeholder=" Hermandad del Gran Poder.."
              name="brotherhoodName"
              value={values?.brotherhoodName}
              onChange={onChange}
              error={errors.brotherhoodName}
            />
            <SelectField
              label="Ciudad"
              placeholder="Selecciona una ciudad"
              options={cityOptions}
              name="brotherhoodCity"
              value={values?.brotherhoodCity}
              onChange={onChange}
              error={errors.brotherhoodCity}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <TextField
              label="NIF/CIF"
              placeholder="12345678G"
              name="brotherhoodNifCif"
              value={values?.brotherhoodNifCif}
              onChange={onChange}
              error={errors.brotherhoodNifCif}
            />
            <TextField
              label="Sede canónica"
              placeholder="Parroquia de..."
              name="brotherhoodCanonicalSeat"
              value={values?.brotherhoodCanonicalSeat}
              onChange={onChange}
              error={errors.brotherhoodCanonicalSeat}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <TextField
              label="Teléfono"
              placeholder="650 360 452"
              name="brotherhoodPhone"
              value={values?.brotherhoodPhone}
              onChange={onChange}
              error={errors.brotherhoodPhone}
            />
            <TextField
              label="Email de la hermandad"
              placeholder="contacto@hermandad.com"
              name="brotherhoodEmail"
              value={values?.brotherhoodEmail}
              onChange={onChange}
              error={errors.brotherhoodEmail}
              type="email"
            />
          </div>
        </>
      )}

      {orgType === "band" && (
        <>
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <TextField
              label="Nombre de la banda"
              placeholder="Banda de CC y TT..."
              name="bandName"
              value={values?.bandName}
              onChange={onChange}
              error={errors.bandName}
            />
            <TextField
              label="Descripción (opcional)"
              placeholder="Banda fundada en..."
              name="bandDescription"
              value={values?.bandDescription}
              onChange={onChange}
              error={errors.bandDescription}
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
              error={errors.bandCity}
            />
            <TextField
              label="Sitio de ensayo"
              placeholder="Polideportivo / Local..."
              name="bandRehearsalPlace"
              value={values?.bandRehearsalPlace}
              onChange={onChange}
              error={errors.bandRehearsalPlace}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <TextField
              label="NIF/CIF"
              placeholder="G12345678"
              name="bandNifCif"
              value={values?.bandNifCif}
              onChange={onChange}
              error={errors.bandNifCif}
            />
            <TextField
              label="Email de la banda "
              placeholder="contacto@banda.com"
              name="bandEmail"
              value={values?.bandEmail}
              onChange={onChange}
              error={errors.bandEmail}
              type="email"
            />
          </div>
        </>
      )}
    </>
  );
}
