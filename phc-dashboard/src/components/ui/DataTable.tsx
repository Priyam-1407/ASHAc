import clsx from 'clsx'
import type { ReactNode } from 'react'

export interface Column<T extends object> {
  key: keyof T | string
  header: string
  render?: (item: T) => ReactNode
  className?: string
}

interface DataTableProps<T extends object> {
  data: T[]
  columns: Column<T>[]
  emptyState?: string
  onRowClick?: (item: T) => void
}

export const DataTable = <T extends object>({
  data,
  columns,
  emptyState = 'No records found',
  onRowClick,
}: DataTableProps<T>) => {
  if (!data.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500 dark:border-slate-700">
        {emptyState}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-100 text-sm dark:divide-slate-800">
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)} className="px-4 py-3">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-900">
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className={clsx(
                onRowClick && 'cursor-pointer hover:bg-primary-50/60',
              )}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className={clsx('px-4 py-3 text-slate-700 dark:text-slate-200', column.className)}
                >
                  {column.render
                    ? column.render(item)
                    : String(
                        (item as Record<string, unknown>)[
                          column.key as string
                        ] ?? '—',
                      )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


