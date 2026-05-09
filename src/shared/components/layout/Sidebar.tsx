import { NavLink } from 'react-router-dom'
import {
  Calendar, Users, Scissors, UserCircle, Settings, LogOut, ShieldCheck,
} from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { useAuth } from '@/app/providers/AuthProvider'

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
  const isSuperadmin = user?.role === 'superadmin'
  const navItems = isSuperadmin ? adminNavItems : companyNavItems

  return (
    <aside className="flex h-screen w-60 flex-col border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <span className="text-lg font-semibold tracking-tight">Agendamentos</span>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t p-3">
        <div className="mb-2 px-3 py-1">
          <p className="text-sm font-medium">{user?.name}</p>
          <p className="text-xs text-muted-foreground">{user?.email}</p>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </button>
      </div>
    </aside>
  )
}
