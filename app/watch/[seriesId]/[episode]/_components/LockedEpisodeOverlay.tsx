'use client'

import type { Episode, Series } from '@/types'
import { APP_DOWNLOAD_URL, EPISODE_COST } from '@/constants'
import CoinIcon from '@/components/ui/CoinIcon'

type Props = {
  series: Series
  episode: Episode
  isPurchasing: boolean
  hideUnlock?: boolean
  onUnlock: () => void
  onAppDownload: () => void
}

export default function LockedEpisodeOverlay({
  episode,
  isPurchasing,
  hideUnlock = false,
  onUnlock,
  onAppDownload,
}: Props) {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        boxShadow:
          '0 0 0 1px rgba(255,255,255,0.04), 0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)',
      }}
    >
      <video
        src={episode.videoUrl ?? undefined}
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          filter: 'blur(18px) brightness(0.35) saturate(0.6)',
          transform: 'scale(1.1)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)',
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-7">
        <div
          className="mb-1 flex h-14 w-14 items-center justify-center rounded-full"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.8"
            className="h-6 w-6"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <p className="text-center text-xl leading-snug font-bold text-white drop-shadow-lg">
          This is a paid episode.
          <br />
          Please unlock to watch.
        </p>
        <div className="mt-1 flex w-full flex-col gap-3">
          {!hideUnlock && (
            <button
              onClick={onUnlock}
              disabled={isPurchasing}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-95 disabled:opacity-60"
              style={{
                background: 'linear-gradient(90deg, #2b009f 0%, #4500ff 100%)',
                boxShadow: '0 4px 20px rgba(69,0,255,0.45)',
              }}
            >
              {isPurchasing ? (
                'Unlocking…'
              ) : (
                <>
                  <CoinIcon /> {episode.priceCredits || EPISODE_COST} Unlock Now
                </>
              )}
            </button>
          )}
          <a
            href={APP_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all hover:brightness-125 active:scale-95 sm:hidden"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.18)',
              color: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
            </svg>
            Watch for Free in App
          </a>
          <button
            onClick={onAppDownload}
            className="hidden w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all hover:brightness-125 active:scale-95 sm:flex"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.18)',
              color: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
            </svg>
            Watch for Free in App
          </button>
        </div>
      </div>
    </div>
  )
}
