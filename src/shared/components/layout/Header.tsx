import { Menu } from 'lucide-react'
import { useSidebar } from '@/app/providers/SidebarProvider'
import { NotificationBell } from '@/features/notifications/components/NotificationBell'
import { Button } from '@/shared/components/ui/button'

interface HeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export const Header = ({ title, subtitle, actions }: HeaderProps) => {
  const { toggle } = useSidebar()

  return (
    <div className="flex items-center justify-between border-b bg-card px-4 py-3 md:px-6 md:py-4">
      <div className="flex items-center gap-3 min-w-0">
        {/* Hamburger — visible only on mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 md:hidden"
          onClick={toggle}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="min-w-0">
          <h1 className="text-lg font-semibold md:text-xl truncate">{title}</h1>
          {subtitle && <p className="text-xs text-muted-foreground md:text-sm truncate">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {actions}
        <NotificationBell />
      </div>
    </div>
  )
}
