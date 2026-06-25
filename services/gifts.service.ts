import type { ApiGift } from '@/types'
import type { GiftItem } from '@/types'
import { mapGift } from '@/lib/gifts.mappers'
import { HttpClient } from './http.client'

class GiftsService extends HttpClient {
  async getAll(): Promise<GiftItem[]> {
    const items = await this.get<ApiGift[]>('/gifts')
    return items.map(mapGift)
  }

  async send(actorId: string, giftCode: string, message: string, mediaUrl?: string): Promise<void> {
    await this.post<unknown>(`/actors/${actorId}/gifts`, {
      giftCode,
      message,
      mediaUrl: mediaUrl ?? 'https://placehold.co/400x300.jpg',
    })
  }
}

export const giftsService = new GiftsService()
