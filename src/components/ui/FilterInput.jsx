export default function FilterInput({
    value,
    onChange,
    placeholder = "Buscar...",
}) {
    return (
        <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className="mt-1 w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:ring-purple-500 focus:border-purple-500 outline-none"
        />
    );
}
