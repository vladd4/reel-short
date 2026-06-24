'use client'

import { useRouter, useSearchParams } from 'next/navigation'

type Props = {
  categories: readonly string[]
}

export default function CategoryTabs({ categories }: Props) {
  const router = useRouter()
  const params = useSearchParams()
  const active = (params.get('genre') ?? '').toLowerCase() || 'all'

  function select(cat: string) {
    if (cat === 'All') router.push('/')
    else router.push(`/?genre=${cat.toLowerCase()}`)
  }

  return (
    <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
      {categories.map((c) => {
        const isActive = c.toLowerCase() === active
        return (
          <button
            key={c}
            onClick={() => select(c)}
            className="flex-shrink-0 cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200"
            style={
              isActive
                ? { background: 'var(--primary)', color: '#fff' }
                : {
                    background: 'rgba(255,255,255,0.06)',
                    color: 'var(--muted)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }
            }
          >
            {c}
          </button>
        )
      })}
    </div>
  )
}
