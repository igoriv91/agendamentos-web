import { useSidebar } from '@/app/providers/SidebarProvider'
import { Sidebar } from './Sidebar'

interface PageLayoutProps {
  children: React.ReactNode
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  const { isOpen, close } = useSidebar()

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={close}
        />
      )}

      {/* Sidebar: fixed overlay on mobile, static on desktop */}
      <div className={[
        'fixed inset-y-0 left-0 z-40 transition-transform duration-300 md:relative md:translate-x-0 md:flex',
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      ].join(' ')}>
        <Sidebar />
      </div>

      <main className="flex flex-1 flex-col overflow-auto min-w-0">{children}</main>
    </div>
  )
}
