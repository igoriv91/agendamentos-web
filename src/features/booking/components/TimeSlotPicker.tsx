import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { AppButton } from '@/shared/components/custom/AppButton'
import { cn } from '@/shared/lib/utils'

interface Props {
  selectedDate: string
  slots: string[]
  selectedSlot: string | null
  isLoading: boolean
  serviceName: string
  staffName: string
  onDateChange: (date: string) => void
  onSlotSelect: (slot: string) => void
  onContinue: () => void
  onBack: () => void
}

export const TimeSlotPicker = ({
  selectedDate, slots, selectedSlot, isLoading,
  serviceName, staffName,
  onDateChange, onSlotSelect, onContinue, onBack,
}: Props) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" onClick={onBack}>← Voltar</Button>
      <h2 className="text-lg font-semibold">Escolha o horário</h2>
    </div>
    <p className="text-sm text-muted-foreground">
      {staffName} · {serviceName}
    </p>

    <div>
      <label className="text-sm font-medium mb-1 block">Data</label>
      <Input
        type="date"
        value={selectedDate}
        min={new Date().toISOString().split('T')[0]}
        onChange={(e) => onDateChange(e.target.value)}
        className="max-w-xs"
      />
    </div>

    {isLoading ? (
      <div className="flex h-20 items-center justify-center">
        <div className="h-5 w-5 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    ) : slots.length === 0 ? (
      <p className="text-muted-foreground text-sm py-4 text-center">
        Nenhum horário disponível neste dia.
      </p>
    ) : (
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
        {slots.map((slot) => (
          <button
            key={slot}
            onClick={() => onSlotSelect(slot)}
            className={cn(
              'rounded-md border px-3 py-2 text-sm font-medium transition-colors',
              selectedSlot === slot
                ? 'bg-primary text-primary-foreground border-primary'
                : 'hover:bg-muted',
            )}
          >
            {slot}
          </button>
        ))}
      </div>
    )}

    {selectedSlot && (
      <AppButton onClick={onContinue} className="w-full sm:w-auto">
        Continuar com {selectedSlot}
      </AppButton>
    )}
  </div>
)
