'use client'

import type { Series } from '@/types'
import FavoriteButton from '@/components/series/FavoriteButton'

type Props = {
  series: Series
  seriesId: string
  isLiked: boolean
  onToggleLike: () => void
  onShare: () => void
  onGift: () => void
}

export default function EpisodeStats({
  series,
  seriesId,
  isLiked,
  onToggleLike,
  onShare,
  onGift,
}: Props) {
  return (
    <div
      className="flex items-center gap-6"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '14px 0',
      }}
    >
      <button
        onClick={onToggleLike}
        className="flex cursor-pointer flex-col items-center gap-1.5 transition-opacity hover:opacity-70 active:opacity-50"
        style={{ color: isLiked ? '#d60000' : 'rgba(255,255,255,0.6)' }}
      >
        <svg
          viewBox="0 0 24 24"
          fill={isLiked ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          className="h-6 w-6"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <span className="text-xs font-medium">{series.likes}</span>
      </button>

      <button
        className="flex flex-col items-center gap-1.5 transition-opacity hover:opacity-70 active:opacity-50"
        style={{ color: 'rgba(255,255,255,0.6)' }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-6 w-6"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span className="text-xs font-medium">{series.views}</span>
      </button>

      <FavoriteButton seriesId={seriesId} withLabel vertical style={{ color: 'rgba(255,255,255,0.6)' }} />

      <button
        onClick={onShare}
        className="flex cursor-pointer flex-col items-center gap-1.5 transition-opacity hover:opacity-70 active:opacity-50"
        style={{ color: 'rgba(255,255,255,0.6)' }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-6 w-6"
        >
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
        <span className="text-xs font-medium">Share</span>
      </button>

      <button
        onClick={onGift}
        className="ml-auto flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, #f97316, #fb923c)',
          boxShadow: '0 4px 16px rgba(249,115,22,0.4)',
        }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M20 12v10H4V12M22 7H2v5h20V7zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
        Gift an Actor
      </button>
    </div>
  )
}
