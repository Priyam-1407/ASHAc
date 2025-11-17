import clsx from 'clsx'
import type { ReactNode } from 'react'
import { getStatusClasses } from '../../utils/format'

interface StatusBadgeProps {
  status: string
  icon?: ReactNode
}

export const StatusBadge = ({ status, icon }: StatusBadgeProps) => (
  <span
    className={clsx(
      'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold',
      getStatusClasses(status),
    )}
  >
    {icon}
    {status}
  </span>
)


