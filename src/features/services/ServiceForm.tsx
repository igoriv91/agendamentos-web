import { PageLayout } from '@/shared/components/layout/PageLayout'
import { Header } from '@/shared/components/layout/Header'
import { AppButton } from '@/shared/components/custom/AppButton'
import { Card, CardContent } from '@/shared/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import {
  Select, SelectContent, SelectItem, SelectTrigger,
} from '@/shared/components/ui/select'
import { useAppNavigate } from '@/shared/hooks/useAppNavigate'
import { useServiceForm } from './hooks/useServiceForm'

export default function ServiceForm() {
  const { form, handleSubmit, isLoading, isEdit, staffList } = useServiceForm()
  const { goBack } = useAppNavigate()

  return (
    <PageLayout>
      <Header title={isEdit ? 'Editar Serviço' : 'Novo Serviço'} />
      <div className="p-4 md:p-6">
        <Card className="max-w-lg">
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do serviço</FormLabel>
                    <FormControl><Input placeholder="Corte de cabelo" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="durationMinutes" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duração (min)</FormLabel>
                      <FormControl><Input type="number" min={1} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="price" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço (R$)</FormLabel>
                      <FormControl><Input type="number" min={0} step={0.01} placeholder="0,00" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="staffId" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Atendente (opcional)</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <span className={field.value ? '' : 'text-muted-foreground'}>
                            {staffList.find((s) => s.id === field.value)?.name ?? 'Todos os atendentes'}
                          </span>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">Todos os atendentes</SelectItem>
                        {staffList.map((s) => (
                          <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição (opcional)</FormLabel>
                    <FormControl><Input placeholder="Descrição do serviço" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="flex gap-3 pt-2">
                  <AppButton type="submit" isLoading={isLoading}>
                    {isEdit ? 'Salvar' : 'Criar Serviço'}
                  </AppButton>
                  <Button type="button" variant="outline" onClick={goBack}>Cancelar</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
