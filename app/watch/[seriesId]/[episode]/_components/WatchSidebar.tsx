'use client'

import Link from 'next/link'
import type { Episode, Series } from '@/types'
import { EPISODES_PER_BATCH, ROUTES } from '@/constants'
import GenreRow from '@/components/series/GenreRow'
import EpisodeSelector from './EpisodeSelector'
import EpisodeStats from './EpisodeStats'

const SYNOPSIS_PREVIEW_LENGTH = 160

type Props = {
  series: Series
  seriesId: string
  episode: Episode
  currentEpisode: number
  relatedSeries: Series[]
  isDescExpanded: boolean
  setIsDescExpanded: (v: boolean) => void
  activeBatch: number
  setActiveBatch: (v: number) => void
  mobileExpanded: boolean
  onShare: () => void
  onGift: () => void
  onNavigate: (n: number) => void
}

export default function WatchSidebar({
  series,
  seriesId,
  episode,
  currentEpisode,
  relatedSeries,
  isDescExpanded,
  setIsDescExpanded,
  activeBatch,
  setActiveBatch,
  mobileExpanded,
  onShare,
  onGift,
  onNavigate,
}: Props) {
  const episodeBatches =
    series.totalEpisodes > 30
      ? Array.from({ length: Math.ceil(series.totalEpisodes / EPISODES_PER_BATCH) }, (_, i) => ({
          start: i * EPISODES_PER_BATCH + 1,
          end: Math.min((i + 1) * EPISODES_PER_BATCH, series.totalEpisodes),
          label: `${i * EPISODES_PER_BATCH + 1}-${Math.min((i + 1) * EPISODES_PER_BATCH, series.totalEpisodes)}`,
        }))
      : [{ start: 1, end: series.totalEpisodes, label: `1-${series.totalEpisodes}` }]

  const synopsis = episode.description ?? series.longDescription
  const synopsisHasMore = synopsis.length > SYNOPSIS_PREVIEW_LENGTH

  return (
    <div
      className={`scrollbar-hide w-full ${mobileExpanded ? 'block' : 'hidden'} lg:flex lg:w-[520px] lg:flex-shrink-0 lg:overflow-y-auto`}
      style={{ background: '#040405', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="space-y-6 px-4 pt-6 pb-4 sm:px-6 sm:pb-12 lg:pt-8">
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span className="text-dim">/</span>
          <Link
            href={ROUTES.series(series.id, series.title)}
            className="line-clamp-1 max-w-[140px] transition-colors hover:text-foreground"
          >
            {series.title}
          </Link>
          <span className="text-dim">/</span>
          <span className="text-foreground">Episode {currentEpisode}</span>
        </nav>

        <h1 className="text-xl leading-snug font-bold">
          Episode {episode.number} — {episode.title}
        </h1>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted">Episode {currentEpisode} Synopsis</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {isDescExpanded || !synopsisHasMore
              ? synopsis
              : synopsis.slice(0, SYNOPSIS_PREVIEW_LENGTH) + '…'}
            {synopsisHasMore && (
              <button
                onClick={() => setIsDescExpanded(!isDescExpanded)}
                className="ml-1.5 cursor-pointer text-sm font-medium text-primary hover:underline"
              >
                {isDescExpanded ? 'Less' : 'More'}
              </button>
            )}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {(series.tags ?? []).map((t) => (
            <span
              key={t}
              className="rounded-full px-3 py-1 text-xs"
              style={{
                background: 'rgba(255,255,255,0.07)',
                color: 'rgba(255,255,255,0.55)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <EpisodeStats series={series} seriesId={seriesId} onShare={onShare} onGift={onGift} />

        <EpisodeSelector
          episodes={series.episodes}
          batchTabs={episodeBatches}
          activeBatch={activeBatch}
          currentEpisode={currentEpisode}
          seriesId={series.id}
          seriesTitle={series.title}
          onBatchChange={setActiveBatch}
          onEpisodeSelect={onNavigate}
        />

        {relatedSeries.length > 0 && (
          <div className="mt-6 lg:hidden">
            <GenreRow genre="Recommendations" series={relatedSeries} showMoreButton={false} />
          </div>
        )}
      </div>
    </div>
  )
}
