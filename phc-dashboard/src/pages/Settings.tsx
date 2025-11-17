import { useState } from 'react'
import { Toggle } from '../components/ui/Toggle'
import { useTheme } from '../contexts/ThemeContext'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme()
  const [config, setConfig] = useState({
    alerts: true,
    autoSync: true,
    offlineMode: true,
    betaFeatures: false,
  })

  const updateConfig = (key: keyof typeof config, value: boolean) =>
    setConfig((prev) => ({ ...prev, [key]: value }))

  return (
    <div className="space-y-6">
      <Card title="Center Preferences" subtitle="Manage notification, sync and UI settings">
        <div className="grid gap-4 md:grid-cols-2">
          <Toggle
            label="Critical Alerts"
            description="Receive SMS + in-app notifications for high risk cases"
            checked={config.alerts}
            onChange={(value) => updateConfig('alerts', value)}
          />
          <Toggle
            label="Auto Sync Worker Data"
            description="Sync ASHA data every 30 mins even during offline capture"
            checked={config.autoSync}
            onChange={(value) => updateConfig('autoSync', value)}
          />
          <Toggle
            label="Offline Mode Indicator"
            description="Show worker offline badges on dashboard"
            checked={config.offlineMode}
            onChange={(value) => updateConfig('offlineMode', value)}
          />
          <Toggle
            label="Dark Mode"
            description="Switch entire dashboard to dark palette"
            checked={theme === 'dark'}
            onChange={toggleTheme}
          />
          <Toggle
            label="Try beta modules"
            description="Enable experimental analytics and real-time feeds"
            checked={config.betaFeatures}
            onChange={(value) => updateConfig('betaFeatures', value)}
          />
        </div>
      </Card>

      <Card title="Backup & Export" subtitle="Keep a secondary copy of PHC data">
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => window.alert('Manual backup started')}>
            Run Manual Backup
          </Button>
          <Button
            variant="secondary"
            onClick={() => window.alert('Schedule saved')}
          >
            Schedule Sync
          </Button>
        </div>
      </Card>
    </div>
  )
}


