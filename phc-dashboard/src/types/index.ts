export type PatientStatus = 'Healthy' | 'Follow-up Due' | 'Critical'

export interface PatientRecord {
  id: string
  name: string
  age: number
  village: string
  ashaWorker: string
  healthCategory: 'Maternal' | 'Child' | 'Chronic' | 'General'
  lastCheckup: string
  status: PatientStatus
  upcomingFollowUp?: string
  contactNumber?: string
}

export type WorkerStatus = 'Active' | 'Offline' | 'No Signal'

export interface AshaWorker {
  id: string
  name: string
  village: string
  completionRate: number
  pendingVisits: number
  lastSync: string
  status: WorkerStatus
  assignedHouseholds: string[]
  completedVisits: number
  tasks: WorkerTask[]
}

export interface WorkerTask {
  id: string
  title: string
  priority: 'Low' | 'Medium' | 'High'
  dueDate: string
  status: 'Pending' | 'In Progress' | 'Completed'
}

export interface InventoryItem {
  id: string
  name: string
  category: 'Medicine' | 'Equipment'
  quantity: number
  minRequired: number
  lastUpdated: string
}

export interface NotificationItem {
  id: string
  title: string
  description: string
  timestamp: string
  type: 'Alert' | 'Info' | 'Reminder'
  read: boolean
}

export interface FollowUpItem {
  id: string
  patientName: string
  village: string
  date: string
  assignedAsha: string
  type: 'Immunization' | 'ANC' | 'NCD' | 'Post-natal'
}

export interface ReportIndicator {
  title: string
  value: string
  change: number
}

export interface StockTrendPoint {
  month: string
  vaccines: number
  supplements: number
  equipment: number
}

export interface ChartSeriesPoint {
  label: string
  value: number
}


