import { HttpClient } from './http.client'
import type { Series } from '@/types'
import { getSeriesById, getSeriesByGenre, ALL_SERIES } from '@/data/series'

class SeriesService extends HttpClient {
  async getAll(genre?: string): Promise<Series[]> {
    if (!this.baseUrl) return getSeriesByGenre(genre ?? 'All')
    return this.get<Series[]>(genre ? `/series?genre=${genre}` : '/series')
  }

  async getById(id: string): Promise<Series | undefined> {
    if (!this.baseUrl) return getSeriesById(id)
    return this.get<Series>(`/series/${id}`)
  }

  async getRelated(id: string, genre: string): Promise<Series[]> {
    if (!this.baseUrl) {
      return ALL_SERIES.filter(s => s.genre === genre && s.id !== id).slice(0, 8)
    }
    return this.get<Series[]>(`/series/${id}/related`)
  }

  async getFeatured(): Promise<Series[]> {
    if (!this.baseUrl) {
      return ALL_SERIES.filter(s => s.featured)
    }
    return this.get<Series[]>('/series/featured')
  }
}

export const seriesService = new SeriesService()
