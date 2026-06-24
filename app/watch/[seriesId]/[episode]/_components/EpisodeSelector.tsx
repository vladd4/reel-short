'use client'

import Link from 'next/link'
import type { Episode } from '@/types'
import { ROUTES } from '@/constants'
import { useAuth } from '@/lib/auth'
import { useStore } from '@/lib/store'


type BatchTab = {
  start: number
  end: number
  label: string
}

type Props = {
  episodes: Episode[]
  batchTabs: BatchTab[]
  activeBatch: number
  currentEpisode: number
  seriesId: string
  seriesTitle: string
  onBatchChange: (index: number) => void
  onEpisodeSelect: (n: number) => void
}

export default function EpisodeSelector({
  episodes,
  batchTabs,
  activeBatch,
  currentEpisode,
  seriesId,
  seriesTitle,
  onBatchChange,
  onEpisodeSelect,
}: Props) {
  const { user } = useAuth()
  const { unlockedEpisodeIds } = useStore()
  const isSubscribed = user?.isSubscribed ?? false

  const activeBatchTab = batchTabs[activeBatch] ?? batchTabs[0]
  const visibleEpisodes = episodes.slice(activeBatchTab.start - 1, activeBatchTab.end)

  return (
    <div>
      <div
        className="mb-4 flex items-center gap-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        {batchTabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => onBatchChange(i)}
              className="relative px-4 py-2.5 text-sm font-medium transition-colors"
              style={{ color: activeBatch === i ? '#fff' : 'rgba(255,255,255,0.4)' }}
            >
              {tab.label}
              {activeBatch === i && (
                <span
                  className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full"
                  style={{ background: '#4500ff' }}
                />
              )}
            </button>
          ))}
        <Link
          href={ROUTES.series(seriesId, seriesTitle)}
          className="ml-auto flex items-center gap-1 pb-2.5 text-xs transition-colors hover:text-foreground"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          All Episodes
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </Link>
      </div>

      <div className="episode-grid grid grid-cols-6 gap-1.5 sm:grid-cols-10 lg:grid-cols-6">
        {visibleEpisodes.map((episode) => {
          const isLocked = episode.locked && !isSubscribed && !unlockedEpisodeIds.includes(episode.id)
          const isCurrent = episode.number === currentEpisode
          return (
            <button
              key={episode.number}
              onClick={() => onEpisodeSelect(episode.number)}
              className="relative flex cursor-pointer flex-col items-center justify-center rounded-md transition-all duration-150 select-none hover:opacity-70 active:opacity-50"
              style={{
                aspectRatio: '1',
                background: isCurrent ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)',
                border: isCurrent ? '1px solid rgba(255,255,255,0.25)' : '1px solid transparent',
              }}
            >
              {isLocked && (
                <span
                  className="episode-lock absolute top-0.5 right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full"
                  style={{ background: '#d60000' }}
                >
                  <svg viewBox="0 0 24 24" fill="white" className="h-2 w-2">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                  </svg>
                </span>
              )}
              <span
                className="episode-number text-xs font-semibold"
                style={{ color: isCurrent ? '#fff' : 'rgba(255,255,255,0.7)' }}
              >
                {episode.number}
              </span>
              {isCurrent && !isLocked && (
                <div className="mt-1 flex items-end gap-[2px]" style={{ height: 8 }}>
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-[2.5px] origin-bottom rounded-full"
                      style={{
                        background: 'var(--primary)',
                        height: '100%',
                        animation: `barPulse 0.7s ease-in-out ${i * 0.18}s infinite alternate`,
                      }}
                    />
                  ))}
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
