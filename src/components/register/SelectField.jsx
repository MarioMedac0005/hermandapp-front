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
        className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:border-[#8a01e5] focus:ring-1 focus:ring-[#8a01e5] transition-all outline-none"
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
