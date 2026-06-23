import type { ReactNode } from 'react'

type Props = {
  icon: ReactNode
  title: string
  description: string
  className?: string
}

export default function EmptyState({ icon, title, description, className = '' }: Props) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 py-20 text-center ${className}`}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </div>
    </div>
  )
}
