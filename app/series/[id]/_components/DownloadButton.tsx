'use client'

import { useState } from 'react'
import { APP_DOWNLOAD_URL } from '@/constants'
import AppDownloadModal from '@/components/modals/AppDownloadModal'

const cls =
  'flex items-center justify-center gap-2.5 rounded-xl px-5 py-3 text-sm font-semibold transition-all hover:opacity-75 active:scale-95 active:opacity-60 sm:px-7'
const style = {
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'rgba(255,255,255,0.8)',
}

function Icon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

export default function DownloadButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <a
        href={APP_DOWNLOAD_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${cls} sm:hidden`}
        style={style}
      >
        <Icon />
        Download
      </a>

      <button
        onClick={() => setOpen(true)}
        className={`hidden cursor-pointer sm:flex ${cls}`}
        style={style}
      >
        <Icon />
        Download
      </button>

      {open && <AppDownloadModal onClose={() => setOpen(false)} />}
    </>
  )
}
