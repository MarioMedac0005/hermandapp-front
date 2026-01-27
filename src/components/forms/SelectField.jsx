import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Label } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

export default function SelectField({ label, options, value, onChange, placeholder = "Select an option", className }) {
  const selectedName = value ? (options.find(opt => opt.value === value || opt.id === value)?.label || options.find(opt => opt.value === value || opt.id === value)?.name || value) : placeholder

  return (
    <div className={clsx("w-full mb-4", className)}> 
      <Listbox value={value} onChange={onChange}>
        {label && (
          <Label className="text-sm font-medium text-gray-700 mb-1 block">
            {label}
          </Label>
        )}
        <div className="relative mt-1">
          <ListboxButton className={clsx(
            "relative w-full cursor-default rounded-lg bg-white/50 py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-200",
            "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white sm:text-sm sm:leading-6",
            "transition-all duration-200 hover:ring-gray-300 hover:bg-gray-50/50"
          )}>
            <span className={clsx("block truncate", !value ? "text-gray-400" : "text-gray-900")}>
              {selectedName}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>
          
          <ListboxOptions 
            anchor="bottom start"
            className="w-[var(--button-width)] rounded-md border border-gray-200 bg-white py-1 text-base shadow-lg focus:outline-none sm:text-sm z-[100] max-h-60 overflow-auto transition duration-100 ease-in data-[leave]:opacity-0"
          >
            {options.map((option, personIdx) => (
              <ListboxOption
                key={option.id || option.value || personIdx}
                value={option.value || option.id}
                className="group relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 data-[focus]:bg-purple-100 data-[focus]:text-purple-900 data-[selected]:font-medium"
              >
                <>
                  <span className="block truncate font-normal group-data-[selected]:font-medium">
                    {option.label || option.name}
                  </span>
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600 group-[&:not([data-selected])]:hidden">
                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  )
}
