import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { PageLayout } from '@/shared/components/layout/PageLayout'
import { Header } from '@/shared/components/layout/Header'
import { AppButton } from '@/shared/components/custom/AppButton'
import { DataTable } from '@/shared/components/custom/DataTable'
import { StatusBadge } from '@/shared/components/custom/StatusBadge'
import { Button } from '@/shared/components/ui/button'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { formatCurrency } from '@/shared/lib/formatCurrency'
import { useServices } from './hooks/useServices'
import type { Service } from './types/service.types'

export default function ServicesPage() {
  const { services, isLoading, handleDelete, navigateToCreate, navigateToEdit } = useServices()

  const columns: ColumnDef<Service>[] = [
    { accessorKey: 'name', header: 'Serviço' },
    { accessorKey: 'staff', header: 'Atendente', cell: ({ row }) => row.original.staff?.name ?? 'Todos' },
    { accessorKey: 'durationMinutes', header: 'Duração', cell: ({ row }) => `${row.original.durationMinutes} min` },
    { accessorKey: 'price', header: 'Preço', cell: ({ row }) => row.original.price ? formatCurrency(parseFloat(row.original.price)) : '—' },
    {
      accessorKey: 'isActive', header: 'Status',
      cell: ({ row }) => (
        <StatusBadge
          status={row.original.isActive ? 'active' : 'inactive'}
          label={row.original.isActive ? 'Ativo' : 'Inativo'}
        />
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigateToEdit(row.original.id)}>
              <Pencil className="mr-2 h-4 w-4" />Editar
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(row.original.id)}>
              <Trash2 className="mr-2 h-4 w-4" />Desativar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <PageLayout>
      <Header
        title="Serviços"
        subtitle="Gerencie os serviços oferecidos pela empresa"
        actions={<AppButton onClick={navigateToCreate}>Novo Serviço</AppButton>}
      />
      <div className="p-6">
        <DataTable columns={columns} data={services} isLoading={isLoading} />
      </div>
    </PageLayout>
  )
}
