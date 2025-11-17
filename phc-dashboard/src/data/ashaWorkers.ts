import type { AshaWorker } from '../types'

export const ashaWorkers: AshaWorker[] = [
  {
    id: 'AW-101',
    name: 'Kavita Dash',
    village: 'Brahmapur',
    completionRate: 94,
    pendingVisits: 4,
    lastSync: '10 mins ago',
    status: 'Active',
    assignedHouseholds: ['HH-320', 'HH-322', 'HH-329'],
    completedVisits: 46,
    tasks: [
      {
        id: 'task-1',
        title: 'ANC visit - Sita Mahapatra',
        priority: 'High',
        dueDate: '2025-11-19',
        status: 'In Progress',
      },
      {
        id: 'task-2',
        title: 'Immunization follow-up',
        priority: 'Medium',
        dueDate: '2025-11-22',
        status: 'Pending',
      },
    ],
  },
  {
    id: 'AW-109',
    name: 'Ritika Devi',
    village: 'Badagaon',
    completionRate: 88,
    pendingVisits: 6,
    lastSync: '25 mins ago',
    status: 'Offline',
    assignedHouseholds: ['HH-210', 'HH-217', 'HH-225', 'HH-227'],
    completedVisits: 38,
    tasks: [
      {
        id: 'task-3',
        title: 'Household survey updates',
        priority: 'Low',
        dueDate: '2025-11-25',
        status: 'Pending',
      },
    ],
  },
  {
    id: 'AW-115',
    name: 'Madhu Jena',
    village: 'Buguda',
    completionRate: 80,
    pendingVisits: 9,
    lastSync: '1 hr ago',
    status: 'No Signal',
    assignedHouseholds: ['HH-410', 'HH-415'],
    completedVisits: 30,
    tasks: [
      {
        id: 'task-4',
        title: 'Chronic disease screening',
        priority: 'High',
        dueDate: '2025-11-21',
        status: 'Pending',
      },
    ],
  },
  {
    id: 'AW-121',
    name: 'Lata Kumari',
    village: 'Sorada',
    completionRate: 97,
    pendingVisits: 2,
    lastSync: '5 mins ago',
    status: 'Active',
    assignedHouseholds: ['HH-510', 'HH-511', 'HH-512'],
    completedVisits: 52,
    tasks: [
      {
        id: 'task-5',
        title: 'Post-natal visit schedule',
        priority: 'Medium',
        dueDate: '2025-11-18',
        status: 'Completed',
      },
    ],
  },
]


