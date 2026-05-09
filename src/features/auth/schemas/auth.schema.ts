import { z } from 'zod'

// ── Login ──────────────────────────────────────────────────────────────
export const loginSchema = z.object({
  email:    z.string().min(1, 'E-mail obrigatório').email('E-mail inválido'),
  password: z.string().min(1, 'Senha obrigatória'),
})
export type LoginFormData = z.infer<typeof loginSchema>

// ── Register — schemas por etapa ───────────────────────────────────────
export const step1Schema = z.object({
  userName:        z.string().min(2, 'Nome obrigatório').max(255),
  userEmail:       z.string().email('E-mail inválido'),
  password:        z.string().min(8, 'Mínimo 8 caracteres'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'As senhas não conferem',
  path: ['confirmPassword'],
})
export type Step1Data = z.infer<typeof step1Schema>

export const step2Schema = z.object({
  companyName:  z.string().min(2, 'Nome da empresa obrigatório').max(255),
  slug:         z.string()
    .min(2, 'Mínimo 2 caracteres').max(100)
    .regex(/^[a-z0-9-]+$/, 'Apenas letras minúsculas, números e hífens'),
  companyEmail: z.string().email('E-mail inválido'),
  companyPhone: z.string().optional(),
})
export type Step2Data = z.infer<typeof step2Schema>

export interface StaffItem    { name: string; phone?: string }
export interface ServiceItem  { name: string; durationMinutes: number; price?: number }
export interface HoursItem    { dayOfWeek: number; isOpen: boolean; openTime: string; closeTime: string }

// ── Payload final para a API ───────────────────────────────────────────
export interface RegisterPayload {
  userName: string; userEmail: string; password: string
  companyName: string; slug: string; companyEmail: string; companyPhone?: string
  planSlots: number; trial: boolean
  staff: StaffItem[]; services: ServiceItem[]; businessHours: HoursItem[]
}
