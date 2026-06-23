import { HttpClient } from './http.client'
import type { Series } from '@/types'
import { getSeriesById, getSeriesByGenre, ALL_SERIES } from '@/data/series'

class SeriesService extends HttpClient {
  async getAll(genre?: string): Promise<Series[]> {
    return getSeriesByGenre(genre ?? 'All')
  }

  async getById(id: string): Promise<Series | undefined> {
    return getSeriesById(id)
  }

  async getRelated(id: string, genre: string): Promise<Series[]> {
    return ALL_SERIES.filter((s) => s.genre === genre && s.id !== id).slice(0, 8)
  }

  async getFeatured(): Promise<Series[]> {
    return ALL_SERIES.filter((s) => s.featured)
  }
}

export const seriesService = new SeriesService()
