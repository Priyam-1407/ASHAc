import { useMemo, useState } from 'react'
import { inventoryItems as initialInventory, stockTrends } from '../data/inventory'
import type { InventoryItem } from '../types'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { Button } from '../components/ui/Button'
import { DataTable } from '../components/ui/DataTable'
import type { Column } from '../components/ui/DataTable'
import { Line, LineChart, ResponsiveContainer, Tooltip, Legend, CartesianGrid, XAxis, YAxis } from 'recharts'
import { StatusBadge } from '../components/ui/StatusBadge'
import { useNotifications } from '../contexts/NotificationContext'

const categoryOptions = [
  { label: 'All Items', value: 'all' },
  { label: 'Medicine', value: 'Medicine' },
  { label: 'Equipment', value: 'Equipment' },
]

export const InventoryManagement = () => {
  const { addNotification } = useNotifications()
  const [items, setItems] = useState<InventoryItem[]>(initialInventory)
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Medicine',
    quantity: 0,
    minRequired: 0,
  })

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        categoryFilter === 'all' || item.category === categoryFilter
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [items, categoryFilter, search])

  const handleAddItem = () => {
    const payload: InventoryItem = {
      id: `INV-${Date.now()}`,
      name: newItem.name,
      category: newItem.category as InventoryItem['category'],
      quantity: Number(newItem.quantity),
      minRequired: Number(newItem.minRequired),
      lastUpdated: new Date().toISOString().split('T')[0],
    }
    setItems((prev) => [payload, ...prev])
    if (payload.quantity < payload.minRequired) {
      addNotification(
        'Low stock alert',
        `${payload.name} added below minimum stock`,
      )
    }
    setNewItem({ name: '', category: 'Medicine', quantity: 0, minRequired: 0 })
  }

  const updateStock = (itemId: string, value: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item
        const updatedQuantity = Math.max(0, item.quantity + value)
        const updatedItem = {
          ...item,
          quantity: updatedQuantity,
          lastUpdated: new Date().toISOString().split('T')[0],
        }
        if (updatedQuantity < updatedItem.minRequired) {
          addNotification(
            'Low stock alert',
            `${updatedItem.name} below minimum threshold`,
          )
        }
        return updatedItem
      }),
    )
  }

  const columns: Column<InventoryItem>[] = [
    { key: 'name', header: 'Item Name' },
    { key: 'category', header: 'Category' },
    { key: 'quantity', header: 'Qty Available' },
    { key: 'minRequired', header: 'Min Required' },
    { key: 'lastUpdated', header: 'Last Updated' },
    {
      key: 'status',
      header: 'Status',
      render: (row) => {
        const status =
          row.quantity === 0
            ? 'Out of Stock'
            : row.quantity < row.minRequired
            ? 'Low Stock'
            : 'In Stock'
        return <StatusBadge status={status} />
      },
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="text-xs"
            onClick={() => updateStock(row.id, 10)}
          >
            +10
          </Button>
          <Button
            variant="ghost"
            className="text-xs"
            onClick={() => updateStock(row.id, -10)}
          >
            -10
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Inventory & Supplies
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Input
            placeholder="Search inventory items"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <Select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            options={categoryOptions}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Inventory Table
              </h3>
              <p className="text-sm text-slate-500">
                Auto-generated low stock alerts feed notifications
              </p>
            </div>
            <Button variant="secondary" onClick={() => window.print()}>
              Print stock
            </Button>
          </div>
          <DataTable data={filteredItems} columns={columns} />
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Add Inventory Item
            </h3>
            <div className="mt-4 space-y-3">
              <Input
                label="Item Name"
                value={newItem.name}
                onChange={(event) =>
                  setNewItem((prev) => ({ ...prev, name: event.target.value }))
                }
              />
              <Select
                label="Category"
                value={newItem.category}
                onChange={(event) =>
                  setNewItem((prev) => ({
                    ...prev,
                    category: event.target.value,
                  }))
                }
                options={categoryOptions.slice(1)}
              />
              <Input
                label="Quantity"
                type="number"
                value={newItem.quantity}
                onChange={(event) =>
                  setNewItem((prev) => ({
                    ...prev,
                    quantity: Number(event.target.value),
                  }))
                }
              />
              <Input
                label="Minimum Required"
                type="number"
                value={newItem.minRequired}
                onChange={(event) =>
                  setNewItem((prev) => ({
                    ...prev,
                    minRequired: Number(event.target.value),
                  }))
                }
              />
              <Button className="w-full" onClick={handleAddItem}>
                Save Item
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Stock Usage Trend
            </h3>
            <div className="mt-4 h-64">
              <ResponsiveContainer>
                <LineChart data={stockTrends}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="vaccines" stroke="#0EA5E9" />
                  <Line type="monotone" dataKey="supplements" stroke="#10B981" />
                  <Line type="monotone" dataKey="equipment" stroke="#6366F1" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


