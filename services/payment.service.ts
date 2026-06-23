import { HttpClient } from './http.client'

class PaymentService extends HttpClient {
  async subscribe(planId: string): Promise<void> {
    return this.post<void>('/payments/subscribe', { planId })
  }

  async purchaseCoins(packageId: string): Promise<{ coins: number }> {
    return this.post<{ coins: number }>('/payments/coins', { packageId })
  }

  async unlockEpisode(seriesId: string, episode: number): Promise<void> {
    return this.post<void>('/payments/unlock', { seriesId, episode })
  }
}

export const paymentService = new PaymentService()
