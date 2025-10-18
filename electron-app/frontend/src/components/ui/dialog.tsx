import * as React from "react"
import { cn } from "@/utils/cn"

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export function Dialog({ open, onClose, title, children, className, ...props }: DialogProps) {
  if (!open) return null
  return (
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm", className)} {...props}>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 min-w-[320px] max-w-lg w-full relative">
        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
          aria-label="Close dialog"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  )
}
