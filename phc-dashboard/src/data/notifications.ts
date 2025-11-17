import type { NotificationItem } from '../types'

export const notificationSeeds: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Low stock alert',
    description: 'IFA tablets stock below minimum threshold',
    timestamp: '5 mins ago',
    type: 'Alert',
    read: false,
  },
  {
    id: 'notif-2',
    title: 'Follow-up reminder',
    description: 'ANC visit due for Sita Mahapatra tomorrow',
    timestamp: '18 mins ago',
    type: 'Reminder',
    read: false,
  },
  {
    id: 'notif-3',
    title: 'Worker offline',
    description: 'Ritika Devi last synced 25 mins ago',
    timestamp: '30 mins ago',
    type: 'Info',
    read: true,
  },
]

export const notificationTemplates = [
  'New high-risk pregnancy detected in Badagaon.',
  'Monthly report is ready for review.',
  'Cold chain temperature warning resolved.',
  'ASHA worker Madhu Jena has pending sync.',
  'New immunization schedule published.',
  'Weekly NCD screening target achieved.',
]


