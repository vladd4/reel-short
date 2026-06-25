import type { GiftItem } from '@/types'
import type { ApiGift } from '@/types/api.types'

export function mapGift(g: ApiGift): GiftItem {
  return {
    id: String(g.id),
    code: g.code,
    name: g.name,
    emoji: g.emoji,
    cost: g.priceCredits,
    tier: g.category.toLowerCase(),
  }
}
