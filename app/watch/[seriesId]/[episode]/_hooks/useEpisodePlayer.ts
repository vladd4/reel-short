'use client'

import { useEffect, useState } from 'react'
import type { Episode, Series } from '@/types'
import { EPISODES_PER_BATCH, ROUTES } from '@/constants'
import { seriesService } from '@/services'

export function useEpisodePlayer(series: Series, initialEpisode: number) {
  const initialBatch = isNaN(initialEpisode)
    ? 0
    : Math.floor((initialEpisode - 1) / EPISODES_PER_BATCH)

  const [currentEpisode, setCurrentEpisode] = useState(initialEpisode)
  const [activeBatch, setActiveBatch] = useState(initialBatch)
  const [episodeData, setEpisodeData] = useState<Episode | null>(null)
  const [isDescExpanded, setIsDescExpanded] = useState(false)

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

  function navigateTo(n: number, onNavigate?: () => void) {
    onNavigate?.()
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

  return {
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
  }
}
