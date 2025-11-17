import type { FormEvent } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { useAuth } from '../contexts/AuthContext'
import { useTranslation } from 'react-i18next'

export const LoginPage = () => {
  const navigate = useNavigate()
  const { login, error, clearError } = useAuth()
  const { t } = useTranslation()
  const [form, setForm] = useState({ username: '', password: '' })
  const [isSubmitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      setSubmitting(true)
      await login(form.username, form.password)
      navigate('/', { replace: true })
    } catch {
      /* handled inside context */
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-primary-900 to-primary-600 px-4 py-10">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/10 p-10 text-white shadow-2xl backdrop-blur">
        <p className="text-sm uppercase tracking-[0.3em] text-primary-200">
          {t('auth.welcome')}
        </p>
        <h1 className="mt-2 text-3xl font-bold">{t('app.title')}</h1>
        <p className="mt-2 text-sm text-slate-200">{t('auth.instruction')}</p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <Input
            tone="light"
            label={t('auth.username')}
            placeholder="priyam@2006"
            value={form.username}
            onChange={(event) => {
              clearError()
              setForm((prev) => ({
                ...prev,
                username: event.target.value,
              }))
            }}
          />
          <Input
            tone="light"
            label={t('auth.password')}
            type="password"
            placeholder="priyam123"
            value={form.password}
            onChange={(event) => {
              clearError()
              setForm((prev) => ({
                ...prev,
                password: event.target.value,
              }))
            }}
          />
          {error && (
            <p className="text-sm font-semibold text-rose-200">{error}</p>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !form.username || !form.password}
          >
            {isSubmitting ? 'Verifying…' : t('auth.login')}
          </Button>
        </form>
      </div>
    </div>
  )
}


