'use client'

import { useEffect, useState } from 'react'
import type { SubscriptionPlan } from '@/types'
import { billingService } from '@/services/billing.service'

export function useSubscriptionPlans() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await billingService.getPlans()
        setPlans(data)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  return { plans, isLoading }
}
