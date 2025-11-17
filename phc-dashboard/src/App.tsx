import type { ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { NotificationProvider } from './contexts/NotificationContext'
import { LoginPage } from './pages/Login'
import { MainLayout } from './layouts/MainLayout'
import { DashboardOverview } from './pages/DashboardOverview'
import { PatientAnalytics } from './pages/PatientAnalytics'
import { AshaAnalytics } from './pages/AshaAnalytics'
import { ReportsAnalytics } from './pages/ReportsAnalytics'
import { InventoryManagement } from './pages/InventoryManagement'
import { SettingsPage } from './pages/Settings'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

const AuthRedirect = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }
  return <>{children}</>
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/login"
                element={
                  <AuthRedirect>
                    <LoginPage />
                  </AuthRedirect>
                }
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardOverview />} />
                <Route path="patients" element={<PatientAnalytics />} />
                <Route path="asha-workers" element={<AshaAnalytics />} />
                <Route path="reports" element={<ReportsAnalytics />} />
                <Route path="inventory" element={<InventoryManagement />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
