'use client'

import type { CSSProperties } from 'react'
import { useStore } from '@/lib/store'

type Props = {
  seriesId: string
  withLabel?: boolean
  vertical?: boolean
  className?: string
  style?: CSSProperties
}

export default function FavoriteButton({ seriesId, withLabel, vertical, className, style }: Props) {
  const { isFavorite, toggleFavorite } = useStore()
  const isFavorited = isFavorite(seriesId)

  return (
    <button
      onClick={() => toggleFavorite(seriesId)}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      className={`flex cursor-pointer transition-opacity hover:opacity-70 active:opacity-50 ${vertical ? 'flex-col items-center gap-1.5' : 'items-center gap-1.5'} ${className ?? ''}`}
      style={style}
    >
      <svg
        viewBox="0 0 24 24"
        fill={isFavorited ? '#e3a119' : 'none'}
        stroke={isFavorited ? '#e3a119' : 'currentColor'}
        strokeWidth="2"
        className={vertical ? 'h-6 w-6' : 'h-4 w-4'}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
      {withLabel && <span className={vertical ? 'text-xs font-medium' : 'text-sm font-medium'}>{isFavorited ? 'Saved' : 'Save'}</span>}
    </button>
  )
}
