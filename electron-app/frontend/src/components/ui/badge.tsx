import * as React from "react"
import { cn } from "@/utils/cn"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

const variantClasses = {
  default: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  secondary: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  destructive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  outline: "border border-gray-300 text-gray-900 dark:border-gray-700 dark:text-gray-200",
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
)
Badge.displayName = "Badge"
