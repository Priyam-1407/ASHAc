import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  chronicScreeningTrend,
  immunizationSeries,
  indicatorStats,
  maternalChildProgress,
} from '../data/reports'
import { Button } from '../components/ui/Button'
import { useState } from 'react'
import { Card } from '../components/ui/Card'
import { formatChange } from '../utils/format'

const timeframes = ['daily', 'weekly', 'monthly']

export const ReportsAnalytics = () => {
  const [timeframe, setTimeframe] = useState('monthly')

  return (
    <div className="space-y-6">
      <Card
        title="Indicators Dashboard"
        subtitle="Health KPIs generated from HMIS feeds"
        actions={
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => window.alert('Exported to Excel (demo)')}
            >
              Export Excel
            </Button>
            <Button
              onClick={() => window.alert('Exported to PDF (demo)')}
            >
              Export PDF
            </Button>
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {indicatorStats.map((indicator) => (
            <div
              key={indicator.title}
              className="rounded-2xl border border-slate-100 bg-white/80 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <p className="text-sm font-semibold text-slate-500">
                {indicator.title}
              </p>
              <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                {indicator.value}
              </p>
              <p
                className={`mt-2 text-sm font-semibold ${
                  indicator.change >= 0 ? 'text-emerald-600' : 'text-rose-500'
                }`}
              >
                {formatChange(indicator.change)} vs last month
              </p>
            </div>
          ))}
        </div>
      </Card>

      <Card
        title="Time-based Reporting"
        subtitle="Switch ranges to regenerate trends"
        actions={
          <div className="inline-flex rounded-full bg-slate-100 p-1 dark:bg-slate-800">
            {timeframes.map((range) => (
              <button
                key={range}
                className={`rounded-full px-4 py-1 text-xs font-semibold capitalize ${
                  timeframe === range
                    ? 'bg-white text-slate-900 shadow dark:bg-slate-900 dark:text-white'
                    : 'text-slate-500'
                }`}
                onClick={() => setTimeframe(range)}
              >
                {range}
              </button>
            ))}
          </div>
        }
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="font-semibold text-slate-900 dark:text-white">
              Immunization Coverage
            </p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={immunizationSeries}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="coverage"
                    stroke="#0EA5E9"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="font-semibold text-slate-900 dark:text-white">
              Maternal & Child Health Progress
            </p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={maternalChildProgress}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completed" fill="#10B981" />
                  <Bar dataKey="target" fill="#CBD5F5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="font-semibold text-slate-900 dark:text-white">
            Chronic Disease Screening Numbers
          </p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chronicScreeningTrend}>
                <CartesianGrid strokeDasharray="5 5" opacity={0.2} />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="screenings"
                  stroke="#F97316"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    </div>
  )
}


