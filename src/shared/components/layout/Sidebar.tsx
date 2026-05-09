import { NavLink } from 'react-router-dom'
import {
  Calendar, Users, Scissors, UserCircle, Settings, LogOut, ShieldCheck, X,
} from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { useAuth } from '@/app/providers/AuthProvider'
import { useSidebar } from '@/app/providers/SidebarProvider'

const companyNavItems = [
  { to: '/schedule',  icon: Calendar,    label: 'Agenda' },
  { to: '/staff',     icon: Users,       label: 'Atendentes' },
  { to: '/services',  icon: Scissors,    label: 'Serviços' },
  { to: '/clients',   icon: UserCircle,  label: 'Clientes' },
  { to: '/company',   icon: Settings,    label: 'Configurações' },
]

const adminNavItems = [
  { to: '/admin', icon: ShieldCheck, label: 'Painel Admin' },
]

export const Sidebar = () => {
  const { user, logout } = useAuth()
  const { close } = useSidebar()
  const isSuperadmin = user?.role === 'superadmin'
  const navItems = isSuperadmin ? adminNavItems : companyNavItems

  return (
    <aside className="flex h-screen w-64 flex-col bg-sidebar">
      {/* Logo mark + app name */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <span className="text-base font-semibold tracking-tight text-sidebar-foreground">
            Agendamentos
          </span>
        </div>
        <button
          onClick={close}
          className="rounded-full p-1.5 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors md:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 p-3 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={close}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-full px-4 py-3 text-sm font-medium transition-all',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={cn('h-5 w-5 shrink-0', isActive ? 'opacity-100' : 'opacity-70')} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User profile + logout */}
      <div className="border-t border-sidebar-border p-3 space-y-0.5">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground text-xs font-semibold">
            {user?.name?.charAt(0).toUpperCase() ?? 'U'}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
            <p className="text-xs text-sidebar-foreground/50 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-full px-4 py-3 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="h-5 w-5 opacity-70" />
          Sair
        </button>
      </div>
    </aside>
  )
}
