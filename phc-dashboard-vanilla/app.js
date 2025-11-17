import {
  overviewStats,
  followUps,
  patientTrend,
  immunizationBreakdown,
  patients,
  ashaWorkers,
  indicatorStats,
  maternalChildProgress,
  chronicScreeningTrend,
  inventoryItems as inventorySeed,
  stockTrends,
  notificationsSeed,
  settingsOptions,
} from './data.js'

const CREDENTIALS = {
  username: 'priyam@2006',
  password: 'priyam123',
}

const navItems = [
  { key: 'dashboard', icon: '🏥', label: { en: 'Dashboard Overview', hi: 'डैशबोर्ड', od: 'ଡାଶବୋର୍ଡ' } },
  { key: 'patients', icon: '🧑‍⚕️', label: { en: 'Patient Analytics', hi: 'मरीज विश्लेषण', od: 'ରୋଗୀ ବିଶ୍ଳେଷଣ' } },
  { key: 'asha', icon: '👩‍🌾', label: { en: 'ASHA Worker Analytics', hi: 'आशा विश्लेषण', od: 'ଆଶା ବିଶ୍ଳେଷଣ' } },
  { key: 'reports', icon: '📊', label: { en: 'Reports & Analytics', hi: 'रिपोर्ट्स', od: 'ରିପୋର୍ଟ' } },
  { key: 'inventory', icon: '📦', label: { en: 'Inventory & Supplies', hi: 'भंडार', od: 'ଭଣ୍ଡାର' } },
  { key: 'settings', icon: '⚙️', label: { en: 'Settings', hi: 'सेटिंग्स', od: 'ସେଟିଂସ୍' } },
]

const dictionary = {
  en: { actions: { followups: 'Upcoming Follow-ups', lowStock: 'Low Stock Alerts' } },
  hi: { actions: { followups: 'आगामी फॉलो-अप', lowStock: 'कम भंडार चेतावनी' } },
  od: { actions: { followups: 'ଆସନ୍ତା ଫଲୋ-ଅପ୍', lowStock: 'କମ୍ ଷ୍ଟକ୍ ସତର୍କ' } },
}

const chartRegistry = {}

const state = {
  user: null,
  activePage: 'dashboard',
  language: 'en',
  theme: 'light',
  notifications: [...notificationsSeed],
  patientFilters: {
    search: '',
    status: 'all',
    village: 'all',
  },
  selectedWorker: ashaWorkers[0]?.id ?? null,
  inventory: [...inventorySeed],
  settings: settingsOptions.reduce((acc, item) => ({ ...acc, [item.key]: item.enabled }), {}),
}

const loginView = document.getElementById('login-view')
const shellView = document.getElementById('app-shell')
const sidebar = document.getElementById('sidebar')
const contentArea = document.getElementById('content-area')
const pageTitle = document.getElementById('page-title')
const notifPanel = document.getElementById('notif-panel')
const notifCount = document.getElementById('notif-count')
const toastContainer = document.getElementById('toast-container')
const modalRoot = document.getElementById('modal-root')
const modalTitle = document.getElementById('modal-title')
const modalSubtitle = document.getElementById('modal-subtitle')
const modalBody = document.getElementById('modal-body')

document.addEventListener('DOMContentLoaded', () => {
  bindCoreEvents()
  startNotificationTicker()
})

function bindCoreEvents() {
  document.getElementById('login-form').addEventListener('submit', handleLogin)
  document.getElementById('logout-btn').addEventListener('click', handleLogout)
  document.getElementById('language-select').addEventListener('change', (event) => {
    state.language = event.target.value
    renderShell()
  })
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme)
  document.getElementById('notif-toggle').addEventListener('click', (event) => {
    event.stopPropagation()
    notifPanel.classList.toggle('hidden')
    renderNotifications()
  })
  document.addEventListener('click', (event) => {
    if (!notifPanel.contains(event.target) && event.target.id !== 'notif-toggle') {
      notifPanel.classList.add('hidden')
    }
  })
  sidebar.addEventListener('click', (event) => {
    const button = event.target.closest('[data-page]')
    if (!button) return
    state.activePage = button.dataset.page
    renderShell()
  })
  contentArea.addEventListener('click', handleContentClick)
  document.getElementById('modal-close').addEventListener('click', closeModal)
  modalRoot.addEventListener('click', (event) => {
    if (event.target === modalRoot) closeModal()
  })
}

function handleLogin(event) {
  event.preventDefault()
  const username = document.getElementById('login-username').value.trim()
  const password = document.getElementById('login-password').value.trim()
  const errorEl = document.getElementById('login-error')

  if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
    state.user = { name: 'Dr. Meera Patil' }
    errorEl.textContent = ''
    renderShell()
  } else {
    errorEl.textContent = 'Invalid credentials. Try priyam@2006 / priyam123'
  }
}

function handleLogout() {
  state.user = null
  renderShell()
}

function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light'
  document.body.classList.toggle('dark', state.theme === 'dark')
  document.getElementById('theme-toggle').textContent = state.theme === 'light' ? '🌙' : '☀️'
}

function startNotificationTicker() {
  setInterval(() => {
    if (!state.user) return
    const payloads = [
      'New high-risk pregnancy detected in Badagaon.',
      'Monthly report is ready for review.',
      'Cold chain temperature warning resolved.',
      'ASHA worker Madhu Jena pending sync.',
      'New immunization schedule published.',
    ]
    const message = payloads[Math.floor(Math.random() * payloads.length)]
    state.notifications.unshift({ title: 'Update', body: message, type: 'info' })
    state.notifications = state.notifications.slice(0, 6)
    renderNotifications()
    showToast(message)
  }, 25000)
}

function renderShell() {
  const loggedIn = Boolean(state.user)
  loginView.classList.toggle('hidden', loggedIn)
  shellView.classList.toggle('hidden', !loggedIn)
  if (!loggedIn) return
  renderSidebar()
  renderTopbar()
  renderNotifications()
  renderPage()
}

function renderSidebar() {
  const list = navItems
    .map(
      (item) => `
        <li>
          <button data-page="${item.key}" class="${state.activePage === item.key ? 'active' : ''}">
            <span>${item.icon}</span>
            <span>${item.label[state.language] || item.label.en}</span>
          </button>
        </li>
      `,
    )
    .join('')

  sidebar.innerHTML = `
    <div>
      <h3>PHC Command</h3>
      <p class="muted small">${state.notifications.filter((n) => n.type === 'alert').length} live alerts</p>
    </div>
    <ul class="nav-list">${list}</ul>
    <div>
      <p class="muted small">Offline indicators live</p>
      <p>3 ASHA workers have weak/no signal.</p>
    </div>
  `
}

function renderTopbar() {
  const activeNav = navItems.find((item) => item.key === state.activePage)
  pageTitle.textContent = activeNav?.label[state.language] || activeNav?.label.en || 'Dashboard'
}

function renderNotifications() {
  notifCount.textContent = state.notifications.length
  notifPanel.innerHTML = `
    <h4>Notifications</h4>
    <ul>
      ${state.notifications
        .map(
          (notif) => `
          <li>
            <strong>${notif.title}</strong>
            <p class="muted small">${notif.body}</p>
          </li>
        `,
        )
        .join('')}
    </ul>
  `
}

function renderPage() {
  switch (state.activePage) {
    case 'dashboard':
      renderDashboard()
      break
    case 'patients':
      renderPatientsPage()
      break
    case 'asha':
      renderAshaPage()
      break
    case 'reports':
      renderReportsPage()
      break
    case 'inventory':
      renderInventoryPage()
      break
    case 'settings':
      renderSettingsPage()
      break
    default:
      renderDashboard()
  }
}

function renderDashboard() {
  const cards = overviewStats
    .map(
      (stat) => `
      <article class="card">
        <p class="muted small">${stat.label}</p>
        <p class="stat-value">${stat.value}${stat.suffix || ''}</p>
        <p class="trend ${stat.trend === 'up' ? 'up' : 'down'}">
          ${stat.trend === 'up' ? '▲' : '▼'} ${stat.change}% vs last quarter
        </p>
      </article>
    `,
    )
    .join('')

  const followList = followUps
    .map(
      (item) => `
        <div class="card">
          <strong>${item.name}</strong>
          <p class="muted small">${item.village} · ${item.asha}</p>
          <p class="badge-soft badge-warning">${item.type}</p>
          <p class="muted small">Due ${item.date}</p>
        </div>
      `,
    )
    .join('')

  const lowStock = state.inventory.filter((item) => item.quantity < item.min)

  const lowStockList = lowStock.length
    ? lowStock
        .map(
          (item) => `
        <div class="card">
          <strong>${item.name}</strong>
          <p class="muted small">${item.quantity} / ${item.min} units</p>
          <p class="badge-soft badge-critical">Need ${item.min - item.quantity} units</p>
        </div>
      `,
        )
        .join('')
    : '<div class="card"><strong>All stocked</strong><p class="muted small">No low stock alerts</p></div>'

  contentArea.innerHTML = `
    <section class="grid cards">${cards}</section>
    <section class="grid" style="grid-template-columns: minmax(0,2fr) minmax(0,1fr);">
      <article class="card">
        <h3>Patient & follow-up trends</h3>
        <canvas id="lineChart" height="220"></canvas>
      </article>
      <article class="card">
        <h3>Immunization coverage</h3>
        <canvas id="pieChart" height="220"></canvas>
      </article>
    </section>
    <section class="grid" style="grid-template-columns: repeat(auto-fit,minmax(260px,1fr));">
      <div>
        <h3>${dictionary[state.language]?.actions.followups || 'Upcoming Follow-ups'}</h3>
        <div class="grid">${followList}</div>
      </div>
      <div>
        <h3>${dictionary[state.language]?.actions.lowStock || 'Low Stock Alerts'}</h3>
        <div class="grid">${lowStockList}</div>
      </div>
    </section>
  `

  mountChart('lineChart', {
    type: 'line',
    data: {
      labels: patientTrend.map((entry) => entry.month),
      datasets: [
        {
          label: 'Patients',
          data: patientTrend.map((entry) => entry.patients),
          borderColor: '#2563eb',
          tension: 0.4,
          borderWidth: 3,
          fill: false,
        },
        {
          label: 'Follow-ups',
          data: patientTrend.map((entry) => entry.followups),
          borderColor: '#10b981',
          borderDash: [6, 4],
          tension: 0.4,
          borderWidth: 3,
          fill: false,
        },
      ],
    },
    options: { responsive: true, plugins: { legend: { display: true } } },
  })

  mountChart('pieChart', {
    type: 'doughnut',
    data: {
      labels: immunizationBreakdown.map((entry) => entry.label),
      datasets: [
        {
          data: immunizationBreakdown.map((entry) => entry.value),
          backgroundColor: ['#2563eb', '#0ea5e9', '#14b8a6', '#6366f1'],
        },
      ],
    },
    options: { responsive: true, plugins: { legend: { position: 'bottom' } } },
  })
}

function renderPatientsPage() {
  const filters = state.patientFilters
  const villages = ['all', ...new Set(patients.map((p) => p.village))]
  const statuses = ['all', 'Healthy', 'Follow-up Due', 'Critical']

  const filtered = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      patient.id.toLowerCase().includes(filters.search.toLowerCase())
    const matchesVillage = filters.village === 'all' || patient.village === filters.village
    const matchesStatus = filters.status === 'all' || patient.status === filters.status
    return matchesSearch && matchesVillage && matchesStatus
  })

  contentArea.innerHTML = `
    <section class="card">
      <h3>Patient search & filter</h3>
      <div class="form-row">
        <label>
          Search
          <input type="text" id="patient-search" placeholder="Search by name or ID" value="${filters.search}" />
        </label>
        <label>
          Village
          <select id="patient-village">
            ${villages.map((v) => `<option value="${v}" ${filters.village === v ? 'selected' : ''}>${v === 'all' ? 'All villages' : v}</option>`).join('')}
          </select>
        </label>
        <label>
          Status
          <select id="patient-status">
            ${statuses.map((s) => `<option value="${s}" ${filters.status === s ? 'selected' : ''}>${s === 'all' ? 'All status' : s}</option>`).join('')}
          </select>
        </label>
      </div>
    </section>
    <section class="card">
      <header class="actions" style="justify-content: space-between;">
        <div>
          <h3>Patient records</h3>
          <p class="muted small">${filtered.length} records found</p>
        </div>
        <button class="btn ghost" data-action="print-patients">Print summary</button>
      </header>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Village</th>
              <th>ASHA</th>
              <th>Last Check-up</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${filtered
              .map(
                (patient) => `
              <tr>
                <td>${patient.id}</td>
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.village}</td>
                <td>${patient.asha}</td>
                <td>${patient.lastCheckup}</td>
                <td>${renderStatusBadge(patient.status)}</td>
                <td>
                  <div class="actions">
                    <button class="btn secondary" data-action="view-patient" data-id="${patient.id}">View</button>
                    <button class="btn primary" data-action="assign-patient" data-id="${patient.id}">Assign</button>
                    <button class="btn ghost" data-action="export-patient" data-id="${patient.id}">Export</button>
                  </div>
                </td>
              </tr>
            `,
              )
              .join('')}
          </tbody>
        </table>
      </div>
    </section>
  `

  document.getElementById('patient-search').addEventListener('input', (event) => {
    state.patientFilters.search = event.target.value
    renderPatientsPage()
  })
  document.getElementById('patient-village').addEventListener('change', (event) => {
    state.patientFilters.village = event.target.value
    renderPatientsPage()
  })
  document.getElementById('patient-status').addEventListener('change', (event) => {
    state.patientFilters.status = event.target.value
    renderPatientsPage()
  })
}

function renderAshaPage() {
  const selected = ashaWorkers.find((worker) => worker.id === state.selectedWorker) || ashaWorkers[0]
  state.selectedWorker = selected?.id

  const rows = ashaWorkers
    .map(
      (worker) => `
      <tr data-action="select-worker" data-id="${worker.id}">
        <td>${worker.id}</td>
        <td>${worker.name}</td>
        <td>${worker.village}</td>
        <td>${worker.completion}%</td>
        <td>${worker.pending}</td>
        <td>${worker.lastSync}</td>
        <td>${renderStatusBadge(worker.status)}</td>
      </tr>
    `,
    )
    .join('')

  const tasks = selected.tasks
    .map(
      (task) => `
        <div class="card">
          <strong>${task.title}</strong>
          <p class="muted small">${task.priority} · Due ${task.due}</p>
          ${renderStatusBadge(task.status)}
        </div>
      `,
    )
    .join('')

  contentArea.innerHTML = `
    <section class="grid" style="grid-template-columns: minmax(0,1.7fr) minmax(0,1fr);">
      <article class="card">
        <h3>ASHA workers</h3>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Village</th>
                <th>% Follow-ups</th>
                <th>Pending visits</th>
                <th>Last sync</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </article>
      <article class="card">
        <h3>Worker details</h3>
        <p><strong>${selected.name}</strong> · ${selected.village}</p>
        <p class="muted small">${selected.id} · Last sync ${selected.lastSync}</p>
        <p>Assigned households:</p>
        <div class="actions">
          ${selected.households.map((house) => `<span class="badge-soft badge-warning">${house}</span>`).join('')}
        </div>
        <h4>Tasks</h4>
        <div class="grid">${tasks}</div>
        <div class="actions" style="margin-top: 1rem;">
          <button class="btn primary" data-action="assign-task" data-id="${selected.id}">Assign task</button>
          <button class="btn ghost" data-action="send-alert" data-id="${selected.id}">Send reminder</button>
        </div>
      </article>
    </section>
  `
}

function renderReportsPage() {
  const indicators = indicatorStats
    .map(
      (stat) => `
        <div class="card">
          <p class="muted small">${stat.title}</p>
          <p class="stat-value">${stat.value}</p>
          <p class="trend ${stat.change >= 0 ? 'up' : 'down'}">
            ${stat.change >= 0 ? '▲' : '▼'} ${stat.change}% vs last month
          </p>
        </div>
      `,
    )
    .join('')

  const progressBars = maternalChildProgress
    .map(
      (item) => `
        <div class="card">
          <p><strong>${item.label}</strong></p>
          <div style="height: 8px; background:#e2e8f0; border-radius:999px; overflow:hidden;">
            <div style="width:${item.completed}%; height:100%; background:#0ea5e9;"></div>
          </div>
          <p class="muted small">${item.completed}% of ${item.target}</p>
        </div>
      `,
    )
    .join('')

  contentArea.innerHTML = `
    <section class="grid cards">${indicators}</section>
    <section class="grid" style="grid-template-columns: repeat(auto-fit,minmax(260px,1fr));">${progressBars}</section>
    <section class="grid" style="grid-template-columns: minmax(0,1fr);">
      <article class="card">
        <h3>Chronic disease screenings</h3>
        <canvas id="screeningChart" height="260"></canvas>
      </article>
    </section>
    <div class="actions">
      <button class="btn primary" data-action="export-pdf">Export PDF</button>
      <button class="btn secondary" data-action="export-xls">Export Excel</button>
    </div>
  `

  mountChart('screeningChart', {
    type: 'bar',
    data: {
      labels: chronicScreeningTrend.map((item) => item.label),
      datasets: [
        {
          label: 'Screenings',
          data: chronicScreeningTrend.map((item) => item.value),
          backgroundColor: '#2563eb',
          borderRadius: 8,
        },
      ],
    },
    options: { responsive: true, plugins: { legend: { display: false } } },
  })
}

function renderInventoryPage() {
  const rows = state.inventory
    .map(
      (item) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.category}</td>
          <td>${item.quantity}</td>
          <td>${item.min}</td>
          <td>${item.updated}</td>
          <td>${renderInventoryStatus(item)}</td>
          <td>
            <div class="actions">
              <button class="btn secondary" data-action="stock-add" data-id="${item.id}">+10</button>
              <button class="btn ghost" data-action="stock-reduce" data-id="${item.id}">-10</button>
            </div>
          </td>
        </tr>
      `,
    )
    .join('')

  contentArea.innerHTML = `
    <section class="grid" style="grid-template-columns: minmax(0,1.8fr) minmax(0,1fr);">
      <article class="card">
        <h3>Inventory table</h3>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Qty</th>
                <th>Min</th>
                <th>Updated</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </article>
      <article class="card">
        <h3>Add inventory item</h3>
        <form id="inventory-form" class="settings-list">
          <label>
            Item name
            <input type="text" name="name" required />
          </label>
          <label>
            Category
            <select name="category">
              <option value="Medicine">Medicine</option>
              <option value="Equipment">Equipment</option>
            </select>
          </label>
          <label>
            Quantity
            <input type="number" name="quantity" min="0" required />
          </label>
          <label>
            Minimum required
            <input type="number" name="min" min="0" required />
          </label>
          <button class="btn primary" type="submit">Save item</button>
        </form>
      </article>
    </section>
    <section class="card">
      <h3>Stock usage trend</h3>
      <canvas id="stockChart" height="260"></canvas>
    </section>
  `

  document.getElementById('inventory-form').addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const payload = {
      id: `INV-${Date.now()}`,
      name: formData.get('name'),
      category: formData.get('category'),
      quantity: Number(formData.get('quantity')),
      min: Number(formData.get('min')),
      updated: 'Today',
    }
    state.inventory = [payload, ...state.inventory]
    showToast(`Added ${payload.name}`)
    renderInventoryPage()
  })

  mountChart('stockChart', {
    type: 'line',
    data: {
      labels: stockTrends.map((item) => item.label),
      datasets: [
        { label: 'Vaccines', data: stockTrends.map((i) => i.vaccines), borderColor: '#2563eb', tension: 0.4 },
        { label: 'Supplements', data: stockTrends.map((i) => i.supplements), borderColor: '#0ea5e9', tension: 0.4 },
        { label: 'Equipment', data: stockTrends.map((i) => i.equipment), borderColor: '#14b8a6', tension: 0.4 },
      ],
    },
    options: { responsive: true, plugins: { legend: { position: 'bottom' } } },
  })
}

function renderSettingsPage() {
  const list = settingsOptions
    .map(
      (item) => `
        <div class="settings-item">
          <div>
            <strong>${item.title}</strong>
            <p class="muted small">${item.description}</p>
          </div>
          <button class="switch ${state.settings[item.key] ? 'active' : ''}" data-action="toggle-setting" data-key="${item.key}"></button>
        </div>
      `,
    )
    .join('')

  contentArea.innerHTML = `
    <section class="card">
      <h3>Center preferences</h3>
      <div class="settings-list">${list}</div>
    </section>
    <section class="card">
      <h3>Backup & export</h3>
      <div class="actions">
        <button class="btn primary" data-action="run-backup">Run manual backup</button>
        <button class="btn ghost" data-action="schedule-sync">Schedule sync</button>
      </div>
    </section>
  `
}

function handleContentClick(event) {
  const { action, id } = event.target.dataset
  if (!action) return

  switch (action) {
    case 'view-patient':
      openPatientModal(id)
      break
    case 'assign-patient':
      openAssignModal(id)
      break
    case 'export-patient':
      showToast('Patient report exported (demo)')
      break
    case 'print-patients':
      window.print()
      break
    case 'select-worker':
      state.selectedWorker = id
      renderAshaPage()
      break
    case 'assign-task':
      openTaskModal(id)
      break
    case 'send-alert':
      showToast('Reminder sent to worker')
      break
    case 'stock-add':
      updateStock(id, 10)
      break
    case 'stock-reduce':
      updateStock(id, -10)
      break
    case 'export-pdf':
      showToast('PDF export ready (demo)')
      break
    case 'export-xls':
      showToast('Excel export ready (demo)')
      break
    case 'toggle-setting':
      state.settings[id] = !state.settings[id]
      renderSettingsPage()
      break
    case 'run-backup':
      showToast('Backup started (demo)')
      break
    case 'schedule-sync':
      showToast('Sync scheduled (demo)')
      break
    default:
      break
  }
}

function openPatientModal(patientId) {
  const patient = patients.find((item) => item.id === patientId)
  if (!patient) return
  modalTitle.textContent = patient.name
  modalSubtitle.textContent = `${patient.id} · ${patient.village}`
  modalBody.innerHTML = `
    <p><strong>ASHA:</strong> ${patient.asha}</p>
    <p><strong>Status:</strong> ${patient.status}</p>
    <p><strong>Last check-up:</strong> ${patient.lastCheckup}</p>
    <p><strong>Upcoming follow-up:</strong> ${patient.followUp}</p>
    <p><strong>Contact:</strong> ${patient.contact}</p>
    <button class="btn primary" data-action="export-patient" data-id="${patient.id}">Download report</button>
  `
  modalRoot.classList.remove('hidden')
}

function openAssignModal(patientId) {
  const patient = patients.find((item) => item.id === patientId)
  if (!patient) return
  modalTitle.textContent = `Assign worker`
  modalSubtitle.textContent = patient.name
  const options = ashaWorkers
    .map((worker) => `<option value="${worker.name}" ${worker.name === patient.asha ? 'selected' : ''}>${worker.name}</option>`)
    .join('')
  modalBody.innerHTML = `
    <label>
      Select ASHA worker
      <select id="assign-select">${options}</select>
    </label>
    <button class="btn primary" id="assign-save">Save assignment</button>
  `
  modalRoot.classList.remove('hidden')
  document.getElementById('assign-save').addEventListener('click', () => {
    const value = document.getElementById('assign-select').value
    patient.asha = value
    showToast(`Assigned ${patient.name} to ${value}`)
    closeModal()
    renderPatientsPage()
  })
}

function openTaskModal(workerId) {
  const worker = ashaWorkers.find((item) => item.id === workerId)
  if (!worker) return
  modalTitle.textContent = `Assign task`
  modalSubtitle.textContent = worker.name
  modalBody.innerHTML = `
    <label>
      Task title
      <input type="text" id="task-title" placeholder="e.g. ANC visit" />
    </label>
    <label>
      Priority
      <select id="task-priority">
        <option>High</option>
        <option selected>Medium</option>
        <option>Low</option>
      </select>
    </label>
    <label>
      Due date
      <input type="date" id="task-due" />
    </label>
    <button class="btn primary" id="task-save">Save task</button>
  `
  modalRoot.classList.remove('hidden')
  document.getElementById('task-save').addEventListener('click', () => {
    const title = document.getElementById('task-title').value || 'New task'
    const priority = document.getElementById('task-priority').value
    const due = document.getElementById('task-due').value || 'Soon'
    worker.tasks.unshift({ title, priority, due, status: 'Pending' })
    showToast(`Task assigned to ${worker.name}`)
    closeModal()
    renderAshaPage()
  })
}

function updateStock(itemId, delta) {
  state.inventory = state.inventory.map((item) => {
    if (item.id !== itemId) return item
    const nextQty = Math.max(0, item.quantity + delta)
    const updated = { ...item, quantity: nextQty, updated: 'Today' }
    if (nextQty < updated.min) {
      state.notifications.unshift({
        title: 'Low stock alert',
        body: `${updated.name} below threshold`,
        type: 'alert',
      })
      showToast(`${updated.name} below threshold`, true)
    }
    return updated
  })
  renderInventoryPage()
}

function closeModal() {
  modalRoot.classList.add('hidden')
}

function renderStatusBadge(status) {
  const map = {
    Healthy: 'badge-soft badge-healthy',
    'Follow-up Due': 'badge-soft badge-warning',
    Critical: 'badge-soft badge-critical',
    Active: 'badge-soft badge-healthy',
    Offline: 'badge-soft badge-warning',
    'No Signal': 'badge-soft badge-critical',
    Pending: 'badge-soft badge-warning',
    'In Progress': 'badge-soft badge-warning',
    Completed: 'badge-soft badge-healthy',
  }
  return `<span class="${map[status] || 'badge-soft'}">${status}</span>`
}

function renderInventoryStatus(item) {
  if (item.quantity === 0) return '<span class="badge-soft badge-critical">Out of stock</span>'
  if (item.quantity < item.min) return '<span class="badge-soft badge-warning">Low stock</span>'
  return '<span class="badge-soft badge-healthy">In stock</span>'
}

function showToast(message, isAlert = false) {
  const toast = document.createElement('div')
  toast.className = 'toast'
  toast.innerHTML = `<strong>${isAlert ? 'Alert' : 'Update'}</strong><p class="muted small">${message}</p>`
  toastContainer.appendChild(toast)
  setTimeout(() => toast.remove(), 4000)
}

function mountChart(id, config) {
  if (!document.getElementById(id)) return
  if (chartRegistry[id]) {
    chartRegistry[id].destroy()
  }
  const ctx = document.getElementById(id)
  chartRegistry[id] = new Chart(ctx, config)
}

renderShell()



