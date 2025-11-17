interface ToggleProps {
  label: string
  checked: boolean
  onChange: (value: boolean) => void
  description?: string
}

export const Toggle = ({
  label,
  checked,
  onChange,
  description,
}: ToggleProps) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className="flex w-full items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3 text-left shadow-sm transition hover:border-primary-200 dark:border-slate-800 dark:bg-slate-900"
  >
    <div>
      <p className="text-sm font-semibold text-slate-900 dark:text-white">
        {label}
      </p>
      {description && (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {description}
        </p>
      )}
    </div>
    <span
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
        checked ? 'bg-primary-600' : 'bg-slate-300'
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
          checked ? 'translate-x-5' : 'translate-x-1'
        }`}
      />
    </span>
  </button>
)


