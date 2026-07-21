export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="h-12 w-12 rounded-full border-4 border-slate-700 border-t-rose-500 animate-spin" />
    </div>
  )
}

export function LoadingDots() {
  return (
    <div className="flex gap-2">
      <div className="h-2 w-2 rounded-full bg-rose-500 animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="h-2 w-2 rounded-full bg-rose-500 animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="h-2 w-2 rounded-full bg-rose-500 animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  )
}

export function SuspenseSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-12 w-full rounded-lg bg-slate-800 animate-pulse" />
      <div className="h-12 w-full rounded-lg bg-slate-800 animate-pulse" />
      <div className="h-12 w-full rounded-lg bg-slate-800 animate-pulse" />
    </div>
  )
}
