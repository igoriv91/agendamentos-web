import * as React from 'react'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { X } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

function Dialog(props: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root {...props} />
}

function DialogTrigger(props: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger {...props} />
}

function DialogClose({ className, children, ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close className={cn(className)} {...props}>{children}</DialogPrimitive.Close>
}

function DialogPortal(props: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal {...props} />
}

const DialogOverlay = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof DialogPrimitive.Backdrop>>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Backdrop
      ref={ref}
      className={cn(
        'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity',
        'data-[open]:animate-in data-[open]:fade-in-0',
        'data-[closed]:animate-out data-[closed]:fade-out-0',
        className,
      )}
      {...props}
    />
  ),
)
DialogOverlay.displayName = 'DialogOverlay'

const DialogContent = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof DialogPrimitive.Popup>>(
  ({ className, children, ...props }, ref) => (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        ref={ref}
        className={cn(
          // Base
          'fixed z-50 grid bg-background shadow-lg',
          // Mobile: bottom sheet
          'bottom-0 left-0 right-0 w-full max-h-[92dvh] overflow-y-auto',
          'rounded-t-2xl border-t gap-4 p-6',
          // Desktop: centered modal
          'sm:bottom-auto sm:left-1/2 sm:top-1/2',
          'sm:w-full sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2',
          'sm:rounded-xl sm:border sm:max-h-[90dvh]',
          // Animations — mobile slides up, desktop zooms
          'duration-200',
          'data-open:animate-in data-open:fade-in-0',
          'data-closed:animate-out data-closed:fade-out-0',
          'data-open:slide-in-from-bottom sm:data-open:slide-in-from-bottom-0 sm:data-open:zoom-in-95',
          'data-closed:slide-out-to-bottom sm:data-closed:slide-out-to-bottom-0 sm:data-closed:zoom-out-95',
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none">
          <X className="h-4 w-4" /><span className="sr-only">Fechar</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  ),
)
DialogContent.displayName = 'DialogContent'

function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
}

function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
}

const DialogTitle = React.forwardRef<HTMLHeadingElement, React.ComponentProps<typeof DialogPrimitive.Title>>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  ),
)
DialogTitle.displayName = 'DialogTitle'

function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-muted-foreground', className)} {...props} />
}

export {
  Dialog, DialogClose, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogOverlay, DialogPortal,
  DialogTitle, DialogTrigger,
}
