'use client'

import { useState } from 'react'
import type { Series } from '@/types'
import ShareModal from './ShareModal'

export default function ShareButton({ series }: { series: Series }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex cursor-pointer items-center gap-2 text-sm transition-opacity hover:opacity-70 active:opacity-50"
        style={{ color: 'rgba(255,255,255,0.55)' }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4"
        >
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
        Share
      </button>
      {open && <ShareModal series={series} onClose={() => setOpen(false)} />}
    </>
  )
}
