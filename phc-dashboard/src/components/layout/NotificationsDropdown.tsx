import { Bell, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { useNotifications } from '../../contexts/NotificationContext'
import clsx from 'clsx'

export const NotificationsDropdown = () => {
  const { notifications, unreadCount, markAllAsRead, markAsRead } =
    useNotifications()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        className={clsx(
          'relative rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-primary-200 hover:text-primary-600 dark:border-slate-700',
          open && 'border-primary-300 text-primary-600',
        )}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 z-40 mt-3 w-80 rounded-2xl border border-slate-100 bg-white p-4 text-sm shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-semibold text-slate-900 dark:text-white">
              Notifications
            </p>
            <button
              className="text-xs font-semibold text-primary-600"
              onClick={markAllAsRead}
            >
              Mark all read
            </button>
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {notifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={clsx(
                  'w-full rounded-2xl border px-3 py-2 text-left transition',
                  notification.read
                    ? 'border-slate-100 bg-slate-50/60 text-slate-500 dark:border-slate-800 dark:bg-slate-900'
                    : 'border-primary-100 bg-primary-50/70 text-slate-900 dark:border-primary-900 dark:bg-primary-950/40 dark:text-white',
                )}
              >
                <p className="text-sm font-semibold">{notification.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {notification.description}
                </p>
                <div className="mt-1 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{notification.timestamp}</span>
                  {!notification.read && (
                    <span className="inline-flex items-center gap-1 text-primary-600">
                      <CheckCircle className="h-3.5 w-3.5" /> New
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


