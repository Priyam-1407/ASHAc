import { useMemo, useState } from 'react'
import { ashaWorkers } from '../data/ashaWorkers'
import type { AshaWorker } from '../types'
import { Input } from '../components/ui/Input'
import { DataTable } from '../components/ui/DataTable'
import type { Column } from '../components/ui/DataTable'
import { StatusBadge } from '../components/ui/StatusBadge'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { Select } from '../components/ui/Select'
import { useNotifications } from '../contexts/NotificationContext'

const statusOptions = [
  { label: 'All Status', value: 'all' },
  { label: 'Active', value: 'Active' },
  { label: 'Offline', value: 'Offline' },
  { label: 'No Signal', value: 'No Signal' },
]

export const AshaAnalytics = () => {
  const { addNotification } = useNotifications()
  const [selectedWorker, setSelectedWorker] = useState<AshaWorker | null>(
    ashaWorkers[0],
  )
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [taskModal, setTaskModal] = useState(false)
  const [alertModal, setAlertModal] = useState(false)
  const [taskPayload, setTaskPayload] = useState({
    title: '',
    priority: 'Medium',
    dueDate: '',
  })

  const filteredWorkers = useMemo(() => {
    return ashaWorkers.filter((worker) => {
      const matchesSearch =
        worker.name.toLowerCase().includes(search.toLowerCase()) ||
        worker.id.toLowerCase().includes(search.toLowerCase())
      const matchesStatus =
        statusFilter === 'all' || worker.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [search, statusFilter])

  const columns: Column<AshaWorker>[] = [
    { key: 'id', header: 'Worker ID' },
    { key: 'name', header: 'Name' },
    { key: 'village', header: 'Village' },
    {
      key: 'completionRate',
      header: '% Follow-ups',
      render: (row) => `${row.completionRate}%`,
    },
    {
      key: 'pendingVisits',
      header: 'Pending Visits',
    },
    { key: 'lastSync', header: 'Last Sync' },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            placeholder="Search by worker name or ID"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <DataTable
            data={filteredWorkers}
            columns={columns}
            onRowClick={(worker) => setSelectedWorker(worker)}
          />
        </div>
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {selectedWorker ? (
            <div className="space-y-5">
              <div>
                <p className="text-xs uppercase text-slate-400">
                  Selected Worker
                </p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">
                  {selectedWorker.name}
                </p>
                <p className="text-sm text-slate-500">
                  {selectedWorker.village} • {selectedWorker.id}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 text-sm dark:bg-slate-800">
                <p>
                  Follow-ups completion{' '}
                  <span className="font-semibold">
                    {selectedWorker.completionRate}%
                  </span>
                </p>
                <p>
                  Pending household visits:{' '}
                  <span className="font-semibold">
                    {selectedWorker.pendingVisits}
                  </span>
                </p>
                <p>Last sync: {selectedWorker.lastSync}</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Assigned Households
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedWorker.assignedHouseholds.map((household) => (
                    <span
                      key={household}
                      className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700"
                    >
                      {household}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Tasks
                </p>
                <div className="mt-2 space-y-2">
                  {selectedWorker.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="rounded-2xl border border-slate-100 p-3 text-xs dark:border-slate-700"
                    >
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {task.title}
                      </p>
                      <p className="text-slate-500">
                        {task.priority} • Due {task.dueDate}
                      </p>
                      <StatusBadge status={task.status} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button onClick={() => setTaskModal(true)}>Assign Task</Button>
                <Button
                  variant="secondary"
                  onClick={() => setAlertModal(true)}
                >
                  Send Reminder
                </Button>
              </div>
            </div>
          ) : (
            <p>Select a worker to view details.</p>
          )}
        </div>
      </div>

      <Modal
        open={taskModal}
        onClose={() => setTaskModal(false)}
        title="Assign Task"
        subtitle={selectedWorker?.name}
      >
        <div className="space-y-4">
          <Input
            label="Task Title"
            value={taskPayload.title}
            onChange={(event) =>
              setTaskPayload((prev) => ({ ...prev, title: event.target.value }))
            }
          />
          <Select
            label="Priority"
            value={taskPayload.priority}
            onChange={(event) =>
              setTaskPayload((prev) => ({
                ...prev,
                priority: event.target.value,
              }))
            }
            options={[
              { label: 'High', value: 'High' },
              { label: 'Medium', value: 'Medium' },
              { label: 'Low', value: 'Low' },
            ]}
          />
          <Input
            label="Due Date"
            type="date"
            value={taskPayload.dueDate}
            onChange={(event) =>
              setTaskPayload((prev) => ({
                ...prev,
                dueDate: event.target.value,
              }))
            }
          />
          <Button
            className="w-full"
            onClick={() => {
              addNotification(
                'Task assigned',
                `${selectedWorker?.name} received “${taskPayload.title}”`,
              )
              setTaskModal(false)
              setTaskPayload({ title: '', priority: 'Medium', dueDate: '' })
            }}
          >
            Save Task
          </Button>
        </div>
      </Modal>

      <Modal
        open={alertModal}
        onClose={() => setAlertModal(false)}
        title="Send Alert / Reminder"
        subtitle={selectedWorker?.name}
      >
        <div className="space-y-4">
          <Input label="Message" placeholder="Enter alert message" />
          <Button
            className="w-full"
            onClick={() => {
              addNotification(
                'Reminder sent',
                `${selectedWorker?.name} notified successfully`,
              )
              setAlertModal(false)
            }}
          >
            Send Alert
          </Button>
        </div>
      </Modal>
    </div>
  )
}


