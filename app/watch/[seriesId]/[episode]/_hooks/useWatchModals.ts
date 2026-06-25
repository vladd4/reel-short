'use client'

import { useEffect, useState } from 'react'
import type { ApiUser, Episode } from '@/types'
import { seriesService } from '@/services'

type Params = {
  isLoggedIn: boolean
  user: ApiUser | null
  isUnlocked: boolean
  episode: Episode
  seriesId: string
  currentEpisode: number
  markEpisodeUnlocked: (id: number) => void
  refreshUser: () => Promise<void>
  fetchEpisode: (n: number) => void
}

export function useWatchModals({
  isLoggedIn,
  user,
  isUnlocked,
  episode,
  seriesId,
  currentEpisode,
  markEpisodeUnlocked,
  refreshUser,
  fetchEpisode,
}: Params) {
  const [paywallEpisode, setPaywallEpisode] = useState<number | null>(null)
  const [paywallShowCoins, setPaywallShowCoins] = useState(false)
  const [showExclusiveOffer, setShowExclusiveOffer] = useState(false)
  const [showAppDownload, setShowAppDownload] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [showVipSuccess, setShowVipSuccess] = useState(false)
  const [showGift, setShowGift] = useState(false)
  const [isPurchasing, setIsPurchasing] = useState(false)

  useEffect(() => {
    if (!isUnlocked) {
      setPaywallShowCoins(false)
      setPaywallEpisode(currentEpisode)
    }
  }, [seriesId, currentEpisode]) // eslint-disable-line react-hooks/exhaustive-deps

  async function purchaseEpisodeNow() {
    setIsPurchasing(true)
    try {
      await seriesService.purchaseEpisode(episode.id)
      markEpisodeUnlocked(episode.id)
      setPaywallEpisode(null)
      fetchEpisode(currentEpisode)
      void refreshUser()
    } catch {
      setPaywallShowCoins(true)
      setPaywallEpisode(currentEpisode)
    } finally {
      setIsPurchasing(false)
    }
  }

  async function handleBuyEpisode() {
    if (isPurchasing) return
    if (!isLoggedIn) {
      setPaywallShowCoins(true)
      setPaywallEpisode(currentEpisode)
      return
    }
    const userCredits = user?.credits ?? 0
    if (userCredits < episode.priceCredits) {
      setPaywallShowCoins(true)
      setPaywallEpisode(currentEpisode)
      return
    }
    setIsPurchasing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsPurchasing(false)
    await purchaseEpisodeNow()
  }

  return {
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
  }
}
