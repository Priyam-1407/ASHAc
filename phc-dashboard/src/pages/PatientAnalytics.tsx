import { useMemo, useState } from 'react'
import { patients } from '../data/patients'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { DataTable } from '../components/ui/DataTable'
import type { Column } from '../components/ui/DataTable'
import type { PatientRecord } from '../types'
import { StatusBadge } from '../components/ui/StatusBadge'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { formatDate } from '../utils/format'

const patientStatuses = [
  { label: 'All Status', value: 'all' },
  { label: 'Healthy', value: 'Healthy' },
  { label: 'Follow-up Due', value: 'Follow-up Due' },
  { label: 'Critical', value: 'Critical' },
]

const villages = [
  { label: 'All Villages', value: 'all' },
  ...Array.from(new Set(patients.map((patient) => patient.village))).map(
    (village) => ({ label: village, value: village }),
  ),
]

const workers = [
  { label: 'Any Worker', value: 'all' },
  ...Array.from(new Set(patients.map((patient) => patient.ashaWorker))).map(
    (worker) => ({ label: worker, value: worker }),
  ),
]

export const PatientAnalytics = () => {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [villageFilter, setVillageFilter] = useState('all')
  const [workerFilter, setWorkerFilter] = useState('all')
  const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(
    null,
  )
  const [assignModal, setAssignModal] = useState<PatientRecord | null>(null)

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(search.toLowerCase()) ||
        patient.id.toLowerCase().includes(search.toLowerCase())
      const matchesStatus =
        statusFilter === 'all' || patient.status === statusFilter
      const matchesVillage =
        villageFilter === 'all' || patient.village === villageFilter
      const matchesWorker =
        workerFilter === 'all' || patient.ashaWorker === workerFilter

      return matchesSearch && matchesStatus && matchesVillage && matchesWorker
    })
  }, [search, statusFilter, villageFilter, workerFilter])

  const columns: Column<PatientRecord>[] = [
    { key: 'id', header: 'Patient ID' },
    { key: 'name', header: 'Name' },
    { key: 'age', header: 'Age' },
    { key: 'village', header: 'Village' },
    { key: 'ashaWorker', header: 'ASHA Worker' },
    {
      key: 'lastCheckup',
      header: 'Last Check-up',
      render: (row) => formatDate(row.lastCheckup),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            className="text-xs"
            onClick={() => setSelectedPatient(row)}
          >
            View
          </Button>
          <Button
            variant="primary"
            className="text-xs"
            onClick={() => setAssignModal(row)}
          >
            Assign
          </Button>
          <Button
            variant="ghost"
            className="text-xs"
            onClick={() => window.alert('PDF download triggered')}
          >
            Export
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Patient Search & Filter
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Input
            placeholder="Search name, ID or family group"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <Select
            value={villageFilter}
            onChange={(event) => setVillageFilter(event.target.value)}
            options={villages}
          />
          <Select
            value={workerFilter}
            onChange={(event) => setWorkerFilter(event.target.value)}
            options={workers}
          />
          <Select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            options={patientStatuses}
          />
        </div>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Patient Records
            </h2>
            <p className="text-sm text-slate-500">
              {filteredPatients.length} records found
            </p>
          </div>
          <Button variant="secondary" onClick={() => window.print()}>
            Print summary
          </Button>
        </div>
        <DataTable data={filteredPatients} columns={columns} />
      </div>

      <Modal
        open={Boolean(selectedPatient)}
        onClose={() => setSelectedPatient(null)}
        title="Patient Summary"
        subtitle={selectedPatient?.id}
      >
        {selectedPatient && (
          <div className="space-y-4 text-sm">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">
                <p className="text-xs uppercase text-slate-500">Name</p>
                <p className="text-base font-semibold">{selectedPatient.name}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">
                <p className="text-xs uppercase text-slate-500">Village</p>
                <p className="text-base font-semibold">
                  {selectedPatient.village}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">
                <p className="text-xs uppercase text-slate-500">Status</p>
                <StatusBadge status={selectedPatient.status} />
              </div>
              <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">
                <p className="text-xs uppercase text-slate-500">Next Follow-up</p>
                <p className="text-base font-semibold">
                  {selectedPatient.upcomingFollowUp}
                </p>
              </div>
            </div>
            <Button
              variant="primary"
              className="w-full"
              onClick={() => window.alert('PDF report generated')}
            >
              Download Full Report
            </Button>
          </div>
        )}
      </Modal>

      <Modal
        open={Boolean(assignModal)}
        onClose={() => setAssignModal(null)}
        title="Assign / Change ASHA Worker"
        subtitle={assignModal?.name}
      >
        {assignModal && (
          <div className="space-y-4">
            <Select
              label="Select ASHA Worker"
              value={assignModal.ashaWorker}
              onChange={(event) =>
                setAssignModal({ ...assignModal, ashaWorker: event.target.value })
              }
              options={workers.slice(1)}
            />
            <Button
              className="w-full"
              onClick={() => {
                window.alert('ASHA worker reassigned (demo)')
                setAssignModal(null)
              }}
            >
              Save Assignment
            </Button>
          </div>
        )}
      </Modal>
    </div>
  )
}


