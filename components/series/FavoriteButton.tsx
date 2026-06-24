'use client'

import type { CSSProperties } from 'react'
import { useState } from 'react'
import { useAuth } from '@/lib/auth'
import { useStore } from '@/lib/store'
import SignInModal from '@/components/modals/SignInModal'

type Props = {
  seriesId: string
  withLabel?: boolean
  vertical?: boolean
  className?: string
  style?: CSSProperties
}

export default function FavoriteButton({ seriesId, withLabel, vertical, className, style }: Props) {
  const { isLoggedIn } = useAuth()
  const { isFavorite, toggleFavorite } = useStore()
  const [localFav, setLocalFav] = useState<boolean | null>(null)
  const [showSignIn, setShowSignIn] = useState(false)

  const isFavorited = localFav !== null ? localFav : isFavorite(seriesId)

  function handleClick() {
    if (!isLoggedIn) {
      setShowSignIn(true)
      return
    }
    setLocalFav(!isFavorited)
    toggleFavorite(seriesId)
  }

  return (
    <>
      <button
        onClick={handleClick}
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
      {showSignIn && (
        <SignInModal onClose={() => setShowSignIn(false)} onContinue={() => setShowSignIn(false)} />
      )}
    </>
  )
}
