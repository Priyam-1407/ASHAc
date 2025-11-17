import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-xl border text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60'

const variants = {
  primary:
    'bg-primary-600 text-white border-primary-600 hover:bg-primary-700 focus-visible:outline-primary-500',
  secondary:
    'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 focus-visible:outline-primary-500 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700',
  ghost:
    'bg-transparent text-slate-600 border-transparent hover:bg-slate-100 focus-visible:outline-primary-500 dark:text-slate-300 dark:hover:bg-slate-800',
  danger:
    'bg-rose-600 text-white border-rose-600 hover:bg-rose-700 focus-visible:outline-rose-500',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
}

export const Button = ({
  className,
  variant = 'primary',
  children,
  ...props
}: ButtonProps) => (
  <button
    className={clsx(baseStyles, variants[variant], className)}
    {...props}
  >
    {children}
  </button>
)


