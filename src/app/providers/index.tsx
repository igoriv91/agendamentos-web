import { type ReactNode } from 'react'
import { AuthProvider } from './AuthProvider'
import { SocketProvider } from './SocketProvider'

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <AuthProvider>
    <SocketProvider>{children}</SocketProvider>
  </AuthProvider>
)
