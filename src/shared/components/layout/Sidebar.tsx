import { NavLink } from 'react-router-dom'
import {
  Calendar, Users, Scissors, UserCircle, Settings,
  LogOut, ShieldCheck, X, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { useAuth } from '@/app/providers/AuthProvider'
import { useSidebar } from '@/app/providers/SidebarProvider'
import { AppLogo } from '@/shared/components/custom/AppLogo'

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
  const { close, isCollapsed, toggleCollapse } = useSidebar()
  const isSuperadmin = user?.role === 'superadmin'
  const navItems = isSuperadmin ? adminNavItems : companyNavItems

  const initials = user?.name
    ?.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase() ?? 'U'

  return (
    <aside className={cn(
      'flex h-screen flex-col bg-sidebar transition-all duration-300',
      isCollapsed ? 'w-16' : 'w-64',
    )}>
      {/* Header: logo + nome + botão fechar/colapsar */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-3">
        <div className={cn('flex items-center gap-3 min-w-0', isCollapsed && 'justify-center w-full')}>
          <AppLogo size={36} className="shrink-0" />
          {!isCollapsed && (
            <span className="text-base font-bold tracking-tight text-sidebar-foreground truncate">
              AgendAll
            </span>
          )}
        </div>

        {!isCollapsed && (
          /* Fechar — só no mobile */
          <button
            onClick={close}
            className="rounded-full p-1.5 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* Colapsar — só no desktop */}
        <button
          onClick={toggleCollapse}
          className={cn(
            'hidden md:flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
            'text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors',
            isCollapsed && 'ml-auto mr-auto',
          )}
        >
          {isCollapsed
            ? <ChevronRight className="h-4 w-4" />
            : <ChevronLeft className="h-4 w-4" />
          }
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={close}
            title={isCollapsed ? label : undefined}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-full py-3 text-sm font-medium transition-all',
                isCollapsed ? 'justify-center px-0' : 'px-4',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={cn('h-5 w-5 shrink-0', isActive ? 'opacity-100' : 'opacity-70')} />
                {!isCollapsed && <span>{label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User + logout */}
      <div className="border-t border-sidebar-border p-2 space-y-0.5">
        {!isCollapsed && (
          <div className="flex items-center gap-3 px-3 py-2 rounded-2xl">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground text-xs font-semibold">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
              <p className="text-xs text-sidebar-foreground/50 truncate">{user?.email}</p>
            </div>
          </div>
        )}

        <button
          onClick={logout}
          title={isCollapsed ? 'Sair' : undefined}
          className={cn(
            'flex w-full items-center gap-3 rounded-full py-3 text-sm font-medium',
            'text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            isCollapsed ? 'justify-center px-0' : 'px-4',
          )}
        >
          <LogOut className="h-5 w-5 opacity-70 shrink-0" />
          {!isCollapsed && <span>Sair</span>}
        </button>
      </div>
    </aside>
  )
}
