export default function SelectField({
  label,
  options = [],
  placeholder = "Selecciona...",
  value,
  onChange,
  name,
}) {
  return (
    <div>
      <div className="text-xs font-bold text-base-content/80 mb-2">{label}</div>

      <select
        className="select select-bordered w-full"
        name={name}
        value={value ?? ""}
        onChange={onChange}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
