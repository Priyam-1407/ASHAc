import { format, parseISO } from 'date-fns'
import clsx from 'clsx'

export const formatDate = (value: string, dateFormat = 'dd MMM yyyy') => {
  try {
    return format(parseISO(value), dateFormat)
  } catch {
    return value
  }
}

export const formatChange = (change: number) =>
  `${change > 0 ? '+' : ''}${change.toFixed(1)}%`

export const getStatusClasses = (status: string) => {
  switch (status) {
    case 'Healthy':
    case 'Active':
      return 'bg-emerald-50 text-emerald-700 border-emerald-100'
    case 'Follow-up Due':
    case 'Offline':
      return 'bg-amber-50 text-amber-700 border-amber-100'
    case 'Critical':
    case 'No Signal':
      return 'bg-rose-50 text-rose-700 border-rose-100'
    case 'Low Stock':
      return 'bg-amber-50 text-amber-700 border-amber-100'
    case 'Out of Stock':
      return 'bg-rose-50 text-rose-700 border-rose-100'
    case 'In Stock':
      return 'bg-emerald-50 text-emerald-700 border-emerald-100'
    case 'Immunization':
    case 'ANC':
    case 'NCD':
    case 'Post-natal':
      return 'bg-primary-50 text-primary-700 border-primary-100'
    case 'Pending':
      return 'bg-amber-50 text-amber-700 border-amber-100'
    case 'In Progress':
      return 'bg-blue-50 text-blue-700 border-blue-100'
    case 'Completed':
      return 'bg-emerald-50 text-emerald-700 border-emerald-100'
    default:
      return 'bg-slate-50 text-slate-600 border-slate-100'
  }
}

export const trendIndicatorStyles = (trend: 'up' | 'down') =>
  clsx(
    'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
    {
      'bg-emerald-50 text-emerald-700': trend === 'up',
      'bg-rose-50 text-rose-700': trend === 'down',
    },
  )


