export type CreditPack = {
  id: string
  code: string
  baseCoins: number
  bonusCoins: number
  totalCoins: number
  bonusPercent: number
  priceCents: number
  price: string
  currency: string
}

export type SubscriptionPlan = {
  id: string
  code: string
  name: string
  interval: 'WEEK' | 'MONTH' | 'YEAR'
  priceCents: number
  price: string
  currency: string
  features: string[]
}

export type Subscription = {
  id: string
  status: 'ACTIVE' | 'CANCELED' | 'EXPIRED' | 'PAUSED'
  autoRenew: boolean
  currentPeriodStart: string
  currentPeriodEnd: string
  canceledAt: string | null
  plan: SubscriptionPlan
}
