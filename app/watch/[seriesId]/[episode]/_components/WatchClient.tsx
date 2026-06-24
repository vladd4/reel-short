'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Episode, Series } from '@/types'
import { APP_DOWNLOAD_URL, EPISODES_PER_BATCH, EPISODE_COST, ROUTES } from '@/constants'
import { useAuth } from '@/lib/auth'
import { useStore } from '@/lib/store'
import { seriesService } from '@/services'
import AppDownloadModal from '@/components/modals/AppDownloadModal'
import ExclusiveOfferModal from '@/components/modals/ExclusiveOfferModal'
import GiftModal from '@/components/modals/GiftModal'
import PaywallModal from '@/components/modals/PaywallModal'
import VipSuccessModal from '@/components/modals/VipSuccessModal'
import GenreRow from '@/components/series/GenreRow'
import ShareModal from '@/components/series/ShareModal'
import VideoPlayer from '@/components/series/VideoPlayer'
import CoinIcon from '@/components/ui/CoinIcon'
import EpisodeSelector from './EpisodeSelector'
import EpisodeStats from './EpisodeStats'

type Props = {
  series: Series
  initialEpisode: number
  seriesId: string
  related: Series[]
}

export default function WatchClient({ series, initialEpisode, seriesId, related }: Props) {
  const router = useRouter()
  const { user, refreshUser } = useAuth()
  const { unlockedEpisodeIds, markEpisodeUnlocked } = useStore()
  const isSubscribed = user?.isSubscribed ?? false
  const isLoggedIn = !!user

  const initialBatch = isNaN(initialEpisode)
    ? 0
    : Math.floor((initialEpisode - 1) / EPISODES_PER_BATCH)
  const [currentEpisode, setCurrentEpisode] = useState(initialEpisode)
  const [activeBatch, setActiveBatch] = useState(initialBatch)
  const [episodeData, setEpisodeData] = useState<Episode | null>(null)
  const [isDescExpanded, setIsDescExpanded] = useState(false)
  const [paywallEpisode, setPaywallEpisode] = useState<number | null>(null)
  const [paywallShowCoins, setPaywallShowCoins] = useState(false)
  const [showExclusiveOffer, setShowExclusiveOffer] = useState(false)
  const [showAppDownload, setShowAppDownload] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [showVipSuccess, setShowVipSuccess] = useState(false)
  const [showGift, setShowGift] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(false)
  const touchStartY = useRef<number | null>(null)

  function handleTouchStart(e: React.TouchEvent) {
    if (mobileExpanded) return
    touchStartY.current = e.touches[0].clientY
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (mobileExpanded || touchStartY.current === null) return
    const delta = touchStartY.current - e.changedTouches[0].clientY
    touchStartY.current = null
    if (delta > 60 && currentEpisode < series.totalEpisodes) goNext()
    if (delta < -60 && currentEpisode > 1) goPrev()
  }


  function fetchEpisode(n: number) {
    const id: number | undefined = series.episodes[n - 1]?.id
    if (id === undefined) return
    const episodeId: number = id
    async function load() {
      try {
        const data = await seriesService.getEpisodeById(episodeId)
        if (data) setEpisodeData(data)
      } catch {}
    }
    load()
  }

  useEffect(() => {
    fetchEpisode(initialEpisode)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const episode = episodeData ?? series.episodes[currentEpisode - 1]
  const isUnlocked =
    isSubscribed || !episode.locked || unlockedEpisodeIds.includes(episode.id)
  const [isPurchasing, setIsPurchasing] = useState(false)

  async function handleBuyEpisode() {
    if (isPurchasing) return
    if (!isLoggedIn) {
      setPaywallShowCoins(false)
      setPaywallEpisode(currentEpisode)
      return
    }
    setIsPurchasing(true)
    try {
      await seriesService.purchaseEpisode(episode.id)
      markEpisodeUnlocked(episode.id)
      setPaywallEpisode(null)
      fetchEpisode(currentEpisode)
      ;(async () => { try { await refreshUser() } catch {} })()
    } catch {
      setPaywallShowCoins(true)
      setPaywallEpisode(currentEpisode)
    } finally {
      setIsPurchasing(false)
    }
  }

  useEffect(() => {
    if (!isUnlocked) {
      setPaywallShowCoins(false)
      setPaywallEpisode(currentEpisode)
    }
  }, [seriesId, currentEpisode]) // eslint-disable-line react-hooks/exhaustive-deps

  const episodeBatches =
    series.totalEpisodes > 30
      ? Array.from({ length: Math.ceil(series.totalEpisodes / EPISODES_PER_BATCH) }, (_, i) => ({
          start: i * EPISODES_PER_BATCH + 1,
          end: Math.min((i + 1) * EPISODES_PER_BATCH, series.totalEpisodes),
          label: `${i * EPISODES_PER_BATCH + 1}-${Math.min((i + 1) * EPISODES_PER_BATCH, series.totalEpisodes)}`,
        }))
      : [{ start: 1, end: series.totalEpisodes, label: `1-${series.totalEpisodes}` }]

  const SYNOPSIS_PREVIEW_LENGTH = 160
  const synopsis = episode.description ?? series.longDescription
  const synopsisHasMore = synopsis.length > SYNOPSIS_PREVIEW_LENGTH

  function navigateTo(n: number) {
    setMobileExpanded(false)
    setCurrentEpisode(n)
    setActiveBatch(Math.floor((n - 1) / EPISODES_PER_BATCH))
    setEpisodeData(null)
    window.history.pushState(null, '', ROUTES.watch(series.id, series.title, n))
    fetchEpisode(n)
  }

  function goPrev() {
    if (currentEpisode > 1) navigateTo(currentEpisode - 1)
  }
  function goNext() {
    if (currentEpisode < series.totalEpisodes) navigateTo(currentEpisode + 1)
  }

  if (!episode) return null

  return (
    <>
    {!mobileExpanded && (
      // eslint-disable-next-line react/no-danger
      <style suppressHydrationWarning>{`@media (max-width: 1023px) { .site-navbar { display: none !important; } }`}</style>
    )}
    <div
      className={`${mobileExpanded ? 'mobile-expanded' : 'h-[100dvh] overflow-hidden'} lg:h-auto lg:overflow-visible`}
      style={{ background: '#040405' }}
    >
      <div className={`${mobileExpanded ? 'block' : 'hidden'} lg:block`} style={{ height: 64 }} />

      <div className={`flex flex-col ${mobileExpanded ? '' : 'h-full'} lg:h-[calc(100vh-64px)] lg:flex-row lg:overflow-hidden`}>
        <div
          className="relative flex min-h-0 flex-1 items-center justify-center overflow-x-hidden"
          style={{ background: '#06001a' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="pointer-events-none absolute"
            style={{
              width: '70%',
              height: '70%',
              background: 'radial-gradient(ellipse, rgba(69,0,255,0.12) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, #06001a 100%)',
            }}
          />

          {/* Desktop back button */}
          <Link
            href={ROUTES.series(series.id, series.title)}
            className="absolute top-5 left-5 z-20 hidden h-10 w-10 items-center justify-center rounded-full text-white transition-colors lg:flex"
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </Link>

          {/* Mobile top bar — back button + episodes & info on same row */}
          <div className="absolute inset-x-0 top-5 z-20 flex items-center px-5 lg:hidden">
            <Link
              href={ROUTES.series(series.id, series.title)}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-white transition-colors"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
            </Link>
            {!mobileExpanded ? (
              <>
                <div className="flex flex-1 justify-center">
                  <button
                    onClick={() => setMobileExpanded(true)}
                    className="flex h-10 items-center gap-2 rounded-full px-5 text-sm font-semibold text-white"
                    style={{
                      background: 'rgba(0,0,0,0.5)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                    </svg>
                    Episodes & Info
                  </button>
                </div>
                <div className="h-10 w-10 flex-shrink-0" />
              </>
            ) : (
              <>
                <div className="flex-1" />
                <button
                  onClick={() => setMobileExpanded(false)}
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-white transition-colors"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                  </svg>
                </button>
              </>
            )}
          </div>

          <div className="video-sizer relative" style={{ aspectRatio: '9/16' }}>
            {isUnlocked ? (
              <VideoPlayer
                fill
                src={episode.videoUrl}
                title={episode.title}
                episode={episode.number}
                episodeId={episode.id}
                totalEpisodes={series.totalEpisodes}
                ratio="9/16"
                onEnded={goNext}
                onPrev={goPrev}
                onNext={goNext}
                hasPrev={currentEpisode > 1}
                hasNext={currentEpisode < series.totalEpisodes}
              />
            ) : (
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
                    <button
                      onClick={handleBuyEpisode}
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
                        <><CoinIcon /> {episode.priceCredits || EPISODE_COST} Unlock Now</>
                      )}
                    </button>
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
                      onClick={() => setShowAppDownload(true)}
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
            )}
          </div>
        </div>

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
              <h3 className="text-sm font-semibold text-muted">
                Episode {currentEpisode} Synopsis
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {isDescExpanded || !synopsisHasMore
                  ? synopsis
                  : synopsis.slice(0, SYNOPSIS_PREVIEW_LENGTH) + '…'}
                {synopsisHasMore && (
                  <button
                    onClick={() => setIsDescExpanded((v) => !v)}
                    className="ml-1.5 text-sm font-medium text-primary hover:underline"
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

            <EpisodeStats
              series={series}
              seriesId={seriesId}
              onShare={() => setShowShare(true)}
              onGift={() => setShowGift(true)}
            />

            <EpisodeSelector
              episodes={series.episodes}
              batchTabs={episodeBatches}
              activeBatch={activeBatch}
              currentEpisode={currentEpisode}
              seriesId={series.id}
              seriesTitle={series.title}
              onBatchChange={setActiveBatch}
              onEpisodeSelect={navigateTo}
            />

            {related.length > 0 && (
              <div className="mt-6 lg:hidden">
                <GenreRow genre="Recommendations" series={related} showMoreButton={false} />
              </div>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="hidden px-4 pt-4 pb-10 sm:px-8 sm:py-10 md:px-12 lg:block" style={{ background: 'var(--background)' }}>
          <GenreRow genre="Recommendations" series={related} showMoreButton={false} />
        </div>
      )}

      {showShare && <ShareModal series={series} onClose={() => setShowShare(false)} />}
      {showGift && <GiftModal seriesId={seriesId} onClose={() => setShowGift(false)} />}
      {showExclusiveOffer && <ExclusiveOfferModal onClose={() => setShowExclusiveOffer(false)} />}
      {showAppDownload && <AppDownloadModal onClose={() => setShowAppDownload(false)} />}

      {paywallEpisode !== null && !isUnlocked && (
        <PaywallModal
          seriesId={seriesId}
          episodeNumber={paywallEpisode}
          seriesTitle={series.title}
          showCoins={paywallShowCoins}
          onClose={() => {
            setPaywallEpisode(null)
            if (!paywallShowCoins) setShowExclusiveOffer(true)
          }}
          onUnlocked={() => {
            router.push(ROUTES.watch(series.id, series.title, paywallEpisode))
            setPaywallEpisode(null)
          }}
          onSubscribed={() => setShowVipSuccess(true)}
        />
      )}

      {showVipSuccess && (
        <VipSuccessModal
          onClose={() => {
            setShowVipSuccess(false)
            router.push(ROUTES.watch(series.id, series.title, paywallEpisode ?? currentEpisode))
            setPaywallEpisode(null)
          }}
        />
      )}
    </div>
    </>
  )
}
