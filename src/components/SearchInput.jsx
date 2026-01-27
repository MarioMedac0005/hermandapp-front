import { InputText } from "primereact/inputtext";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchInput({
    value,
    onChange,
    onSearch,
    placeholder = "Buscar...",
}) {
    const handleKeyDown = e => {
        if (e.key === "Enter") {
            onSearch();
        }
    };

    return (
        <div className="group flex w-full">
            <InputText
                value={value}
                onChange={e => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="w-full p-inputtext-md border! border-primary/60! bg-white! text-base-content!
                           focus:border-primary! focus:ring-2! focus:ring-primary/40!
                           rounded-r-none! transition-all duration-200"
            />

            <button
                type="button"
                onClick={onSearch}
                className="flex items-center justify-center px-3
                           border! border-l-0! border-primary/60! bg-white! text-primary
                           rounded-l-none! rounded-r-md!
                           transition-all duration-200
                           group-focus-within:ring-2 group-focus-within:ring-primary/40
                           hover:bg-primary/10"
            >
                <MagnifyingGlassIcon className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
            </button>
        </div>
    );
}
