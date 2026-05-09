import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/shared/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import {
  Select, SelectContent, SelectItem, SelectTrigger,
} from '@/shared/components/ui/select'
import { Textarea } from '@/shared/components/ui/textarea'
import { AppButton } from '@/shared/components/custom/AppButton'
import { Button } from '@/shared/components/ui/button'
import { useAppointmentEdit } from '../hooks/useAppointmentEdit'
import type { Appointment } from '../types/appointment.types'

const SelectLabel = ({ value, items, placeholder }: {
  value: string
  items: { id: string; label: string }[]
  placeholder: string
}) => {
  const found = items.find((i) => i.id === value)
  return (
    <span className={found ? '' : 'text-muted-foreground'}>
      {found ? found.label : placeholder}
    </span>
  )
}

interface Props {
  appointment: Appointment | null
  onClose: () => void
  onSuccess: () => void
}

export const AppointmentEditDialog = ({ appointment, onClose, onSuccess }: Props) => {
  const { form, handleSubmit, isLoading, staffList, serviceList } = useAppointmentEdit(
    appointment,
    () => { onSuccess(); onClose() },
  )

  return (
    <Dialog open={!!appointment} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar agendamento</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-3">
            <FormField control={form.control} name="staffId" render={({ field }) => (
              <FormItem>
                <FormLabel>Atendente</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectLabel
                        value={field.value}
                        items={staffList.map((s) => ({ id: s.id, label: s.name }))}
                        placeholder="Selecione o atendente"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {staffList.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="serviceId" render={({ field }) => (
              <FormItem>
                <FormLabel>Serviço</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectLabel
                        value={field.value}
                        items={serviceList.map((s) => ({ id: s.id, label: `${s.name} (${s.durationMinutes} min)` }))}
                        placeholder="Selecione o serviço"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {serviceList.map((s) => (
                      <SelectItem key={s.id} value={s.id}>{s.name} ({s.durationMinutes} min)</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="scheduledAt" render={({ field }) => (
              <FormItem>
                <FormLabel>Data e hora</FormLabel>
                <FormControl><Input type="datetime-local" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="clientName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do cliente</FormLabel>
                  <FormControl><Input placeholder="Nome" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="clientPhone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl><Input placeholder="(11) 99999-9999" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="notes" render={({ field }) => (
              <FormItem>
                <FormLabel>Observações (opcional)</FormLabel>
                <FormControl><Textarea rows={2} placeholder="Observações..." {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="flex gap-2 pt-1">
              <AppButton type="submit" isLoading={isLoading}>Salvar alterações</AppButton>
              <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
