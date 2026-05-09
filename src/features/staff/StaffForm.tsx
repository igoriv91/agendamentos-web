import { PageLayout } from '@/shared/components/layout/PageLayout'
import { Header } from '@/shared/components/layout/Header'
import { AppButton } from '@/shared/components/custom/AppButton'
import { Card, CardContent } from '@/shared/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { useAppNavigate } from '@/shared/hooks/useAppNavigate'
import { useStaffForm } from './hooks/useStaffForm'

export default function StaffForm() {
  const { form, handleSubmit, isLoading, isEdit } = useStaffForm()
  const { goBack } = useAppNavigate()

  return (
    <PageLayout>
      <Header title={isEdit ? 'Editar Atendente' : 'Novo Atendente'} />
      <div className="p-6">
        <Card className="max-w-lg">
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl><Input placeholder="Nome do atendente" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl><Input type="email" placeholder="email@empresa.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl><Input placeholder="(11) 99999-9999" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-3 pt-2">
                  <AppButton type="submit" isLoading={isLoading}>
                    {isEdit ? 'Salvar' : 'Criar Atendente'}
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
