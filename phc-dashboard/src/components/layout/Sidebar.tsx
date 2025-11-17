import { Menu, PanelLeftClose, PanelLeftOpen, Stethoscope } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '../../utils/constants'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  mobileOpen: boolean
  onMobileClose: () => void
}

export const Sidebar = ({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}: SidebarProps) => {
  const { t } = useTranslation()

  const content = (
    <>
      <div className="mb-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-600 text-white">
            <Stethoscope className="h-5 w-5" />
          </span>
          {!collapsed && (
            <div>
              <p className="text-sm font-semibold text-slate-500">
                {t('app.subtitle')}
              </p>
              <p className="font-bold text-slate-900 dark:text-white">
                {t('app.title')}
              </p>
            </div>
          )}
        </div>
        <button
          onClick={onToggle}
          className="rounded-full border border-slate-200 p-2 text-slate-500 hover:border-primary-200 hover:text-primary-600 dark:border-slate-700"
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </button>
      </div>

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onMobileClose}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium transition',
                isActive
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-600/10 dark:text-primary-200'
                  : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900',
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {!collapsed && <span>{t(item.i18nKey)}</span>}
          </NavLink>
        ))}
      </nav>

      {!collapsed && (
        <div className="rounded-2xl border border-dashed border-primary-200/70 bg-primary-50/40 p-4 text-sm">
          <p className="font-semibold text-primary-800">
            Offline indicators live
          </p>
          <p className="text-primary-600">
            3 ASHA workers have weak or no signal
          </p>
        </div>
      )}
    </>
  )

  return (
    <>
      <aside
        className={clsx(
          'hidden h-full flex-col border-r border-slate-100 bg-white px-4 py-6 transition-all dark:border-slate-800 dark:bg-slate-950 lg:flex',
          collapsed ? 'w-20' : 'w-64',
        )}
      >
        {content}
      </aside>
      <div className="lg:hidden">
        <button
          onClick={onMobileClose}
          className={clsx(
            'fixed inset-0 z-40 bg-slate-950/40 transition-opacity',
            mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
        />
        <div
          className={clsx(
            'fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-xl transition-transform dark:bg-slate-950',
            mobileOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <div className="flex items-center justify-between border-b border-slate-100 p-4 dark:border-slate-800">
            <div className="flex items-center gap-2 font-semibold">
              <Stethoscope className="h-5 w-5 text-primary-600" />
              <span>{t('app.title')}</span>
            </div>
            <button
              onClick={onMobileClose}
              className="rounded-full border border-slate-200 p-2 text-slate-500 dark:border-slate-700"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
          <aside className="flex h-full flex-col border-r border-slate-100 px-4 py-6 dark:border-slate-800">
            {content}
          </aside>
        </div>
      </div>
    </>
  )
}


