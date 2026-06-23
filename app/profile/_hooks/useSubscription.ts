'use client'

import { useCallback, useEffect, useState } from 'react'
import type { Subscription } from '@/types'
import { billingService } from '@/services/billing.service'

export function useSubscription(isLoggedIn: boolean) {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState(isLoggedIn)

  const fetch = useCallback(async () => {
    if (!isLoggedIn) { setSubscription(null); return }
    setIsLoading(true)
    try {
      const res = await billingService.getSubscription()
      setSubscription(res?.subscription ?? null)
    } catch {
      setSubscription(null)
    } finally {
      setIsLoading(false)
    }
  }, [isLoggedIn])

  useEffect(() => {
    async function load() { await fetch() }
    load()
  }, [fetch])

  return { subscription, isLoading, refetch: fetch }
}
