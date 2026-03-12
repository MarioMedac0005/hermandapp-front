import { InputText } from "primereact/inputtext";
import { MagnifyingGlassIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function SearchInput({
    value,
    onChange,
    onSearch,
    placeholder = "Buscar hermandad o banda...",
}) {
    const handleKeyDown = e => {
        if (e.key === "Enter") {
            onSearch();
        }
    };

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-linear-to-r from-[#8a01e5]/20 to-purple-500/20 rounded-2xl blur-xl opacity-50 transition-opacity duration-300 group-focus-within:opacity-100"></div>
            
            <div className="relative flex w-full items-center bg-white/95 backdrop-blur-md rounded-2xl p-1.5 shadow-lg shadow-purple-900/5 border border-white/60 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#8a01e5]/30 focus-within:bg-white">
                
                <div className="pl-4 pr-3 flex items-center justify-center text-[#8a01e5]/60">
                    <MagnifyingGlassIcon className="h-6 w-6 stroke-[2px]" />
                </div>
                
                <InputText
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="w-full py-3.5 bg-transparent! border-none! shadow-none! text-gray-800 placeholder-gray-400/80 font-medium focus:ring-0! focus:outline-none! text-base lg:text-lg"
                />

                <button
                    type="button"
                    onClick={onSearch}
                    className="ml-2 flex justify-center items-center px-6 py-3.5 bg-[#8a01e5] hover:bg-[#7000b8] text-white font-semibold rounded-xl transition-all duration-300 active:scale-[0.98] shadow-md shadow-[#8a01e5]/20 whitespace-nowrap"
                >
                    Buscar
                    <ArrowRightIcon className="h-5 w-5 ml-2 stroke-[2.5px] hidden sm:block" />
                </button>
            </div>
        </div>
    );
}
