import SegmentedToggle from "./SegmentedToggle";
import TextField from "./TextField";
import SelectField from "./SelectField";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

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
              placeholder="G12345678"
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
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Teléfono</label>
              <PhoneInput
                country={'es'}
                onlyCountries={['es']}
                disableDropdown={true}
                value={values?.brotherhoodPhone}
                onChange={(phone) => onChange({ target: { name: "brotherhoodPhone", value: phone } })}
                inputClass={`!w-full !h-[42px] !text-sm !rounded-lg !border ${errors.brotherhoodPhone ? '!border-red-500' : '!border-gray-300'} focus:!border-[#8a01e5] focus:!ring-1 focus:!ring-[#8a01e5]`}
                containerClass="w-full"
                buttonClass={`!rounded-l-lg !border ${errors.brotherhoodPhone ? '!border-red-500' : '!border-gray-300'} !cursor-default hover:!bg-transparent`}
                placeholder="+34 600 000 000"
              />
              {errors.brotherhoodPhone && (
                 <span className="text-xs text-red-500 mt-1">{errors.brotherhoodPhone}</span>
              )}
            </div>
            <TextField
              label="Email"
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
              label="Email"
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
