import { Field, Input, Label, Description } from '@headlessui/react'
import clsx from 'clsx'

export default function InputField({ label, description, className, ...props }) {
  return (
    <div className={clsx("w-full mb-4", className)}>
      <Field>
        {label && (
          <Label className="text-sm/6 font-medium text-gray-700 mb-1 block">
            {label}
          </Label>
        )}
        {description && (
          <Description className="text-sm/6 text-gray-500 mb-2">
            {description}
          </Description>
        )}
        <Input
          {...props}
          className={clsx(
            "block w-full rounded-lg border-none bg-white/50 py-2 px-3 text-sm/6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200",
            "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-purple-500 data-focus:bg-white",
            "placeholder:text-gray-400 transition-all duration-200 ease-out",
            "hover:ring-gray-300 hover:bg-gray-50/50"
          )}
        />
      </Field>
    </div>
  )
}
