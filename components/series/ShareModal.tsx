'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { Series } from '@/types'
import { ROUTES } from '@/constants'
import { useScrollLock } from '@/hooks/useScrollLock'
import CloseButton from '@/components/ui/CloseButton'

type Props = {
  series: Series
  onClose: () => void
}

export default function ShareModal({ series, onClose }: Props) {
  useScrollLock()

  const [copied, setCopied] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const seriesPath = ROUTES.series(series.id, series.title)
  const url = typeof window !== 'undefined' ? `${window.location.origin}${seriesPath}` : seriesPath

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 280)
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
      style={{
        background: visible ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0)',
        backdropFilter: visible ? 'blur(4px)' : 'none',
        transition: 'background 0.28s ease, backdrop-filter 0.28s ease',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div
        className={`w-full overflow-hidden sm:max-w-lg modal-drawer${visible ? 'open' : ''}`}
        style={{
          background: '#040405',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.6)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="h-1 w-10 rounded-full" style={{ background: 'rgba(255,255,255,0.18)' }} />
        </div>

        <div className="p-5 pt-3 sm:pt-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-base font-bold text-white">Share</span>
            <CloseButton
              onClick={handleClose}
              className="hidden h-8 w-8 rounded-full sm:flex"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            />
          </div>

          <div
            className="mb-5 flex items-center gap-3 rounded-xl p-3"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="relative h-28 w-20 flex-shrink-0 overflow-hidden rounded-lg">
              {series.coverImage ? (
                <Image
                  src={series.coverImage}
                  alt={series.title}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              ) : (
                <div className={`h-full w-full bg-gradient-to-b ${series.gradient}`} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-1 line-clamp-2 text-sm leading-snug font-bold text-white">
                {series.title}
              </p>
              <p
                className="line-clamp-3 text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                {series.description}
              </p>
            </div>
          </div>

          <button
            onClick={copyLink}
            className="flex w-full items-center gap-3 rounded-xl px-5 py-4 transition-all hover:brightness-110 active:scale-95"
            style={{
              background: copied ? 'rgba(0,157,105,0.15)' : 'rgba(255,255,255,0.07)',
              border: `1px solid ${copied ? 'rgba(0,157,105,0.4)' : 'rgba(255,255,255,0.1)'}`,
              color: copied ? '#009d69' : 'rgba(255,255,255,0.85)',
            }}
          >
            {copied ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 flex-shrink-0">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5 flex-shrink-0"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            )}
            <span className="text-sm font-semibold">{copied ? 'Link copied!' : 'Copy link'}</span>
            {!copied && (
              <span
                className="ml-auto max-w-[140px] truncate text-xs"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                {url}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
