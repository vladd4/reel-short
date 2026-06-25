'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Series } from '@/types'
import { ROUTES } from '@/constants'
import { useAuth } from '@/lib/auth'
import { useStore } from '@/lib/store'
import AppDownloadModal from '@/components/modals/AppDownloadModal'
import ExclusiveOfferModal from '@/components/modals/ExclusiveOfferModal'
import GiftModal from '@/components/modals/GiftModal'
import PaywallModal from '@/components/modals/PaywallModal'
import VipSuccessModal from '@/components/modals/VipSuccessModal'
import GenreRow from '@/components/series/GenreRow'
import ShareModal from '@/components/series/ShareModal'
import VideoPlayer from '@/components/series/VideoPlayer'
import { useEpisodePlayer } from '../_hooks/useEpisodePlayer'
import { useWatchModals } from '../_hooks/useWatchModals'
import LockedEpisodeOverlay from './LockedEpisodeOverlay'
import WatchSidebar from './WatchSidebar'

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

  const [mobileExpanded, setMobileExpanded] = useState(false)

  const {
    currentEpisode,
    activeBatch,
    setActiveBatch,
    episodeData,
    isDescExpanded,
    setIsDescExpanded,
    fetchEpisode,
    navigateTo,
    goPrev,
    goNext,
  } = useEpisodePlayer(series, initialEpisode)

  const episode = episodeData ?? series.episodes[currentEpisode - 1]
  const isUnlocked = isSubscribed || !episode.locked || unlockedEpisodeIds.includes(episode.id)

  const {
    paywallEpisode,
    setPaywallEpisode,
    paywallShowCoins,
    showExclusiveOffer,
    setShowExclusiveOffer,
    showAppDownload,
    setShowAppDownload,
    showShare,
    setShowShare,
    showVipSuccess,
    setShowVipSuccess,
    showGift,
    setShowGift,
    isPurchasing,
    purchaseEpisodeNow,
    handleBuyEpisode,
  } = useWatchModals({
    isLoggedIn,
    user: user ?? null,
    isUnlocked,
    episode,
    seriesId,
    currentEpisode,
    markEpisodeUnlocked,
    refreshUser,
    fetchEpisode,
  })

  if (!episode) return null

  return (
    <>
      {!mobileExpanded && (
        // eslint-disable-next-line react/no-danger
        <style suppressHydrationWarning>{`@media (max-width: 1023px) { .site-navbar { display: none !important; } html, body { overflow: hidden !important; overscroll-behavior: none !important; position: fixed !important; width: 100% !important; height: 100% !important; } }`}</style>
      )}
      <div
        className={`${mobileExpanded ? 'mobile-expanded' : 'fixed inset-0 overflow-hidden'} lg:static lg:inset-auto lg:h-auto lg:overflow-visible`}
        style={{ background: '#040405' }}
      >
        <div className={`${mobileExpanded ? 'block' : 'hidden'} lg:block`} style={{ height: 64 }} />

        <div
          className={`flex flex-col ${mobileExpanded ? '' : 'h-full'} lg:h-[calc(100vh-64px)] lg:flex-row lg:overflow-hidden`}
        >
          {/* Video area */}
          <div
            className="relative flex min-h-0 flex-1 items-center justify-center overflow-x-hidden"
            style={{ background: '#06001a' }}
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

            {/* Mobile header bar */}
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
                      className="flex h-10 cursor-pointer items-center gap-2 rounded-full px-5 text-sm font-semibold text-white"
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
                    className="flex h-10 w-10 cursor-pointer flex-shrink-0 items-center justify-center rounded-full text-white transition-colors"
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
                <LockedEpisodeOverlay
                  series={series}
                  episode={episode}
                  isPurchasing={isPurchasing}
                  onUnlock={handleBuyEpisode}
                  onAppDownload={() => setShowAppDownload(true)}
                />
              )}
            </div>
          </div>

          <WatchSidebar
            series={series}
            seriesId={seriesId}
            episode={episode}
            currentEpisode={currentEpisode}
            relatedSeries={related}
            isDescExpanded={isDescExpanded}
            setIsDescExpanded={setIsDescExpanded}
            activeBatch={activeBatch}
            setActiveBatch={setActiveBatch}
            mobileExpanded={mobileExpanded}
            onShare={() => setShowShare(true)}
            onGift={() => setShowGift(true)}
            onNavigate={(n) => navigateTo(n, () => setMobileExpanded(false))}
          />
        </div>

        {related.length > 0 && (
          <div
            className="hidden px-4 pt-4 pb-10 sm:px-8 sm:py-10 md:px-12 lg:block"
            style={{ background: 'var(--background)' }}
          >
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
              setPaywallEpisode(null)
              void purchaseEpisodeNow()
            }}
            onSubscribed={() => {
              setPaywallEpisode(null)
              setShowVipSuccess(true)
            }}
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
