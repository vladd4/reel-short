'use client'

import { type ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react'
import { EPISODE_COST, STORAGE_KEY } from '@/constants'

type Store = {
  coins: number
  isSubscribed: boolean
  unlockedKeys: string[]
  favorites: string[]
  addCoins: (n: number) => void
  spendCoins: (n: number) => boolean
  subscribe: () => void
  canWatch: (seriesId: string, ep: number, freeCount: number) => boolean
  tryUnlock: (seriesId: string, ep: number) => boolean
  toggleFavorite: (seriesId: string) => void
  isFavorite: (seriesId: string) => boolean
}

const Context = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [coins, setCoins] = useState(0)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [unlockedKeys, setUnlockedKeys] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const d = JSON.parse(raw)
        setCoins(d.coins ?? 0)
        setIsSubscribed(d.sub ?? false)
        setUnlockedKeys(d.keys ?? [])
        setFavorites(d.favs ?? [])
      }
    } catch {}
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ coins, sub: isSubscribed, keys: unlockedKeys, favs: favorites }),
    )
  }, [coins, isSubscribed, unlockedKeys, favorites, ready])

  const addCoins = useCallback((n: number) => setCoins((c) => c + n), [])

  const spendCoins = useCallback(
    (n: number): boolean => {
      if (coins < n) return false
      setCoins((c) => c - n)
      return true
    },
    [coins],
  )

  const subscribe = useCallback(() => setIsSubscribed(true), [])

  const canWatch = useCallback(
    (seriesId: string, ep: number, freeCount: number) => {
      if (isSubscribed) return true
      if (ep <= freeCount) return true
      return unlockedKeys.includes(`${seriesId}-${ep}`)
    },
    [isSubscribed, unlockedKeys],
  )

  const tryUnlock = useCallback(
    (seriesId: string, ep: number): boolean => {
      if (coins < EPISODE_COST) return false
      setCoins((c) => c - EPISODE_COST)
      setUnlockedKeys((k) => [...k, `${seriesId}-${ep}`])
      return true
    },
    [coins],
  )

  const toggleFavorite = useCallback((seriesId: string) => {
    setFavorites((f) =>
      f.includes(seriesId) ? f.filter((id) => id !== seriesId) : [...f, seriesId],
    )
  }, [])

  const isFavorite = useCallback((seriesId: string) => favorites.includes(seriesId), [favorites])

  return (
    <Context.Provider
      value={{
        coins,
        isSubscribed,
        unlockedKeys,
        favorites,
        addCoins,
        spendCoins,
        subscribe,
        canWatch,
        tryUnlock,
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
