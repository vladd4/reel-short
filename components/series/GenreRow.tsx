import Link from 'next/link'
import type { Series } from '@/types'
import SeriesCard from './SeriesCard'

const PAGE_SIZE = 8

type Props = {
  genre: string
  series: Series[]
  showMoreButton?: boolean
}

export default function GenreRow({ genre, series, showMoreButton = true }: Props) {
  if (!series.length) return null

  const visible = showMoreButton ? series.slice(0, PAGE_SIZE) : series
  const hasMore = series.length > PAGE_SIZE

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-base font-black text-white">{genre}</span>
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase"
            style={{
              background: 'rgba(255,255,255,0.07)',
              color: 'rgba(255,255,255,0.35)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {series.length}
          </span>
        </div>
        {showMoreButton && hasMore && (
          <Link
            href={`/?genre=${genre}`}
            className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition-all hover:brightness-125"
            style={{
              background: 'rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.45)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            See all
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3 w-3">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        )}
      </div>
      <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-3">
        {visible.map((s) => (
          <SeriesCard key={s.id} series={s} size="lg" />
        ))}
      </div>
    </section>
  )
}
