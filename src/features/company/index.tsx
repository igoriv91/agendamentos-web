import { useState } from 'react'
import { Copy, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import { PageLayout } from '@/shared/components/layout/PageLayout'
import { Header } from '@/shared/components/layout/Header'
import { AppButton } from '@/shared/components/custom/AppButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { Button } from '@/shared/components/ui/button'
import { Separator } from '@/shared/components/ui/separator'
import { staffApi } from '@/features/staff/staff.api'
import { SubscriptionStatus } from '@/features/subscription/components/SubscriptionStatus'
import { useEffect } from 'react'
import type { Staff } from '@/features/staff/types/staff.types'
import { useCompany } from './hooks/useCompany'
import { useBusinessHours } from './hooks/useBusinessHours'

export default function CompanyPage() {
  const { company, form, isLoading, isSaving, handleSubmit, handleRegenerateToken } = useCompany()
  const [staffList, setStaffList] = useState<Staff[]>([])
  const [selectedStaff, setSelectedStaff] = useState<string | undefined>()
  const { hours, dayNames, handleChange, handleSave, isSaving: savingHours } = useBusinessHours(selectedStaff)
  const bookingUrl = company ? `${window.location.origin}/book/${company.bookingLinkToken}` : ''

  useEffect(() => { staffApi.list().then((s) => { setStaffList(s); if (s[0]) setSelectedStaff(s[0].id) }) }, [])

  if (isLoading) return <PageLayout><div className="flex h-40 items-center justify-center"><div className="h-6 w-6 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div></PageLayout>

  return (
    <PageLayout>
      <Header title="Configurações" subtitle="Gerencie os dados da sua empresa" />
      <div className="p-4 md:p-6">
        <Tabs defaultValue="company">
          <TabsList className="mb-6">
            <TabsTrigger value="company">Dados da empresa</TabsTrigger>
            <TabsTrigger value="hours">Horários de funcionamento</TabsTrigger>
            <TabsTrigger value="link">Link de agendamento</TabsTrigger>
            <TabsTrigger value="subscription">Assinatura</TabsTrigger>
          </TabsList>

          <TabsContent value="company">
            <Card className="max-w-lg">
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem><FormLabel>Nome da empresa</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem><FormLabel>E-mail</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem><FormLabel>Telefone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <AppButton type="submit" isLoading={isSaving}>Salvar alterações</AppButton>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hours">
            <Card className="max-w-2xl">
              <CardHeader>
                <CardTitle className="text-base">Selecione o atendente</CardTitle>
                <div className="flex flex-wrap gap-2 pt-2">
                  {staffList.map((s) => (
                    <Button
                      key={s.id}
                      variant={selectedStaff === s.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedStaff(s.id)}
                    >{s.name}</Button>
                  ))}
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4 space-y-3">
                {hours.map((h, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium">{dayNames[i]}</div>
                    <input
                      type="checkbox"
                      checked={h.isOpen}
                      onChange={(e) => handleChange(i, 'isOpen', e.target.checked)}
                      className="h-4 w-4"
                    />
                    <Input
                      type="time"
                      value={h.openTime}
                      disabled={!h.isOpen}
                      onChange={(e) => handleChange(i, 'openTime', e.target.value)}
                      className="w-32"
                    />
                    <span className="text-muted-foreground text-sm">até</span>
                    <Input
                      type="time"
                      value={h.closeTime}
                      disabled={!h.isOpen}
                      onChange={(e) => handleChange(i, 'closeTime', e.target.value)}
                      className="w-32"
                    />
                  </div>
                ))}
                <AppButton onClick={handleSave} isLoading={savingHours} className="mt-4">
                  Salvar horários
                </AppButton>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="link">
            <Card className="max-w-lg">
              <CardHeader><CardTitle className="text-base">Link público de agendamento</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 rounded-md border bg-muted px-3 py-2">
                  <span className="flex-1 truncate text-sm">{bookingUrl}</span>
                  <Button
                    variant="ghost" size="icon"
                    onClick={() => { navigator.clipboard.writeText(bookingUrl); toast.success('Link copiado!') }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" onClick={handleRegenerateToken}>
                  <RefreshCw className="mr-2 h-4 w-4" />Regenerar link
                </Button>
                <p className="text-xs text-muted-foreground">
                  Regenerar invalida o link anterior. Clientes com o link antigo não conseguirão acessar.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription">
            <SubscriptionStatus />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
