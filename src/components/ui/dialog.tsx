import * as React from "react"
import { cn } from "../../utils/cn";

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean
  onClose: () => void
}

export function Dialog({ open, onClose, className, children, ...props }: React.PropsWithChildren<DialogProps>) {
  if (!open) return null
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm",
        className
      )}
      onClick={onClose}
      {...props}
    >
      <div
        className="bg-background rounded-lg shadow-xl p-6 min-w-[320px] max-w-lg w-full"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
