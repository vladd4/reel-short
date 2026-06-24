import type { ApiFavourite } from '@/types'
import { HttpClient } from './http.client'

class FavouritesService extends HttpClient {
  async getAll(): Promise<ApiFavourite[]> {
    const res = await this.get<{ favourites: ApiFavourite[] }>('/users/me/favourites')
    return res.favourites
  }

  async add(seriesId: string | number): Promise<void> {
    await this.post<{ favourite: ApiFavourite }>(`/series/${seriesId}/favourite`, {})
  }

  async remove(seriesId: string | number): Promise<void> {
    return this.delete<void>(`/series/${seriesId}/favourite`)
  }
}

export const favouritesService = new FavouritesService()
