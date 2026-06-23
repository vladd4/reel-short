'use client'

import { type ReactNode, createContext, useCallback, useContext, useState } from 'react'

type Store = {
  unlockedKeys: string[]
  favorites: string[]
  canWatch: (seriesId: string, ep: number, freeCount: number, isSubscribed: boolean) => boolean
  toggleFavorite: (seriesId: string) => void
  isFavorite: (seriesId: string) => boolean
}

const Context = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [unlockedKeys] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>([])

  const canWatch = useCallback(
    (seriesId: string, ep: number, freeCount: number, isSubscribed: boolean) => {
      if (isSubscribed) return true
      if (ep <= freeCount) return true
      return unlockedKeys.includes(`${seriesId}-${ep}`)
    },
    [unlockedKeys],
  )

  const toggleFavorite = useCallback((seriesId: string) => {
    setFavorites((f) =>
      f.includes(seriesId) ? f.filter((id) => id !== seriesId) : [...f, seriesId],
    )
  }, [])

  const isFavorite = useCallback((seriesId: string) => favorites.includes(seriesId), [favorites])

  return (
    <Context.Provider value={{ unlockedKeys, favorites, canWatch, toggleFavorite, isFavorite }}>
      {children}
    </Context.Provider>
  )
}

export function useStore() {
  const ctx = useContext(Context)
  if (!ctx) throw new Error('useStore must be inside StoreProvider')
  return ctx
}
