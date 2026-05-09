import { Button } from '@/shared/components/ui/button'
import type { Staff } from '@/features/staff/types/staff.types'

interface StaffFilterProps {
  staffList: Staff[]
  selected: string | undefined
  onChange: (id: string | undefined) => void
}

export const StaffFilter = ({ staffList, selected, onChange }: StaffFilterProps) => (
  <div className="flex flex-wrap gap-2">
    <Button
      size="sm"
      variant={!selected ? 'default' : 'outline'}
      onClick={() => onChange(undefined)}
    >
      Todos
    </Button>
    {staffList.map((s) => (
      <Button
        key={s.id}
        size="sm"
        variant={selected === s.id ? 'default' : 'outline'}
        onClick={() => onChange(s.id)}
      >
        {s.name}
      </Button>
    ))}
  </div>
)
