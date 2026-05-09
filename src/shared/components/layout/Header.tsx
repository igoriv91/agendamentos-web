import { NotificationBell } from '@/features/notifications/components/NotificationBell'

interface HeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export const Header = ({ title, subtitle, actions }: HeaderProps) => (
  <div className="flex items-center justify-between border-b bg-card px-6 py-4">
    <div>
      <h1 className="text-xl font-semibold">{title}</h1>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </div>
    <div className="flex items-center gap-2">
      {actions}
      <NotificationBell />
    </div>
  </div>
)
