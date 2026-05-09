import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/shared/components/custom/DataTable'
import { StatusBadge } from '@/shared/components/custom/StatusBadge'
import { formatDate } from '@/shared/lib/formatDate'
import { formatCurrency } from '@/shared/lib/formatCurrency'
import { CompanyActions } from './CompanyActions'
import type { AdminCompany } from '../types/admin.types'

const STATUS_LABEL: Record<string, string> = {
  active: 'Ativa', pending: 'Pendente', blocked: 'Bloqueada',
}
const SUB_LABEL: Record<string, string> = {
  active: 'Ativo', overdue: 'Vencido', grace: 'Carência', blocked: 'Bloqueado',
}

interface Props {
  companies: AdminCompany[]
  isLoading: boolean
  onBlock: (id: string) => void
  onActivate: (id: string) => void
}

export const CompaniesTable = ({ companies, isLoading, onBlock, onActivate }: Props) => {
  const columns: ColumnDef<AdminCompany>[] = [
    {
      accessorKey: 'name',
      header: 'Empresa',
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.name}</p>
          <p className="text-xs text-muted-foreground">{row.original.email}</p>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <StatusBadge
          status={row.original.status as never}
          label={STATUS_LABEL[row.original.status] ?? row.original.status}
        />
      ),
    },
    {
      id: 'subscription',
      header: 'Assinatura',
      cell: ({ row }) => {
        const sub = row.original.subscription
        if (!sub) return <span className="text-muted-foreground text-sm">—</span>
        return (
          <div>
            <StatusBadge
              status={sub.status as never}
              label={SUB_LABEL[sub.status] ?? sub.status}
            />
            <p className="text-xs text-muted-foreground mt-0.5">
              {formatCurrency(sub.monthlyPrice)}/mês · vence {formatDate(sub.dueDate)}
            </p>
          </div>
        )
      },
    },
    {
      id: 'plan',
      header: 'Plano',
      cell: ({ row }) => {
        const sub = row.original.subscription
        if (!sub) return <span className="text-muted-foreground text-sm">—</span>
        return <span className="text-sm">{sub.maxStaff} atendentes</span>
      },
    },
    {
      accessorKey: 'staffCount',
      header: 'Atendentes',
      cell: ({ row }) => row.original.staffCount,
    },
    {
      accessorKey: 'createdAt',
      header: 'Cadastro',
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <CompanyActions
          company={row.original}
          onBlock={onBlock}
          onActivate={onActivate}
        />
      ),
    },
  ]

  return <DataTable columns={columns} data={companies} isLoading={isLoading} />
}
