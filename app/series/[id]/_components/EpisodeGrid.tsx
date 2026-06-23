import Link from 'next/link'
import type { Episode } from '@/types'

type Props = {
  episodes: Episode[]
  seriesId: string
  totalCount: number
}

const LockIcon = () => (
  <span
    className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full"
    style={{ background: '#d60000' }}
  >
    <svg viewBox="0 0 24 24" fill="white" className="h-2 w-2">
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
    </svg>
  </span>
)

export default function EpisodeGrid({ episodes, seriesId, totalCount }: Props) {
  return (
    <div className="mb-16">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-bold">Episodes</h2>
        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
          {totalCount} total
        </span>
      </div>
      <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-[repeat(auto-fill,minmax(80px,1fr))] sm:gap-1.5">
        {episodes.map((episode) => (
          <Link
            key={episode.number}
            href={`/watch/${seriesId}/${episode.number}`}
            className="relative flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md transition-all duration-150 select-none hover:opacity-70 active:opacity-50 sm:aspect-[3/2]"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid transparent',
              color: episode.free ? '#fff' : 'rgba(255,255,255,0.7)',
            }}
          >
            {!episode.free && <LockIcon />}
            <span className="text-xs font-semibold">{episode.number}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
