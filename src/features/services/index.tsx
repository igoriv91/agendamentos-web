import { Plus, Clock, CircleDollarSign, User, MoreVertical, Pencil, PowerOff } from 'lucide-react'
import { PageLayout } from '@/shared/components/layout/PageLayout'
import { Header } from '@/shared/components/layout/Header'
import { StatusBadge } from '@/shared/components/custom/StatusBadge'
import { Button } from '@/shared/components/ui/button'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { formatCurrency } from '@/shared/lib/formatCurrency'
import { cn } from '@/shared/lib/utils'
import { useServices } from './hooks/useServices'
import type { Service } from './types/service.types'

// ── Card ─────────────────────────────────────────────────────────────
const ServiceCard = ({
  service, onEdit, onDelete,
}: { service: Service; onEdit: (id: string) => void; onDelete: (id: string) => void }) => (
  <div className={cn(
    'flex flex-col rounded-2xl bg-card border border-border/60 shadow-sm overflow-hidden',
    'transition-shadow hover:shadow-md',
    !service.isActive && 'opacity-60',
  )}>
    {/* Barra superior — verde (accent) para serviços */}
    <div className={cn('h-1 w-full', service.isActive ? 'bg-accent' : 'bg-muted-foreground/40')} />

    <div className="p-4 flex flex-col gap-3">
      {/* Nome + menu */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-semibold text-base leading-tight truncate">{service.name}</p>
          {service.description && (
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{service.description}</p>
          )}
          <div className="mt-1.5">
            <StatusBadge
              status={service.isActive ? 'active' : 'inactive'}
              label={service.isActive ? 'Ativo' : 'Inativo'}
            />
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="ghost" size="icon-sm" className="shrink-0 text-muted-foreground" />
          }>
            <MoreVertical className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(service.id)}>
              <Pencil className="mr-2 h-4 w-4" /> Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => onDelete(service.id)}
            >
              <PowerOff className="mr-2 h-4 w-4" /> Desativar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Detalhes */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 shrink-0 text-accent" />
          <span>{service.durationMinutes} min</span>
        </div>

        <div className="flex items-center gap-1.5">
          <CircleDollarSign className="h-3.5 w-3.5 shrink-0 text-accent" />
          <span>
            {service.price ? formatCurrency(parseFloat(service.price)) : 'Grátis'}
          </span>
        </div>

        <div className="col-span-2 flex items-center gap-1.5">
          <User className="h-3.5 w-3.5 shrink-0 text-primary" />
          <span className="truncate">{service.staff?.name ?? 'Todos os atendentes'}</span>
        </div>
      </div>
    </div>
  </div>
)

// ── Skeleton ─────────────────────────────────────────────────────────
const ServiceSkeleton = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="rounded-2xl bg-card border border-border/60 overflow-hidden animate-pulse">
        <div className="h-1 bg-muted" />
        <div className="p-4 space-y-3">
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded-full w-2/3" />
            <div className="h-3 bg-muted rounded-full w-1/3" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-3 bg-muted rounded-full" />
            <div className="h-3 bg-muted rounded-full" />
            <div className="h-3 bg-muted rounded-full col-span-2" />
          </div>
        </div>
      </div>
    ))}
  </div>
)

// ── Estado vazio ─────────────────────────────────────────────────────
const EmptyState = ({ onCreate }: { onCreate: () => void }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
      <Plus className="h-8 w-8 text-accent" />
    </div>
    <div>
      <p className="font-semibold text-base">Nenhum serviço cadastrado</p>
      <p className="text-sm text-muted-foreground mt-1">Cadastre os serviços que sua empresa oferece</p>
    </div>
    <Button onClick={onCreate}>Adicionar serviço</Button>
  </div>
)

// ── Página ───────────────────────────────────────────────────────────
export default function ServicesPage() {
  const { services, isLoading, handleDelete, navigateToCreate, navigateToEdit } = useServices()

  return (
    <PageLayout>
      <Header title="Serviços" subtitle="Serviços oferecidos pela empresa" />

      <div className="p-4 md:p-6 pb-24">
        {isLoading ? (
          <ServiceSkeleton />
        ) : services.length === 0 ? (
          <EmptyState onCreate={navigateToCreate} />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.id} service={s} onEdit={navigateToEdit} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>

      <button
        onClick={navigateToCreate}
        className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-95"
        aria-label="Novo serviço"
      >
        <Plus className="h-7 w-7" />
      </button>
    </PageLayout>
  )
}
