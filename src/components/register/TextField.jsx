export default function TextField({
  label,
  placeholder,
  leftAdornment,
  rightAdornment,
  value,
  onChange,
  type = "text",
  name,
}) {
  return (
    <div>
      <div className="text-xs font-bold text-base-content/80 mb-2">{label}</div>

      <div className="relative">
        {leftAdornment ? (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60">
            {leftAdornment}
          </span>
        ) : null}

        <input
          type={type}
          name={name}
          value={value ?? ""}
          onChange={onChange}
          placeholder={placeholder}
          className={[
            "w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:border-[#8a01e5] focus:ring-1 focus:ring-[#8a01e5] transition-all outline-none",
            leftAdornment ? "pl-10" : "",
            rightAdornment ? "pr-10" : "",
          ].join(" ")}
        />

        {rightAdornment ? (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60">
            {rightAdornment}
          </span>
        ) : null}
      </div>
    </div>
  );
}
