import { Sidebar } from './Sidebar'

interface PageLayoutProps {
  children: React.ReactNode
}

export const PageLayout = ({ children }: PageLayoutProps) => (
  <div className="flex h-screen overflow-hidden bg-background">
    <Sidebar />
    <main className="flex flex-1 flex-col overflow-auto">{children}</main>
  </div>
)
