import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Button } from '@/shared/components/ui/button'
import { AppButton } from '@/shared/components/custom/AppButton'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { Card, CardContent } from '@/shared/components/ui/card'
import { guestSchema, type GuestFormData } from '../schemas/booking.schema'

interface Props {
  staffName: string
  serviceName: string
  selectedDate: string
  selectedSlot: string
  isLoading: boolean
  onConfirm: (name: string, phone: string) => void
  onBack: () => void
}

export const GuestForm = ({
  staffName, serviceName, selectedDate, selectedSlot, isLoading, onConfirm, onBack,
}: Props) => {
  const form = useForm<GuestFormData>({
    resolver: zodResolver(guestSchema),
    defaultValues: { name: '', phone: '' },
  })

  const handleSubmit = form.handleSubmit((data) => onConfirm(data.name, data.phone))

  const dateLabel = format(new Date(`${selectedDate}T12:00:00`), "EEEE, d 'de' MMMM", { locale: ptBR })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onBack}>← Voltar</Button>
        <h2 className="text-lg font-semibold">Confirmar agendamento</h2>
      </div>

      <Card>
        <CardContent className="pt-4 space-y-1 text-sm">
          <p><span className="text-muted-foreground">Atendente:</span> <strong>{staffName}</strong></p>
          <p><span className="text-muted-foreground">Serviço:</span> <strong>{serviceName}</strong></p>
          <p><span className="text-muted-foreground">Data:</span> <strong className="capitalize">{dateLabel}</strong></p>
          <p><span className="text-muted-foreground">Horário:</span> <strong>{selectedSlot}</strong></p>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Seu nome</FormLabel>
              <FormControl><Input placeholder="Nome completo" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem>
              <FormLabel>Seu telefone</FormLabel>
              <FormControl><Input placeholder="(11) 99999-9999" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <AppButton type="submit" isLoading={isLoading} className="w-full">
            Confirmar agendamento
          </AppButton>
        </form>
      </Form>
    </div>
  )
}
