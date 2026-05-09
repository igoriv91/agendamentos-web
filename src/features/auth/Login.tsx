import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/shared/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { AppLogo } from '@/shared/components/custom/AppLogo'
import { useLogin } from './hooks/useLogin'

export default function Login() {
  const { form, handleSubmit, isLoading } = useLogin()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4 gap-6">
      {/* Marca */}
      <div className="flex flex-col items-center gap-3">
        <AppLogo size={64} />
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">AgendAll</h1>
          <p className="text-sm text-muted-foreground">Sistema de agendamento para empresas</p>
        </div>
      </div>

      <Card className="w-full max-w-sm">
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </Form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Não tem conta?{' '}
            <Link to="/register" className="text-primary font-medium underline-offset-4 hover:underline">
              Cadastre sua empresa
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
