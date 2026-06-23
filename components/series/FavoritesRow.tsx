'use client'

import type { Series } from '@/types'
import { useStore } from '@/lib/store'
import GenreRow from './GenreRow'

export default function FavoritesRow({ allSeries }: { allSeries: Series[] }) {
  const { favorites } = useStore()

  const favSeries = allSeries.filter((s) => favorites.includes(s.id))
  if (favSeries.length === 0) return null

  return <GenreRow genre="Favorites" series={favSeries} showMoreButton={false} />
}
