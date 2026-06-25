'use client'

import { useEffect, useState } from 'react'
import type { Series } from '@/types'
import { useAuth } from '@/lib/auth'
import { getLikedIds, saveLikedIds } from '@/lib/likes'
import { formatCount, parseCount } from '@/lib/utils'
import SignInModal from '@/components/modals/SignInModal'
import FavoriteButton from '@/components/series/FavoriteButton'

type Props = {
  series: Series
  seriesId: string
  onShare: () => void
  onGift: () => void
}

export default function EpisodeStats({ series, seriesId, onShare, onGift }: Props) {
  const { isLoggedIn } = useAuth()

  const [showSignIn, setShowSignIn] = useState(false)
  const [liked, setLiked] = useState(false)
  const [bump, setBump] = useState(false)

  useEffect(() => {
    setLiked(getLikedIds().includes(seriesId))
  }, [seriesId])

  function toggleLike() {
    if (!isLoggedIn) {
      setShowSignIn(true)
      return
    }
    const ids = getLikedIds()
    const isNowLiked = !liked
    saveLikedIds(isNowLiked ? [...ids, seriesId] : ids.filter((id) => id !== seriesId))
    setLiked(isNowLiked)
    if (isNowLiked) {
      setBump(true)
      setTimeout(() => setBump(false), 300)
    }
  }

  function handleGift() {
    if (!isLoggedIn) {
      setShowSignIn(true)
      return
    }
    onGift()
  }

  const baseCount = parseCount(series.likes)
  const displayCount = formatCount(liked ? baseCount + 1 : baseCount)

  return (
    <>
      <div
        className="flex items-center gap-6"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '14px 0',
        }}
      >
        <button
          onClick={toggleLike}
          className="flex cursor-pointer flex-col items-center gap-1.5 transition-opacity hover:opacity-80 active:opacity-50"
          style={{ color: liked ? '#ff5d88' : 'rgba(255,255,255,0.6)' }}
        >
          <svg
            viewBox="0 0 24 24"
            fill={liked ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            className="h-6 w-6 transition-transform duration-150"
            style={{ transform: bump ? 'scale(1.35)' : 'scale(1)' }}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span className="text-xs font-medium">{displayCount}</span>
        </button>

        <div
          className="flex flex-col items-center gap-1.5"
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
        </div>

        <FavoriteButton
          seriesId={seriesId}
          withLabel
          vertical
          style={{ color: 'rgba(255,255,255,0.6)' }}
        />

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
          onClick={handleGift}
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
      {showSignIn && (
        <SignInModal onClose={() => setShowSignIn(false)} onContinue={() => setShowSignIn(false)} />
      )}
    </>
  )
}
