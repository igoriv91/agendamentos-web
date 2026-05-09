import { createContext, useContext, useState, type ReactNode } from 'react'

interface SidebarContextValue {
  isOpen: boolean
  isCollapsed: boolean
  open: () => void
  close: () => void
  toggle: () => void
  toggleCollapse: () => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <SidebarContext.Provider value={{
      isOpen,
      isCollapsed,
      open:           () => setIsOpen(true),
      close:          () => setIsOpen(false),
      toggle:         () => setIsOpen((v) => !v),
      toggleCollapse: () => setIsCollapsed((v) => !v),
    }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error('useSidebar must be used inside SidebarProvider')
  return ctx
}
