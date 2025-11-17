import {
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from 'recharts'
import { Card } from '../components/ui/Card'
import { overviewStats, followUps, immunizationCoverage, patientTrend } from '../data/dashboard'
import { formatChange } from '../utils/format'
import { inventoryItems } from '../data/inventory'
import { CheckCircle2, TrendingDown, TrendingUp } from 'lucide-react'
import { StatusBadge } from '../components/ui/StatusBadge'

const pieColors = ['#0EA5E9', '#0F766E', '#14B8A6', '#6366F1']

export const DashboardOverview = () => {
  const lowStock = inventoryItems.filter((item) => item.quantity < item.minRequired)
  const pieData = immunizationCoverage.map((item) => ({
    name: item.label,
    value: item.value,
  }))

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewStats.map((stat) => (
          <Card key={stat.label} className="bg-gradient-to-br from-white to-primary-50/30 dark:from-slate-900 dark:to-slate-900/60">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{stat.label}</p>
            <div className="mt-4 flex items-end justify-between">
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              <span className={`flex items-center gap-1 text-sm font-semibold ${stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {stat.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {formatChange(stat.change)}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">vs last quarter</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Patient & Follow-up Trends" className="lg:col-span-2">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={patientTrend}>
                <Tooltip />
                <Line type="monotone" dataKey="patients" stroke="#0EA5E9" strokeWidth={3} />
                <Line type="monotone" dataKey="followUps" stroke="#16A34A" strokeDasharray="4 3" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Immunization Coverage by Cohort">
          <div className="h-80">
            <ResponsiveContainer>
              <PieChart>
                <Tooltip />
                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={120} label>
                  {pieData.map((entry, index) => (
                    <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Upcoming Follow-ups" subtitle="Priority interventions for the next 7 days">
          <div className="space-y-4">
            {followUps.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white/60 px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.patientName}</p>
                  <p className="text-xs text-slate-500">
                    {item.village} • Assigned to {item.assignedAsha}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-primary-600">{item.date}</p>
                  <StatusBadge status={item.type} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Low Stock Alerts" subtitle="Monitor critical drugs & devices">
          <div className="space-y-3">
            {lowStock.map((item) => {
              const deficit = item.minRequired - item.quantity
              return (
                <div key={item.id} className="flex items-center justify-between rounded-2xl border border-amber-100 bg-amber-50/60 px-4 py-3 text-sm shadow-sm">
                  <div>
                    <p className="font-semibold text-amber-900">{item.name}</p>
                    <p className="text-xs text-amber-700">Need {deficit} more units</p>
                  </div>
                  <StatusBadge status="Low Stock" />
                </div>
              )
            })}
            {!lowStock.length && (
              <p className="flex items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                <CheckCircle2 className="h-4 w-4" /> All items are sufficiently stocked.
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}


