import {
  Menu,
  Moon,
  Shield,
  SunMedium,
  UserRound,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../contexts/ThemeContext'
import { LanguageSelector } from './LanguageSelector'
import { NotificationsDropdown } from './NotificationsDropdown'
import { useAuth } from '../../contexts/AuthContext'
import { useState } from 'react'
import clsx from 'clsx'

interface HeaderProps {
  onMenuToggle: () => void
}

export const Header = ({ onMenuToggle }: HeaderProps) => {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-100 bg-white/80 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          className="rounded-2xl border border-slate-200 p-2 text-slate-500 transition hover:border-primary-200 hover:text-primary-600 dark:border-slate-700 lg:hidden"
          onClick={onMenuToggle}
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-500">
            {t('app.subtitle')}
          </p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            {t('app.title')}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-primary-200 hover:text-primary-600 dark:border-slate-700"
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <SunMedium className="h-5 w-5" />
          )}
        </button>
        <NotificationsDropdown />
        <LanguageSelector />
        <div className="relative">
          <button
            onClick={() => setProfileOpen((prev) => !prev)}
            className={clsx(
              'flex items-center gap-2 rounded-full border border-slate-100 bg-white px-3 py-1 text-left shadow-sm dark:border-slate-700 dark:bg-slate-900',
              profileOpen && 'border-primary-300',
            )}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700">
              <UserRound className="h-4 w-4" />
            </span>
            <div className="hidden text-xs lg:block">
              <p className="font-semibold text-slate-900 dark:text-white">
                {user?.name ?? 'Admin'}
              </p>
              <p className="text-slate-400">PHC Admin</p>
            </div>
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-slate-100 bg-white p-3 text-sm shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <p className="mb-2 text-xs font-semibold uppercase text-slate-500">
                Profile
              </p>
              <div className="mb-3 rounded-2xl bg-slate-50 p-3 text-xs text-slate-500 dark:bg-slate-800">
                <p className="font-semibold text-slate-900 dark:text-white">
                  {user?.name}
                </p>
                <p>PHC Administrator</p>
              </div>
              <button
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-slate-600 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Shield className="h-4 w-4" />
                Security Center
              </button>
              <button
                onClick={logout}
                className="mt-2 w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}


