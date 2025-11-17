import type { SelectHTMLAttributes } from 'react'
import clsx from 'clsx'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { label: string; value: string }[]
}

export const Select = ({
  label,
  options,
  className,
  ...props
}: SelectProps) => (
  <label className="flex w-full flex-col gap-1 text-sm font-medium text-slate-600 dark:text-slate-300">
    {label && <span>{label}</span>}
    <select
      className={clsx(
        'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-primary-400 dark:focus:ring-primary-600/30',
        className,
      )}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
)


