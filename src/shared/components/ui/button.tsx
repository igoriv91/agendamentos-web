import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

const buttonVariants = cva(
  // MD3 base: pill shape, 40dp default height, font-medium label
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:scale-[0.97] disabled:pointer-events-none disabled:opacity-38 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // MD3 Filled Button
        default:     "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md",
        // MD3 Outlined Button
        outline:     "border-border bg-transparent text-primary hover:bg-primary/8 aria-expanded:bg-muted dark:border-input",
        // MD3 Tonal Button (secondary container)
        secondary:   "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary",
        // MD3 Text/Ghost Button
        ghost:       "hover:bg-muted hover:text-foreground aria-expanded:bg-muted",
        // Destructive
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/30",
        link:        "text-primary underline-offset-4 hover:underline",
      },
      size: {
        // MD3 standard: 40dp height
        default: "h-10 gap-2 px-6 text-sm",
        // MD3 compact: 36dp
        sm:      "h-9 gap-1.5 px-4 text-sm",
        // MD3 large: 48dp — full accessible touch target
        lg:      "h-12 gap-2 px-8 text-base",
        xs:      "h-7 gap-1 px-3 text-xs",
        // Icon buttons — round
        icon:       "size-10",
        "icon-xs":  "size-7 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm":  "size-9",
        "icon-lg":  "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>
export { Button, buttonVariants }

