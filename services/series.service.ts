import type { Episode, Series } from '@/types'
import type { ApiActor, ApiEpisode, ApiGenre, ApiSeriesDetail, ApiSeriesItem } from '@/types'
import { mapEpisode, mapSeries } from '@/lib/series.mappers'
import { ApiError, HttpClient } from './http.client'

class SeriesService extends HttpClient {
  async getAll(genre?: string): Promise<Series[]> {
    const params = new URLSearchParams({ size: '50' })
    if (genre && genre !== 'All') params.set('genre', genre)
    const items = await this.get<ApiSeriesItem[]>(`/series?${params}`)
    return items.map((s) => mapSeries(s))
  }

  async getById(id: string): Promise<Series | undefined> {
    try {
      const item = await this.get<ApiSeriesDetail>(`/series/${id}`)
      return mapSeries(item)
    } catch (e) {
      if (e instanceof ApiError && e.status === 404) return undefined
      throw e
    }
  }

  async getRelated(id: string, genre: string): Promise<Series[]> {
    const params = new URLSearchParams({ genre, size: '9' })
    const items = await this.get<ApiSeriesItem[]>(`/series?${params}`)
    return items
      .filter((s) => String(s.id) !== id)
      .slice(0, 8)
      .map((s) => mapSeries(s))
  }

  async getEpisodeById(episodeId: number): Promise<Episode | undefined> {
    try {
      const item = await this.get<ApiEpisode>(`/episodes/${episodeId}`)
      return mapEpisode(item)
    } catch (e) {
      if (e instanceof ApiError && e.status === 404) return undefined
      throw e
    }
  }

  async getGenres(): Promise<string[]> {
    const items = await this.get<ApiGenre[]>('/genres')
    return items.map((g) => g.name)
  }

  async getFeatured(): Promise<Series[]> {
    const items = await this.get<ApiSeriesItem[]>('/series?size=5')
    return items.map((s) => mapSeries(s))
  }

  async getActors(seriesId: number): Promise<ApiActor[]> {
    return this.get<ApiActor[]>(`/series/${seriesId}/actors`)
  }

  async purchaseEpisode(episodeId: number): Promise<void> {
    await this.post<unknown>(`/episodes/${episodeId}/purchase`, {})
  }
}

export const seriesService = new SeriesService()
