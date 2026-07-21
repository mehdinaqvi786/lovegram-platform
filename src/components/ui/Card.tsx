import React from 'react'
import { cn } from '@/utils/helpers'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
  glass?: boolean
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = true, glass = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl border border-slate-700/50 p-6',
          glass ? 'bg-slate-900/50 backdrop-blur-sm' : 'bg-slate-900',
          hoverable && 'transition-all hover:border-slate-600 hover:bg-slate-900/70',
          className
        )}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'
