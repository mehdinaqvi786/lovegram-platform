import React from 'react'
import { cn } from '@/utils/helpers'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning'
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const variantClasses = {
      primary: 'bg-rose-500/20 text-rose-300',
      secondary: 'bg-slate-700/50 text-slate-300',
      success: 'bg-emerald-500/20 text-emerald-300',
      danger: 'bg-red-500/20 text-red-300',
      warning: 'bg-amber-500/20 text-amber-300',
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
          variantClasses[variant],
          className
        )}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'
