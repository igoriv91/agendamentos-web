import { createContext, useContext, useState, type ReactNode } from 'react'

interface User {
  id: string
  companyId: string | null
  name: string
  email: string
  role: 'superadmin' | 'company_admin'
}

interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  login: (user: User, token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const SESSION_USER_KEY = 'auth_user'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_USER_KEY)
      return stored ? (JSON.parse(stored) as User) : null
    } catch {
      return null
    }
  })

  const login = (user: User, token: string) => {
    sessionStorage.setItem('token', token)
    sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify(user))
    setUser(user)
  }

  const logout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem(SESSION_USER_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
