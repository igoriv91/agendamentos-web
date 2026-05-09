import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  User, Building2, Users, Scissors, Clock, CreditCard,
  Plus, Trash2, ChevronRight, ChevronLeft, Check,
} from 'lucide-react'
import { Card, CardContent } from '@/shared/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { AppLogo } from '@/shared/components/custom/AppLogo'
import { cn } from '@/shared/lib/utils'
import { useRegister } from './hooks/useRegister'
import type { StaffItem, ServiceItem, HoursItem } from './schemas/auth.schema'
import { step1Schema, step2Schema } from './schemas/auth.schema'

const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

const STEPS = [
  { label: 'Responsável',  icon: User },
  { label: 'Empresa',      icon: Building2 },
  { label: 'Atendentes',   icon: Users },
  { label: 'Serviços',     icon: Scissors },
  { label: 'Horários',     icon: Clock },
  { label: 'Plano',        icon: CreditCard },
]

const slugify = (v: string) =>
  v.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim().replace(/\s+/g, '-').replace(/-+/g, '-')
    .slice(0, 100)

// ── Step indicator ────────────────────────────────────────────────────
const StepBar = ({ current }: { current: number }) => (
  <div className="flex items-center gap-1 mb-8">
    {STEPS.map((s, i) => {
      const done = i < current - 1
      const active = i === current - 1
      return (
        <div key={i} className="flex items-center gap-1 flex-1">
          <div className={cn(
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all',
            done   && 'bg-primary text-primary-foreground',
            active && 'bg-primary text-primary-foreground ring-4 ring-primary/20',
            !done && !active && 'bg-muted text-muted-foreground',
          )}>
            {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
          </div>
          {i < STEPS.length - 1 && (
            <div className={cn('h-0.5 flex-1 rounded-full transition-all', done ? 'bg-primary' : 'bg-muted')} />
          )}
        </div>
      )
    })}
  </div>
)

const StepTitle = ({ step }: { step: number }) => {
  const s = STEPS[step - 1]
  const Icon = s.icon
  return (
    <div className="flex items-center gap-2 mb-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Etapa {step} de {STEPS.length}</p>
        <h2 className="text-base font-semibold leading-tight">{s.label}</h2>
      </div>
    </div>
  )
}

const Nav = ({ onBack, onNext, nextLabel = 'Continuar', loading = false, canSkip = false, onSkip }: {
  onBack?: () => void; onNext?: () => void; nextLabel?: string
  loading?: boolean; canSkip?: boolean; onSkip?: () => void
}) => (
  <div className="flex items-center justify-between pt-4 mt-2 border-t">
    {onBack
      ? <Button type="button" variant="ghost" size="sm" onClick={onBack}><ChevronLeft className="h-4 w-4 mr-1" />Voltar</Button>
      : <div />
    }
    <div className="flex items-center gap-2">
      {canSkip && <Button type="button" variant="ghost" size="sm" onClick={onSkip}>Pular</Button>}
      <Button type={onNext ? 'button' : 'submit'} size="sm" onClick={onNext} disabled={loading}>
        {loading ? 'Aguarde...' : nextLabel}<ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  </div>
)

// ── Etapa 1: Responsável ──────────────────────────────────────────────
const Step1 = ({ form, onNext }: { form: ReturnType<typeof useForm<z.infer<typeof step1Schema>>>; onNext: () => void }) => (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onNext)} className="space-y-3">
      <FormField control={form.control} name="userName" render={({ field }) => (
        <FormItem><FormLabel>Seu nome completo</FormLabel>
          <FormControl><Input placeholder="Ana Silva" {...field} /></FormControl>
          <FormMessage /></FormItem>
      )} />
      <FormField control={form.control} name="userEmail" render={({ field }) => (
        <FormItem><FormLabel>Seu e-mail</FormLabel>
          <FormControl><Input type="email" placeholder="ana@email.com" {...field} /></FormControl>
          <FormMessage /></FormItem>
      )} />
      <div className="grid grid-cols-2 gap-3">
        <FormField control={form.control} name="password" render={({ field }) => (
          <FormItem><FormLabel>Senha</FormLabel>
            <FormControl><Input type="password" placeholder="Mín. 8 caracteres" {...field} /></FormControl>
            <FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="confirmPassword" render={({ field }) => (
          <FormItem><FormLabel>Confirmar senha</FormLabel>
            <FormControl><Input type="password" placeholder="Repita a senha" {...field} /></FormControl>
            <FormMessage /></FormItem>
        )} />
      </div>
      <Nav nextLabel="Continuar" />
    </form>
  </Form>
)

// ── Etapa 2: Empresa ──────────────────────────────────────────────────
const Step2 = ({ form, onNext, onBack }: {
  form: ReturnType<typeof useForm<z.infer<typeof step2Schema>>>
  onNext: () => void; onBack: () => void
}) => {
  const companyName = form.watch('companyName')
  useEffect(() => {
    form.setValue('slug', slugify(companyName), { shouldValidate: false })
  }, [companyName, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-3">
        <FormField control={form.control} name="companyName" render={({ field }) => (
          <FormItem><FormLabel>Nome da empresa</FormLabel>
            <FormControl><Input placeholder="Salão da Ana" {...field} /></FormControl>
            <FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="slug" render={({ field }) => (
          <FormItem>
            <FormLabel>Identificador único</FormLabel>
            <FormControl>
              <div className="flex items-center rounded-lg border border-input overflow-hidden">
                <span className="px-3 py-2 bg-muted text-muted-foreground text-sm shrink-0">agendall.app/</span>
                <input className="flex-1 px-2 py-2 text-sm bg-transparent outline-none" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="companyEmail" render={({ field }) => (
          <FormItem><FormLabel>E-mail da empresa</FormLabel>
            <FormControl><Input type="email" placeholder="contato@empresa.com" {...field} /></FormControl>
            <FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="companyPhone" render={({ field }) => (
          <FormItem><FormLabel>Telefone (opcional)</FormLabel>
            <FormControl><Input placeholder="(11) 99999-9999" {...field} /></FormControl>
            <FormMessage /></FormItem>
        )} />
        <Nav onBack={onBack} nextLabel="Continuar" />
      </form>
    </Form>
  )
}

// ── Etapa 3: Atendentes ───────────────────────────────────────────────
const Step3 = ({ staff, setStaff, onBack, onNext, onSkip }: {
  staff: StaffItem[]; setStaff: (s: StaffItem[]) => void
  onBack: () => void; onNext: () => void; onSkip: () => void
}) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const add = () => {
    if (!name.trim()) return
    setStaff([...staff, { name: name.trim(), phone: phone.trim() || undefined }])
    setName(''); setPhone('')
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {staff.map((s, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl bg-muted px-3 py-2 text-sm">
            <span className="font-medium">{s.name}</span>
            <div className="flex items-center gap-3">
              {s.phone && <span className="text-muted-foreground">{s.phone}</span>}
              <button onClick={() => setStaff(staff.filter((_, j) => j !== i))} className="text-destructive hover:opacity-80">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input placeholder="Nome do atendente" value={name} onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), add())} />
        <Input placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-36" />
        <Button type="button" variant="outline" size="icon" onClick={add}><Plus className="h-4 w-4" /></Button>
      </div>
      <Nav onBack={onBack} onNext={onNext} nextLabel="Continuar" canSkip onSkip={onSkip} />
    </div>
  )
}

// ── Etapa 4: Serviços ─────────────────────────────────────────────────
const Step4 = ({ services, setServices, onBack, onNext, onSkip }: {
  services: ServiceItem[]; setServices: (s: ServiceItem[]) => void
  onBack: () => void; onNext: () => void; onSkip: () => void
}) => {
  const [name, setName] = useState('')
  const [duration, setDuration] = useState('30')
  const [price, setPrice] = useState('')

  const add = () => {
    if (!name.trim() || !duration) return
    setServices([...services, { name: name.trim(), durationMinutes: Number(duration), price: price ? Number(price) : undefined }])
    setName(''); setDuration('30'); setPrice('')
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {services.map((s, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl bg-muted px-3 py-2 text-sm">
            <span className="font-medium">{s.name}</span>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">{s.durationMinutes} min</span>
              {s.price && <span className="text-muted-foreground">R$ {s.price}</span>}
              <button onClick={() => setServices(services.filter((_, j) => j !== i))} className="text-destructive hover:opacity-80">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-2">
        <Input className="col-span-2" placeholder="Nome do serviço" value={name} onChange={(e) => setName(e.target.value)} />
        <Input type="number" placeholder="Min" value={duration} onChange={(e) => setDuration(e.target.value)} />
        <Input type="number" placeholder="R$" value={price} onChange={(e) => setPrice(e.target.value)} />
        <Button type="button" variant="outline" size="icon" onClick={add}><Plus className="h-4 w-4" /></Button>
      </div>
      <Nav onBack={onBack} onNext={onNext} nextLabel="Continuar" canSkip onSkip={onSkip} />
    </div>
  )
}

// ── Etapa 5: Horários ─────────────────────────────────────────────────
const Step5 = ({ hours, setHours, onBack, onNext, onSkip }: {
  hours: HoursItem[]; setHours: (h: HoursItem[]) => void
  onBack: () => void; onNext: () => void; onSkip: () => void
}) => {
  const update = (i: number, patch: Partial<HoursItem>) =>
    setHours(hours.map((h, idx) => idx === i ? { ...h, ...patch } : h))

  return (
    <div className="space-y-3">
      {hours.map((h, i) => (
        <div key={i} className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={h.isOpen}
              onChange={(e) => update(i, { isOpen: e.target.checked })}
              className="h-4 w-4 rounded accent-primary"
            />
            <span className={cn('text-sm w-8 font-medium', !h.isOpen && 'text-muted-foreground')}>{DAYS[h.dayOfWeek]}</span>
          </label>
          {h.isOpen ? (
            <div className="flex items-center gap-2 flex-1">
              <Input type="time" value={h.openTime}  onChange={(e) => update(i, { openTime: e.target.value })}  className="h-8 text-sm" />
              <span className="text-muted-foreground text-xs">até</span>
              <Input type="time" value={h.closeTime} onChange={(e) => update(i, { closeTime: e.target.value })} className="h-8 text-sm" />
            </div>
          ) : (
            <span className="text-xs text-muted-foreground italic">Fechado</span>
          )}
        </div>
      ))}
      <Nav onBack={onBack} onNext={onNext} nextLabel="Continuar" canSkip onSkip={onSkip} />
    </div>
  )
}

// ── Etapa 6: Plano ────────────────────────────────────────────────────
const Step6 = ({ onBack, onSubmit, isLoading }: {
  onBack: () => void; onSubmit: (trial: boolean, slots: number) => void; isLoading: boolean
}) => {
  const [trial, setTrial] = useState(true)
  const [slots, setSlots] = useState(1)
  const price = slots * 50

  return (
    <div className="space-y-4">
      {/* Gratuito */}
      <button
        type="button"
        onClick={() => setTrial(true)}
        className={cn(
          'w-full rounded-2xl border-2 p-4 text-left transition-all',
          trial ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40',
        )}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Grátis por 7 dias</p>
            <p className="text-sm text-muted-foreground mt-0.5">Até 5 atendentes • Sem cartão de crédito</p>
          </div>
          <div className={cn('h-5 w-5 rounded-full border-2 flex items-center justify-center',
            trial ? 'border-primary bg-primary' : 'border-muted-foreground')}>
            {trial && <div className="h-2 w-2 rounded-full bg-white" />}
          </div>
        </div>
      </button>

      {/* Pago */}
      <button
        type="button"
        onClick={() => setTrial(false)}
        className={cn(
          'w-full rounded-2xl border-2 p-4 text-left transition-all',
          !trial ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40',
        )}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-semibold">Plano Pago</p>
            <p className="text-sm text-muted-foreground mt-0.5">R$ 50/mês por bloco de 5 atendentes</p>
          </div>
          <div className={cn('h-5 w-5 rounded-full border-2 flex items-center justify-center',
            !trial ? 'border-primary bg-primary' : 'border-muted-foreground')}>
            {!trial && <div className="h-2 w-2 rounded-full bg-white" />}
          </div>
        </div>
        {!trial && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Button type="button" variant="outline" size="icon-sm" onClick={(e) => { e.stopPropagation(); setSlots(Math.max(1, slots - 1)) }}>-</Button>
              <div className="text-center flex-1">
                <p className="font-semibold">{slots * 5} atendentes</p>
                <p className="text-xs text-muted-foreground">{slots} bloco{slots > 1 ? 's' : ''}</p>
              </div>
              <Button type="button" variant="outline" size="icon-sm" onClick={(e) => { e.stopPropagation(); setSlots(slots + 1) }}>+</Button>
            </div>
            <div className="rounded-xl bg-primary/10 px-3 py-2 text-center">
              <p className="text-lg font-bold text-primary">R$ {price}<span className="text-sm font-normal">/mês</span></p>
            </div>
          </div>
        )}
      </button>

      <Nav
        onBack={onBack}
        onNext={() => onSubmit(trial, trial ? 1 : slots)}
        nextLabel={trial ? 'Começar gratuitamente' : `Assinar por R$ ${price}/mês`}
        loading={isLoading}
      />
    </div>
  )
}

// ── Página principal ──────────────────────────────────────────────────
export default function Register() {
  const {
    step, back, skip,
    form1, next1,
    form2, next2,
    staff, setStaff,
    services, setServices,
    hours, setHours,
    isLoading, submit,
  } = useRegister()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4 gap-5">
      {/* Marca */}
      <div className="flex items-center gap-3">
        <AppLogo size={40} />
        <span className="text-xl font-bold tracking-tight">AgendAll</span>
      </div>

      <Card className="w-full max-w-lg">
        <CardContent className="pt-6">
          <StepBar current={step} />
          <StepTitle step={step} />

          {step === 1 && <Step1 form={form1} onNext={next1} />}
          {step === 2 && <Step2 form={form2} onNext={next2} onBack={back} />}
          {step === 3 && <Step3 staff={staff} setStaff={setStaff} onBack={back} onNext={() => skip()} onSkip={skip} />}
          {step === 4 && <Step4 services={services} setServices={setServices} onBack={back} onNext={() => skip()} onSkip={skip} />}
          {step === 5 && <Step5 hours={hours} setHours={setHours} onBack={back} onNext={() => skip()} onSkip={skip} />}
          {step === 6 && <Step6 onBack={back} onSubmit={submit} isLoading={isLoading} />}
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground">
        Já tem conta?{' '}
        <Link to="/" className="text-primary font-medium underline-offset-4 hover:underline">Entrar</Link>
      </p>
    </div>
  )
}
