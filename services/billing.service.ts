import type { CreditPack, Subscription, SubscriptionPlan } from '@/types'
import { HttpClient } from './http.client'

class BillingService extends HttpClient {
  async getSubscription(): Promise<{ subscription: Subscription } | null> {
    try {
      return await this.get<{ subscription: Subscription }>('/billing/subscription')
    } catch {
      return null
    }
  }

  async getCreditPacks(): Promise<CreditPack[]> {
    try {
      const res = await this.get<{ creditPacks: CreditPack[] }>('/billing/credit-packs')
      return res.creditPacks
    } catch {
      return []
    }
  }

  async purchaseCredits(packCode: string): Promise<void> {
    return this.post<void>('/billing/credits/purchase', { packCode })
  }

  async getPlans(): Promise<SubscriptionPlan[]> {
    try {
      const res = await this.get<{ plans: SubscriptionPlan[] }>('/billing/plans')
      return res.plans
    } catch {
      return []
    }
  }

  async purchaseSubscription(planCode: string): Promise<void> {
    return this.post<void>('/billing/subscription', { planCode })
  }

  async cancelSubscription(): Promise<void> {
    return this.post<void>('/billing/subscription/cancel', {})
  }
}

export const billingService = new BillingService()
