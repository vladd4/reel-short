import type { Episode, Series } from '@/types'
import type { ApiActor, ApiEpisode, ApiGenre, ApiSeriesDetail, ApiSeriesItem } from '@/types'
import { ApiError, HttpClient } from './http.client'

function fmtDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function mapEpisode(ep: ApiEpisode): Episode {
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

function fmtCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`
  return String(n)
}

function mapSeries(item: ApiSeriesDetail): Series {
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

class SeriesService extends HttpClient {
  async getAll(genre?: string): Promise<Series[]> {
    console.log('[SeriesService] getAll', { genre })
    const params = new URLSearchParams({ size: '50' })
    if (genre && genre !== 'All') params.set('genre', genre)
    const items = await this.get<ApiSeriesItem[]>(`/series?${params}`)
    console.log('[SeriesService] getAll result', items)
    const result = items.map((s) => mapSeries(s))

    return result
  }

  async getById(id: string): Promise<Series | undefined> {
    console.log('[SeriesService] getById', { id })
    try {
      const item = await this.get<ApiSeriesDetail>(`/series/${id}`)
      const result = mapSeries(item)
      console.log('[SeriesService] getById result', result)
      return result
    } catch (e) {
      if (e instanceof ApiError && e.status === 404) return undefined
      throw e
    }
  }

  async getRelated(id: string, genre: string): Promise<Series[]> {
    console.log('[SeriesService] getRelated', { id, genre })
    const params = new URLSearchParams({ genre, size: '9' })
    const items = await this.get<ApiSeriesItem[]>(`/series?${params}`)
    const result = items
      .filter((s) => String(s.id) !== id)
      .slice(0, 8)
      .map((s) => mapSeries(s))
    console.log('[SeriesService] getRelated result', result)
    return result
  }

  async getEpisodeById(episodeId: number): Promise<Episode | undefined> {
    console.log('[SeriesService] getEpisodeById', { episodeId })
    try {
      const item = await this.get<ApiEpisode>(`/episodes/${episodeId}`)
      const result = mapEpisode(item)
      console.log('[SeriesService] getEpisodeById result', result)
      return result
    } catch (e) {
      if (e instanceof ApiError && e.status === 404) return undefined
      throw e
    }
  }

  async getGenres(): Promise<string[]> {
    console.log('[SeriesService] getGenres')
    const items = await this.get<ApiGenre[]>('/genres')
    const result = items.map((g) => g.name)
    console.log('[SeriesService] getGenres result', result)
    return result
  }

  async getFeatured(): Promise<Series[]> {
    console.log('[SeriesService] getFeatured')
    const items = await this.get<ApiSeriesItem[]>('/series?size=5')
    const result = items.map((s) => mapSeries(s))
    console.log('[SeriesService] getFeatured result', result)
    return result
  }

  async getActors(seriesId: number): Promise<ApiActor[]> {
    return this.get<ApiActor[]>(`/series/${seriesId}/actors`)
  }

  async purchaseEpisode(episodeId: number): Promise<void> {
    await this.post<unknown>(`/episodes/${episodeId}/purchase`, {})
  }
}

export const seriesService = new SeriesService()
