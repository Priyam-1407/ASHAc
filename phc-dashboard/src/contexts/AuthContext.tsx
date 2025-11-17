import { createContext, useContext, useMemo, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { AUTH_CREDENTIALS } from '../utils/constants'

interface UserProfile {
  name: string
  role: string
}

interface AuthContextValue {
  user: UserProfile | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  error: string | null
  clearError: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [error, setError] = useState<string | null>(null)

  const login = async (username: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 600))

    if (
      username === AUTH_CREDENTIALS.username &&
      password === AUTH_CREDENTIALS.password
    ) {
      setUser({ name: 'Dr. Meera Patil', role: 'PHC Administrator' })
      setError(null)
      return
    }

    setError('Invalid credentials. Try priyam@2006 / priyam123')
    throw new Error('Invalid credentials')
  }

  const logout = () => {
    setUser(null)
  }

  const clearError = () => setError(null)

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
      error,
      clearError,
    }),
    [user, error],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}


