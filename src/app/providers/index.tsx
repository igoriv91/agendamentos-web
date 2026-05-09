import { type ReactNode } from 'react'
import { Toaster } from 'sonner'
import { AuthProvider } from './AuthProvider'
import { SocketProvider } from './SocketProvider'

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <AuthProvider>
    <SocketProvider>
      {children}
      <Toaster richColors position="top-right" />
    </SocketProvider>
  </AuthProvider>
)
