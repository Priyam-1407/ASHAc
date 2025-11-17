
import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  BarChart3,
  Home,
  Layers,
  Settings,
  Users,
} from 'lucide-react'

export const APP_TITLE = 'PHC Command Center'

export const AUTH_CREDENTIALS = {
  username: 'priyam@2006',
  password: 'priyam123',
}

export const LANGUAGES = [
  { key: 'en', label: 'English' },
  { key: 'hi', label: 'हिन्दी' },
  { key: 'od', label: 'ଓଡ଼ିଆ' },
]

export interface NavItem {
  label: string
  path: string
  icon: LucideIcon
  i18nKey: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard Overview', path: '/', icon: Home, i18nKey: 'nav.dashboard' },
  { label: 'Patient Analytics', path: '/patients', icon: Activity, i18nKey: 'nav.patients' },
  { label: 'ASHA Worker Analytics', path: '/asha-workers', icon: Users, i18nKey: 'nav.asha' },
  { label: 'Reports & Analytics', path: '/reports', icon: BarChart3, i18nKey: 'nav.reports' },
  {
    label: 'Inventory & Supplies',
    path: '/inventory',
    icon: Layers,
    i18nKey: 'nav.inventory',
  },
  { label: 'Settings', path: '/settings', icon: Settings, i18nKey: 'nav.settings' },
]

