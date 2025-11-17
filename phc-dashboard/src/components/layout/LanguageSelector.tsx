import { LANGUAGES } from '../../utils/constants'
import { useTranslation } from 'react-i18next'

export const LanguageSelector = () => {
  const { i18n } = useTranslation()
  return (
    <select
      value={i18n.language.slice(0, 2)}
      onChange={(event) => i18n.changeLanguage(event.target.value)}
      className="rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-primary-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
    >
      {LANGUAGES.map((language) => (
        <option key={language.key} value={language.key}>
          {language.label}
        </option>
      ))}
    </select>
  )
}


