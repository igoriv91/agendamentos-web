import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { StatusBadge } from '@/shared/components/custom/StatusBadge'
import type { Staff } from '../types/staff.types'

interface ActionsProps {
  staff: Staff
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

const StaffActions = ({ staff, onEdit, onDelete }: ActionsProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem onClick={() => onEdit(staff.id)}>
        <Pencil className="mr-2 h-4 w-4" />Editar
      </DropdownMenuItem>
      <DropdownMenuItem
        className="text-destructive"
        onClick={() => onDelete(staff.id)}
      >
        <Trash2 className="mr-2 h-4 w-4" />Desativar
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

export const getStaffColumns = (
  onEdit: (id: string) => void,
  onDelete: (id: string) => void,
): ColumnDef<Staff>[] => [
  { accessorKey: 'name',  header: 'Nome' },
  { accessorKey: 'email', header: 'E-mail', cell: ({ row }) => row.original.email ?? '—' },
  { accessorKey: 'phone', header: 'Telefone', cell: ({ row }) => row.original.phone ?? '—' },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => (
      <StatusBadge
        status={row.original.isActive ? 'active' : 'inactive'}
        label={row.original.isActive ? 'Ativo' : 'Inativo'}
      />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <StaffActions staff={row.original} onEdit={onEdit} onDelete={onDelete} />,
  },
]
