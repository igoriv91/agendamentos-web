import { z } from 'zod'

export const serviceSchema = z.object({
  name:            z.string().min(1, 'Nome é obrigatório').max(255),
  durationMinutes: z.coerce.number().min(1, 'Duração é obrigatória').int(),
  price:           z.coerce.number().min(0).optional(),
  description:     z.string().optional(),
  staffId:         z.string().uuid().optional().or(z.literal('')),
})

export type ServiceFormData = z.infer<typeof serviceSchema>
