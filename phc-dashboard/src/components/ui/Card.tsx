import clsx from 'clsx'
import type { PropsWithChildren } from 'react'

interface CardProps {
  title?: string
  subtitle?: string
  actions?: React.ReactNode
  className?: string
}

export const Card = ({
  children,
  title,
  subtitle,
  actions,
  className,
}: PropsWithChildren<CardProps>) => (
  <section
    className={clsx(
      'rounded-2xl border border-slate-100 bg-white p-6 shadow-sm shadow-primary-100/10 dark:border-slate-800 dark:bg-slate-900',
      className,
    )}
  >
    {(title || actions) && (
      <header className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          {title && (
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
        {actions}
      </header>
    )}
    <div>{children}</div>
  </section>
)


