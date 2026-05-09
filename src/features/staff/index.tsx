import { Plus, Mail, Phone, MoreVertical, Pencil, UserX } from 'lucide-react'
import { PageLayout } from '@/shared/components/layout/PageLayout'
import { Header } from '@/shared/components/layout/Header'
import { StatusBadge } from '@/shared/components/custom/StatusBadge'
import { Button } from '@/shared/components/ui/button'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { cn } from '@/shared/lib/utils'
import { useStaff } from './hooks/useStaff'
import type { Staff } from './types/staff.types'

// ── Card ─────────────────────────────────────────────────────────────
const StaffCard = ({
  staff, onEdit, onDelete,
}: { staff: Staff; onEdit: (id: string) => void; onDelete: (id: string) => void }) => {
  const initials = staff.name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  return (
    <div className={cn(
      'flex flex-col rounded-2xl bg-card border border-border/60 shadow-sm overflow-hidden',
      'transition-shadow hover:shadow-md',
      !staff.isActive && 'opacity-60',
    )}>
      <div className={cn('h-1 w-full', staff.isActive ? 'bg-primary' : 'bg-muted-foreground/40')} />

      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-base font-semibold select-none">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-base leading-tight truncate">{staff.name}</p>
              <div className="mt-1">
                <StatusBadge
                  status={staff.isActive ? 'active' : 'inactive'}
                  label={staff.isActive ? 'Ativo' : 'Inativo'}
                />
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger render={
              <Button variant="ghost" size="icon-sm" className="shrink-0 text-muted-foreground" />
            }>
              <MoreVertical className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(staff.id)}>
                <Pencil className="mr-2 h-4 w-4" /> Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onDelete(staff.id)}
              >
                <UserX className="mr-2 h-4 w-4" /> Desativar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-1.5 text-sm">
          <div className={cn('flex items-center gap-2', staff.email ? 'text-muted-foreground' : 'text-muted-foreground/40')}>
            <Mail className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{staff.email ?? 'Sem e-mail'}</span>
          </div>
          <div className={cn('flex items-center gap-2', staff.phone ? 'text-muted-foreground' : 'text-muted-foreground/40')}>
            <Phone className="h-3.5 w-3.5 shrink-0" />
            <span>{staff.phone ?? 'Sem telefone'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Skeleton ─────────────────────────────────────────────────────────
const StaffSkeleton = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="rounded-2xl bg-card border border-border/60 overflow-hidden animate-pulse">
        <div className="h-1 bg-muted" />
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-muted shrink-0" />
            <div className="space-y-2 flex-1 min-w-0">
              <div className="h-4 bg-muted rounded-full w-3/4" />
              <div className="h-3 bg-muted rounded-full w-1/3" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-muted rounded-full w-full" />
            <div className="h-3 bg-muted rounded-full w-2/3" />
          </div>
        </div>
      </div>
    ))}
  </div>
)

// ── Estado vazio ─────────────────────────────────────────────────────
const EmptyState = ({ onCreate }: { onCreate: () => void }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
      <Plus className="h-8 w-8 text-primary" />
    </div>
    <div>
      <p className="font-semibold text-base">Nenhum atendente cadastrado</p>
      <p className="text-sm text-muted-foreground mt-1">Adicione o primeiro atendente da sua equipe</p>
    </div>
    <Button onClick={onCreate}>Adicionar atendente</Button>
  </div>
)

// ── Página ───────────────────────────────────────────────────────────
export default function StaffPage() {
  const { staff, isLoading, handleDelete, navigateToCreate, navigateToEdit } = useStaff()

  return (
    <PageLayout>
      <Header title="Atendentes" subtitle="Gerencie sua equipe" />

      <div className="p-4 md:p-6 pb-24">
        {isLoading ? (
          <StaffSkeleton />
        ) : staff.length === 0 ? (
          <EmptyState onCreate={navigateToCreate} />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {staff.map((s) => (
              <StaffCard key={s.id} staff={s} onEdit={navigateToEdit} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>

      <button
        onClick={navigateToCreate}
        className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-95"
        aria-label="Novo atendente"
      >
        <Plus className="h-7 w-7" />
      </button>
    </PageLayout>
  )
}
