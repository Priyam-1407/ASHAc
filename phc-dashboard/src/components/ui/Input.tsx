import type { InputHTMLAttributes } from 'react'
import clsx from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  tone?: 'default' | 'light'
}

export const Input = ({
  label,
  helperText,
  className,
  tone = 'default',
  ...props
}: InputProps) => (
  <label
    className={clsx(
      'flex w-full flex-col gap-1 text-sm font-medium',
      tone === 'light'
        ? 'text-white/80'
        : 'text-slate-600 dark:text-slate-300',
    )}
  >
    {label && <span>{label}</span>}
    <input
      className={clsx(
        'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-primary-400 dark:focus:ring-primary-600/30',
        tone === 'light' && 'border-white/30 bg-white/90 text-slate-900',
        className,
      )}
      {...props}
    />
    {helperText && (
      <span className="text-xs font-normal text-slate-400 dark:text-slate-500">
        {helperText}
      </span>
    )}
  </label>
)


