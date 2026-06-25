'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Episode, Series } from '@/types'
import { ROUTES } from '@/constants'
import { useAuth } from '@/lib/auth'
import { useStore } from '@/lib/store'
import { seriesService } from '@/services'
import PaywallModal from '@/components/modals/PaywallModal'

type Props = {
  series: Series
  currentEpisode?: number
}

export default function EpisodeList({ series, currentEpisode }: Props) {
  const router = useRouter()
  const { user, refreshUser } = useAuth()

  const { unlockedEpisodeIds, markEpisodeUnlocked } = useStore()
  const [paywallEp, setPaywallEp] = useState<number | null>(null)
  const [purchasingEpId, setPurchasingEpId] = useState<number | null>(null)

  const isSubscribed = user?.isSubscribed ?? false
  const isLoggedIn = !!user

  async function handleEpClick(ep: Episode) {
    const unlocked = isSubscribed || !ep.locked || unlockedEpisodeIds.includes(ep.id)
    if (unlocked) {
      router.push(ROUTES.watch(series.id, series.title, ep.number))
      return
    }
    if (!isLoggedIn) {
      setPaywallEp(ep.number)
      return
    }
    setPurchasingEpId(ep.id)
    try {
      await seriesService.purchaseEpisode(ep.id)
      markEpisodeUnlocked(ep.id)
      void refreshUser()
      router.push(ROUTES.watch(series.id, series.title, ep.number))
    } catch {
      setPaywallEp(ep.number)
    } finally {
      setPurchasingEpId(null)
    }
  }

  return (
    <>
      <div className="space-y-1.5">
        {series.episodes.map((ep) => {
          const unlocked = isSubscribed || !ep.locked || unlockedEpisodeIds.includes(ep.id)
          const isCurrent = ep.number === currentEpisode
          const isBuying = purchasingEpId === ep.id

          return (
            <button
              key={ep.number}
              onClick={() => handleEpClick(ep)}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200"
              style={
                isCurrent
                  ? { background: 'var(--primary-dim)', border: '1px solid rgba(69,0,255,0.3)' }
                  : { background: 'rgba(255,255,255,0.03)', border: '1px solid transparent' }
              }
            >
              <div
                className="relative h-10 w-14 flex-shrink-0 overflow-hidden rounded-lg"
                style={{ background: `linear-gradient(135deg, ${series.accentColor}33, #10102f)` }}
              >
                {isCurrent && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="flex h-5 w-5 items-center justify-center rounded-full"
                      style={{ background: 'rgba(0,0,0,0.6)' }}
                    >
                      <svg viewBox="0 0 24 24" fill="white" className="h-2.5 w-2.5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
                {!unlocked && (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.5)' }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(255,255,255,0.6)"
                      strokeWidth="2"
                      className="h-3.5 w-3.5"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className="truncate text-xs font-semibold"
                  style={{ color: isCurrent ? 'var(--primary)' : undefined }}
                >
                  {ep.number}. {ep.title}
                </p>
                <p className="mt-0.5 text-[10px] text-muted">{ep.duration}</p>
              </div>

              <div className="flex-shrink-0">
                {isBuying ? (
                  <span className="text-[9px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    …
                  </span>
                ) : !unlocked ? (
                  <span className="text-[9px] text-gold">◈ {ep.priceCredits || 5}</span>
                ) : !ep.free ? (
                  <svg viewBox="0 0 24 24" fill="#009d69" className="h-3.5 w-3.5">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                ) : null}
              </div>
            </button>
          )
        })}
      </div>

      {paywallEp !== null && (
        <PaywallModal
          seriesId={series.id}
          episodeNumber={paywallEp}
          seriesTitle={series.title}
          onClose={() => setPaywallEp(null)}
          onUnlocked={() => {
            router.push(ROUTES.watch(series.id, series.title, paywallEp))
            setPaywallEp(null)
          }}
        />
      )}
    </>
  )
}
