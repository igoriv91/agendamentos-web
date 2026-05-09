import { type ReactNode } from 'react'
import { Toaster } from 'sonner'
import { AuthProvider } from './AuthProvider'
import { SocketProvider } from './SocketProvider'
import { SidebarProvider } from './SidebarProvider'

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <AuthProvider>
    <SocketProvider>
      <SidebarProvider>
        {children}
        <Toaster richColors position="top-right" />
      </SidebarProvider>
    </SocketProvider>
  </AuthProvider>
)
