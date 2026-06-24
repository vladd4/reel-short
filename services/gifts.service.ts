import type { ApiGift } from '@/types'
import { HttpClient } from './http.client'

export type GiftItem = {
  id: string
  code: string
  name: string
  emoji: string
  cost: number
  tier: string
}

function mapGift(g: ApiGift): GiftItem {
  return {
    id: String(g.id),
    code: g.code,
    name: g.name,
    emoji: g.emoji,
    cost: g.priceCredits,
    tier: g.category.toLowerCase(),
  }
}

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
