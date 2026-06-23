'use client'

import { useEffect } from 'react'

const LOCK_KEY = 'ndScrollLocks'

export function useScrollLock() {
  useEffect(() => {
    const count = parseInt(document.body.dataset[LOCK_KEY] ?? '0', 10) + 1
    document.body.dataset[LOCK_KEY] = String(count)
    document.body.style.overflow = 'hidden'

    return () => {
      const next = Math.max(0, parseInt(document.body.dataset[LOCK_KEY] ?? '0', 10) - 1)
      document.body.dataset[LOCK_KEY] = String(next)
      if (next === 0) document.body.style.overflow = ''
    }
  }, [])
}
