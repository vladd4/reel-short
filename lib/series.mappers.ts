import type { Episode, Series } from '@/types'
import type { ApiEpisode, ApiSeriesDetail } from '@/types/api.types'

export function fmtDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function fmtCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`
  return String(n)
}

export function mapEpisode(ep: ApiEpisode): Episode {
  return {
    id: ep.id,
    number: ep.episodeNumber,
    title: ep.title,
    description: ep.description,
    duration: fmtDuration(ep.duration),
    videoUrl: ep.videoUrl,
    free: ep.isFree,
    locked: ep.locked ?? !ep.isFree,
    priceCredits: ep.priceCredits ?? 0,
  }
}

export function mapSeries(item: ApiSeriesDetail): Series {
  const genreNames = item.genres.map((g) => g.name)
  const episodes = (item.episodes ?? []).map(mapEpisode)
  return {
    id: String(item.id),
    title: item.title,
    genre: genreNames[0] ?? 'Drama',
    subGenre: genreNames[1] ?? '',
    description: item.description,
    longDescription: item.description,
    rating: 0,
    totalEpisodes: item.total_episodes,
    freeEpisodes: item.freeEpisodes,
    views: fmtCount(item.views ?? 0),
    likes: fmtCount(item.likes ?? 0),
    year: new Date(item.createdAt).getFullYear(),
    tags: item.metadata?.tropes ?? genreNames.slice(2),
    gradient: 'linear-gradient(135deg, #1a0050 0%, #0a0a1a 100%)',
    accentColor: '#4500ff',
    coverImage: item.previewUrl ?? undefined,
    bannerImage: item.bannerUrl ?? item.previewUrl ?? undefined,
    featured: false,
    episodes,
    genres: genreNames,
    tone: item.metadata?.tone,
    comparableTo: item.metadata?.comparableTo,
    watchUrl: item.metadata?.watchUrl,
  }
}
