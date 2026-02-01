export default function TextField({
  label,
  placeholder,
  leftAdornment,
  rightAdornment,
  value,
  onChange,
  type = "text",
  name,
  error,
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
            "input input-bordered w-full",
            leftAdornment ? "pl-10" : "",
            rightAdornment ? "pr-10" : "",
            error ? "input-error" : "",
          ].join(" ")}
        />

        {rightAdornment ? (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60">
            {rightAdornment}
          </span>
        ) : null}
      </div>

      {error ? <p className="mt-2 text-xs text-error">{error}</p> : null}
    </div>
  );
}
