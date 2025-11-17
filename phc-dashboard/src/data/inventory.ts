import type { InventoryItem, StockTrendPoint } from '../types'

export const inventoryItems: InventoryItem[] = [
  {
    id: 'INV-001',
    name: 'Oral Polio Vaccine',
    category: 'Medicine',
    quantity: 240,
    minRequired: 200,
    lastUpdated: '2025-11-16',
  },
  {
    id: 'INV-002',
    name: 'Iron & Folic Acid Tablets',
    category: 'Medicine',
    quantity: 90,
    minRequired: 150,
    lastUpdated: '2025-11-15',
  },
  {
    id: 'INV-003',
    name: 'Digital Thermometers',
    category: 'Equipment',
    quantity: 35,
    minRequired: 40,
    lastUpdated: '2025-11-14',
  },
  {
    id: 'INV-004',
    name: 'BP Monitoring Kits',
    category: 'Equipment',
    quantity: 18,
    minRequired: 25,
    lastUpdated: '2025-11-15',
  },
  {
    id: 'INV-005',
    name: 'ORS Packets',
    category: 'Medicine',
    quantity: 520,
    minRequired: 400,
    lastUpdated: '2025-11-13',
  },
]

export const stockTrends: StockTrendPoint[] = [
  { month: 'Jun', vaccines: 320, supplements: 260, equipment: 95 },
  { month: 'Jul', vaccines: 300, supplements: 240, equipment: 90 },
  { month: 'Aug', vaccines: 310, supplements: 250, equipment: 85 },
  { month: 'Sep', vaccines: 290, supplements: 230, equipment: 80 },
  { month: 'Oct', vaccines: 305, supplements: 235, equipment: 78 },
  { month: 'Nov', vaccines: 295, supplements: 220, equipment: 75 },
]


