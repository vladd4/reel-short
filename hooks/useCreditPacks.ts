'use client'

import { useEffect, useState } from 'react'
import type { CreditPack } from '@/types'
import { billingService } from '@/services/billing.service'

export function useCreditPacks() {
  const [packs, setPacks] = useState<CreditPack[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await billingService.getCreditPacks()
        setPacks(data)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  return { packs, isLoading }
}
