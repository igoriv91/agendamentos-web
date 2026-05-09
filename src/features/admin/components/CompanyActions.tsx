import { MoreHorizontal, ShieldCheck, ShieldOff } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import type { AdminCompany } from '../types/admin.types'

interface Props {
  company: AdminCompany
  onBlock: (id: string) => void
  onActivate: (id: string) => void
}

export const CompanyActions = ({ company, onBlock, onActivate }: Props) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      {company.status !== 'blocked' ? (
        <DropdownMenuItem className="text-destructive" onClick={() => onBlock(company.id)}>
          <ShieldOff className="mr-2 h-4 w-4" />Bloquear
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem onClick={() => onActivate(company.id)}>
          <ShieldCheck className="mr-2 h-4 w-4" />Reativar
        </DropdownMenuItem>
      )}
    </DropdownMenuContent>
  </DropdownMenu>
)
