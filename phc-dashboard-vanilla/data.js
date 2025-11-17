export const overviewStats = [
  { label: 'Total Patients', value: 2458, change: 8.4, trend: 'up' },
  { label: 'ASHA Workers', value: 132, change: 2.1, trend: 'up' },
  { label: 'Immunization Coverage', value: 92, suffix: '%', change: 1.4, trend: 'up' },
  { label: 'Low Stock Alerts', value: 6, change: -3.2, trend: 'down' },
]

export const followUps = [
  { name: 'Sita Mahapatra', village: 'Brahmapur', asha: 'Kavita Dash', date: '19 Nov', type: 'ANC' },
  { name: 'Rahul Singh', village: 'Badagaon', asha: 'Ritika Devi', date: '20 Nov', type: 'Immunization' },
  { name: 'Neha Patnaik', village: 'Sorada', asha: 'Lata Kumari', date: '21 Nov', type: 'High Risk' },
  { name: 'Deepak Sahu', village: 'Buguda', asha: 'Madhu Jena', date: '23 Nov', type: 'NCD' },
]

export const patientTrend = [
  { month: 'Jun', patients: 1800, followups: 320 },
  { month: 'Jul', patients: 1920, followups: 340 },
  { month: 'Aug', patients: 2050, followups: 360 },
  { month: 'Sep', patients: 2120, followups: 390 },
  { month: 'Oct', patients: 2260, followups: 410 },
  { month: 'Nov', patients: 2458, followups: 430 },
]

export const immunizationBreakdown = [
  { label: '0 - 2 years', value: 95 },
  { label: '2 - 5 years', value: 90 },
  { label: '5 - 10 years', value: 87 },
  { label: '10 - 15 years', value: 82 },
]

export const patients = [
  {
    id: 'PT-2045',
    name: 'Sita Mahapatra',
    age: 28,
    village: 'Brahmapur',
    asha: 'Kavita Dash',
    lastCheckup: '10 Nov 2025',
    status: 'Follow-up Due',
    category: 'Maternal',
    contact: '+91-98765-43210',
    followUp: '19 Nov 2025',
  },
  {
    id: 'PT-2191',
    name: 'Rahul Singh',
    age: 7,
    village: 'Badagaon',
    asha: 'Ritika Devi',
    lastCheckup: '05 Nov 2025',
    status: 'Healthy',
    category: 'Child',
    contact: '+91-98765-77710',
    followUp: '01 Dec 2025',
  },
  {
    id: 'PT-2301',
    name: 'Deepak Sahu',
    age: 45,
    village: 'Buguda',
    asha: 'Madhu Jena',
    lastCheckup: '12 Nov 2025',
    status: 'Follow-up Due',
    category: 'Chronic',
    contact: '+91-99765-52210',
    followUp: '23 Nov 2025',
  },
  {
    id: 'PT-2442',
    name: 'Neha Patnaik',
    age: 24,
    village: 'Sorada',
    asha: 'Lata Kumari',
    lastCheckup: '01 Nov 2025',
    status: 'Critical',
    category: 'Maternal',
    contact: '+91-99765-55510',
    followUp: '18 Nov 2025',
  },
  {
    id: 'PT-2550',
    name: 'Sanjay Rao',
    age: 63,
    village: 'Aska',
    asha: 'Vidya Sethi',
    lastCheckup: '08 Nov 2025',
    status: 'Healthy',
    category: 'Chronic',
    contact: '+91-98165-21210',
    followUp: '02 Dec 2025',
  },
]

export const ashaWorkers = [
  {
    id: 'AW-101',
    name: 'Kavita Dash',
    village: 'Brahmapur',
    completion: 94,
    pending: 4,
    status: 'Active',
    lastSync: '10 mins ago',
    households: ['HH-320', 'HH-322', 'HH-329'],
    tasks: [
      { title: 'ANC visit - Sita', priority: 'High', due: '19 Nov', status: 'In Progress' },
      { title: 'Immunization follow-up', priority: 'Medium', due: '22 Nov', status: 'Pending' },
    ],
  },
  {
    id: 'AW-109',
    name: 'Ritika Devi',
    village: 'Badagaon',
    completion: 88,
    pending: 6,
    status: 'Offline',
    lastSync: '25 mins ago',
    households: ['HH-210', 'HH-217', 'HH-225', 'HH-227'],
    tasks: [
      { title: 'Household survey update', priority: 'Low', due: '25 Nov', status: 'Pending' },
    ],
  },
  {
    id: 'AW-115',
    name: 'Madhu Jena',
    village: 'Buguda',
    completion: 80,
    pending: 9,
    status: 'No Signal',
    lastSync: '1 hr ago',
    households: ['HH-410', 'HH-415'],
    tasks: [
      { title: 'NCD screening drive', priority: 'High', due: '21 Nov', status: 'Pending' },
    ],
  },
  {
    id: 'AW-121',
    name: 'Lata Kumari',
    village: 'Sorada',
    completion: 97,
    pending: 2,
    status: 'Active',
    lastSync: '5 mins ago',
    households: ['HH-510', 'HH-511', 'HH-512'],
    tasks: [
      { title: 'Post-natal visit schedule', priority: 'Medium', due: '18 Nov', status: 'Completed' },
    ],
  },
]

export const indicatorStats = [
  { title: 'Maternal Health Index', value: '82%', change: 3.1 },
  { title: 'Child Nutrition Score', value: '76%', change: 1.8 },
  { title: 'NCD Screening Rate', value: '68%', change: -0.6 },
  { title: 'High-Risk Tracking', value: '92%', change: 2.4 },
]

export const maternalChildProgress = [
  { label: 'ANC Visits', completed: 86, target: 100 },
  { label: 'Institutional Deliveries', completed: 92, target: 100 },
  { label: 'Postnatal Visits', completed: 78, target: 100 },
]

export const chronicScreeningTrend = [
  { label: 'Week 1', value: 420 },
  { label: 'Week 2', value: 460 },
  { label: 'Week 3', value: 510 },
  { label: 'Week 4', value: 560 },
]

export const inventoryItems = [
  { id: 'INV-001', name: 'Oral Polio Vaccine', category: 'Medicine', quantity: 240, min: 200, updated: '16 Nov' },
  { id: 'INV-002', name: 'Iron & Folic Acid', category: 'Medicine', quantity: 90, min: 150, updated: '15 Nov' },
  { id: 'INV-003', name: 'Digital Thermometers', category: 'Equipment', quantity: 35, min: 40, updated: '14 Nov' },
  { id: 'INV-004', name: 'BP Monitoring Kits', category: 'Equipment', quantity: 18, min: 25, updated: '15 Nov' },
  { id: 'INV-005', name: 'ORS Packets', category: 'Medicine', quantity: 520, min: 400, updated: '13 Nov' },
]

export const stockTrends = [
  { label: 'Jun', vaccines: 320, supplements: 260, equipment: 95 },
  { label: 'Jul', vaccines: 300, supplements: 240, equipment: 90 },
  { label: 'Aug', vaccines: 310, supplements: 250, equipment: 85 },
  { label: 'Sep', vaccines: 290, supplements: 230, equipment: 80 },
  { label: 'Oct', vaccines: 305, supplements: 235, equipment: 78 },
  { label: 'Nov', vaccines: 295, supplements: 220, equipment: 75 },
]

export const notificationsSeed = [
  { title: 'Low stock alert', body: 'IFA tablets below minimum threshold', type: 'alert' },
  { title: 'Follow-up reminder', body: 'ANC visit due for Sita tomorrow', type: 'reminder' },
  { title: 'Worker offline', body: 'Ritika Devi last synced 25 mins ago', type: 'info' },
]

export const settingsOptions = [
  { key: 'alerts', title: 'Critical Alerts', description: 'SMS + in-app alerts for high risk cases', enabled: true },
  { key: 'autosync', title: 'Auto Sync Worker Data', description: 'Pull ASHA sync every 30 mins', enabled: true },
  { key: 'offline', title: 'Offline Indicator', description: 'Show weak/no signal badges', enabled: true },
  { key: 'dark', title: 'Dark Mode', description: 'Dim interface for night shifts', enabled: false },
  { key: 'beta', title: 'Try Beta Modules', description: 'Enable experimental analytics', enabled: false },
]


