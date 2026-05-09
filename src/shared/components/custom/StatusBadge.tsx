import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/lib/utils'

// MD3 Tonal Chip — cor de fundo derivada do token do status, contraste garantido
const variants = cva(
  'inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium leading-5 tracking-wide',
  {
    variants: {
      status: {
        // verde — ativo / realizado
        active:    'bg-[oklch(0.93_0.07_143)] text-[oklch(0.32_0.13_143)]',
        completed: 'bg-[oklch(0.93_0.07_143)] text-[oklch(0.32_0.13_143)]',
        // azul primário — confirmado
        confirmed: 'bg-[oklch(0.92_0.06_264)] text-[oklch(0.35_0.16_264)]',
        // âmbar — pendente
        pending:   'bg-[oklch(0.95_0.07_85)]  text-[oklch(0.40_0.12_75)]',
        // laranja — vencido / carência
        overdue:   'bg-[oklch(0.93_0.08_50)]  text-[oklch(0.40_0.13_45)]',
        grace:     'bg-[oklch(0.93_0.08_50)]  text-[oklch(0.40_0.13_45)]',
        // vermelho — bloqueado / cancelado
        blocked:   'bg-[oklch(0.93_0.07_27)]  text-[oklch(0.40_0.15_27)]',
        cancelled: 'bg-[oklch(0.93_0.07_27)]  text-[oklch(0.40_0.15_27)]',
        // cinza neutro — inativo
        inactive:  'bg-[oklch(0.92_0.01_264)] text-[oklch(0.45_0.03_264)]',
      },
    },
    defaultVariants: { status: 'pending' },
  },
)

interface StatusBadgeProps extends VariantProps<typeof variants> {
  label: string
  className?: string
}

export const StatusBadge = ({ status, label, className }: StatusBadgeProps) => (
  <span className={cn(variants({ status }), className)}>{label}</span>
)
