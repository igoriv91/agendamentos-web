import { z } from 'zod'

export const guestSchema = z.object({
  name:  z.string().min(2, 'Nome deve ter ao menos 2 caracteres'),
  phone: z.string().min(8, 'Telefone inválido'),
})

export type GuestFormData = z.infer<typeof guestSchema>
