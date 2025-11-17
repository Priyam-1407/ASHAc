import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { PropsWithChildren } from 'react'
import { notificationSeeds, notificationTemplates } from '../data/notifications'
import type { NotificationItem } from '../types'

interface NotificationContextValue {
  notifications: NotificationItem[]
  unreadCount: number
  addNotification: (title: string, description: string) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
}

const NotificationContext = createContext<
  NotificationContextValue | undefined
>(undefined)

const randomTemplate = () =>
  notificationTemplates[
    Math.floor(Math.random() * notificationTemplates.length)
  ]

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(notificationSeeds)

  const addNotification = (title: string, description: string) => {
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title,
        description,
        timestamp: 'Just now',
        type: 'Info',
        read: false,
      },
      ...prev,
    ])
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  useEffect(() => {
    const interval = window.setInterval(() => {
      addNotification('Update', randomTemplate())
    }, 20000)
    return () => window.clearInterval(interval)
  }, [])

  const value = useMemo(
    () => ({
      notifications,
      unreadCount: notifications.filter((item) => !item.read).length,
      addNotification,
      markAsRead,
      markAllAsRead,
    }),
    [notifications],
  )

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider')
  }
  return context
}


