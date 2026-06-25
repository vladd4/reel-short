'use client'

import { type ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react'
import { favouritesService } from '@/services'
import { useAuth } from '@/lib/auth'
import { loadStoredToken } from '@/services/http.client'

type Store = {
  unlockedKeys: string[]
  unlockedEpisodeIds: number[]
  markEpisodeUnlocked: (episodeId: number) => void
  favorites: string[]
  canWatch: (seriesId: string, ep: number, freeCount: number, isSubscribed: boolean) => boolean
  toggleFavorite: (seriesId: string) => void
  isFavorite: (seriesId: string) => boolean
}

const Context = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth()
  const [unlockedKeys] = useState<string[]>([])
  const [unlockedEpisodeIds, setUnlockedEpisodeIds] = useState<number[]>([])
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    if (!isLoggedIn) {
      setFavorites([])
      return
    }
    if (!loadStoredToken()) return
    async function loadFavorites() {
      try {
        const favs = await favouritesService.getAll()
        setFavorites(favs.map((f) => String(f.seriesId)))
      } catch {}
    }
    loadFavorites()
  }, [isLoggedIn])

  const markEpisodeUnlocked = useCallback((episodeId: number) => {
    setUnlockedEpisodeIds((prev) => (prev.includes(episodeId) ? prev : [...prev, episodeId]))
  }, [])

  const canWatch = useCallback(
    (seriesId: string, ep: number, freeCount: number, isSubscribed: boolean) => {
      if (isSubscribed) return true
      if (ep <= freeCount) return true
      return unlockedKeys.includes(`${seriesId}-${ep}`)
    },
    [unlockedKeys],
  )

  const toggleFavorite = useCallback(
    (seriesId: string) => {
      const wasFav = favorites.includes(seriesId)
      const next = wasFav ? favorites.filter((id) => id !== seriesId) : [...favorites, seriesId]
      setFavorites(next)
      async function syncFavorite() {
        try {
          if (wasFav) await favouritesService.remove(seriesId)
          else await favouritesService.add(seriesId)
        } catch {
          setFavorites(favorites)
        }
      }
      syncFavorite()
    },
    [favorites],
  )

  const isFavorite = useCallback((seriesId: string) => favorites.includes(seriesId), [favorites])

  return (
    <Context.Provider
      value={{
        unlockedKeys,
        unlockedEpisodeIds,
        markEpisodeUnlocked,
        favorites,
        canWatch,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useStore() {
  const ctx = useContext(Context)
  if (!ctx) throw new Error('useStore must be inside StoreProvider')
  return ctx
}
