import type { ChartSeriesPoint, FollowUpItem } from '../types'

export const overviewStats = [
  {
    label: 'Total Patients',
    value: '2,458',
    change: 8.4,
    trend: 'up',
  },
  {
    label: 'ASHA Workers',
    value: '132',
    change: 2.1,
    trend: 'up',
  },
  {
    label: 'Immunization Coverage',
    value: '92%',
    change: 1.4,
    trend: 'up',
  },
  {
    label: 'Low Stock Alerts',
    value: '6',
    change: -3.2,
    trend: 'down',
  },
]

export const followUps: FollowUpItem[] = [
  {
    id: 'fu-1',
    patientName: 'Sita Mahapatra',
    village: 'Brahmapur',
    date: '2025-11-19',
    assignedAsha: 'Kavita Dash',
    type: 'Immunization',
  },
  {
    id: 'fu-2',
    patientName: 'Rahul Singh',
    village: 'Badagaon',
    date: '2025-11-20',
    assignedAsha: 'Ritika Devi',
    type: 'NCD',
  },
  {
    id: 'fu-3',
    patientName: 'Neha Patnaik',
    village: 'Sorada',
    date: '2025-11-21',
    assignedAsha: 'Lata Kumari',
    type: 'ANC',
  },
  {
    id: 'fu-4',
    patientName: 'Deepak Sahu',
    village: 'Buguda',
    date: '2025-11-23',
    assignedAsha: 'Madhu Jena',
    type: 'Post-natal',
  },
]

export const immunizationCoverage: ChartSeriesPoint[] = [
  { label: '0-2 yrs', value: 95 },
  { label: '2-5 yrs', value: 90 },
  { label: '5-10 yrs', value: 87 },
  { label: '10-15 yrs', value: 82 },
]

export const patientTrend = [
  { month: 'Jun', patients: 1800, followUps: 320 },
  { month: 'Jul', patients: 1920, followUps: 340 },
  { month: 'Aug', patients: 2050, followUps: 360 },
  { month: 'Sep', patients: 2120, followUps: 390 },
  { month: 'Oct', patients: 2260, followUps: 410 },
  { month: 'Nov', patients: 2458, followUps: 430 },
]


