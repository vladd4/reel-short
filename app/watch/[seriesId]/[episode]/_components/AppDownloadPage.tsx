'use client'

import Image from 'next/image'
import { QRCodeSVG } from 'qrcode.react'
import { APP_DOWNLOAD_URL } from '@/constants'
import { useScrollLock } from '@/hooks/useScrollLock'
import type { Episode, Series } from '@/types'

type Props = {
  series: Series
  episode: Episode
  onBack: () => void
}

export default function AppDownloadPage({ series, episode, onBack }: Props) {
  useScrollLock()
  const coverSrc = series.coverImage ?? series.bannerImage ?? null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" style={{ background: '#06001a' }}>
      {/* Blurred background */}
      {episode.videoUrl ? (
        <video
          src={episode.videoUrl}
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: 'blur(32px) brightness(0.18) saturate(0.4)', transform: 'scale(1.15)' }}
        />
      ) : coverSrc ? (
        <Image
          src={coverSrc}
          alt=""
          fill
          className="object-cover"
          style={{ filter: 'blur(32px) brightness(0.18) saturate(0.4)', transform: 'scale(1.15)' }}
        />
      ) : null}

      {/* Gradient overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(6,0,26,0.92) 0%, rgba(6,0,26,0.6) 50%, rgba(6,0,26,0.75) 100%)',
        }}
      />
      {/* Left glow accent */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 opacity-40"
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(69,0,255,0.35) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-white transition-all hover:brightness-125 active:scale-95"
        style={{
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.14)',
        }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
      </button>

      {/* ── MOBILE LAYOUT ── */}
      <div className="relative flex h-full flex-col lg:hidden">
        {/* Series cover card */}
        {coverSrc && (
          <div className="relative flex-shrink-0" style={{ height: '42%' }}>
            <Image src={coverSrc} alt={series.title} fill className="object-cover object-top" />
            {/* Bottom fade */}
            <div
              className="absolute inset-x-0 bottom-0 h-32"
              style={{ background: 'linear-gradient(to bottom, transparent, #06001a)' }}
            />
          </div>
        )}

        {/* Text + CTA */}
        <div className="flex flex-1 flex-col justify-center gap-5 px-6 pb-10">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl leading-tight font-black text-white">
              Ready for Next Episode?
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Switch to our app for a better experience. Your paid benefits will follow you — just
              log in with your current account.
            </p>
          </div>

          {/* Download CTA */}
          <a
            href={APP_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-sm font-bold text-white transition-all active:scale-95"
            style={{
              background: 'linear-gradient(90deg, #2b009f 0%, #4500ff 100%)',
              boxShadow: '0 4px 24px rgba(69,0,255,0.5)',
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M17.523 15.341a.63.63 0 0 1-.63.63.63.63 0 0 1-.63-.63.63.63 0 0 1 .63-.63.63.63 0 0 1 .63.63zm-10.416 0a.63.63 0 0 1-.63.63.63.63 0 0 1-.63-.63.63.63 0 0 1 .63-.63.63.63 0 0 1 .63.63zm10.673-5.282l1.504-2.604a.313.313 0 0 0-.114-.427.313.313 0 0 0-.428.114l-1.523 2.637A9.448 9.448 0 0 0 12 9.036a9.448 9.448 0 0 0-5.22 1.743L5.257 8.142a.313.313 0 0 0-.428-.114.313.313 0 0 0-.114.427l1.504 2.604C3.716 12.48 2.25 15.076 2.25 18h19.5c0-2.924-1.466-5.52-3.97-6.941z" />
            </svg>
            Download the App
          </a>

          {/* Platform badges */}
          <div className="flex items-center gap-3">
            <div
              className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold text-white"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              App Store
            </div>
            <div
              className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold text-white"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M17.523 15.341a.63.63 0 0 1-.63.63.63.63 0 0 1-.63-.63.63.63 0 0 1 .63-.63.63.63 0 0 1 .63.63zm-10.416 0a.63.63 0 0 1-.63.63.63.63 0 0 1-.63-.63.63.63 0 0 1 .63-.63.63.63 0 0 1 .63.63zm10.673-5.282l1.504-2.604a.313.313 0 0 0-.114-.427.313.313 0 0 0-.428.114l-1.523 2.637A9.448 9.448 0 0 0 12 9.036a9.448 9.448 0 0 0-5.22 1.743L5.257 8.142a.313.313 0 0 0-.428-.114.313.313 0 0 0-.114.427l1.504 2.604C3.716 12.48 2.25 15.076 2.25 18h19.5c0-2.924-1.466-5.52-3.97-6.941z" />
              </svg>
              Google Play
            </div>
          </div>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="relative hidden h-full items-center justify-between px-20 xl:px-32 lg:flex">
        {/* Left: heading + description + QR */}
        <div className="flex max-w-md flex-col gap-10">
          <div className="flex flex-col gap-5">
            <h1 className="text-5xl leading-[1.1] font-black tracking-tight text-white xl:text-6xl">
              Ready for
              <br />
              Next Episode?
            </h1>
            <p className="text-base leading-relaxed xl:text-lg" style={{ color: 'rgba(255,255,255,0.55)' }}>
              For a better experience, switch to our app. Your paid benefits will follow you. Just
              log in with your current account.
            </p>
          </div>

          {/* QR block */}
          <div className="flex items-end gap-5">
            <div
              className="overflow-hidden rounded-2xl p-3"
              style={{
                background: '#fff',
                boxShadow: '0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.12)',
              }}
            >
              <QRCodeSVG
                value={APP_DOWNLOAD_URL}
                size={160}
                bgColor="#ffffff"
                fgColor="#0a0010"
                level="M"
              />
            </div>
            <div className="flex flex-col gap-1 pb-2">
              <p className="text-sm font-semibold text-white">Scan to download</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Available on iOS & Android
              </p>
              {/* Store icon row */}
              <div className="mt-2 flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="white" className="h-6 w-6" style={{ opacity: 0.7 }}>
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <svg viewBox="0 0 24 24" fill="white" className="h-6 w-6" style={{ opacity: 0.7 }}>
                  <path d="M17.523 15.341a.63.63 0 0 1-.63.63.63.63 0 0 1-.63-.63.63.63 0 0 1 .63-.63.63.63 0 0 1 .63.63zm-10.416 0a.63.63 0 0 1-.63.63.63.63 0 0 1-.63-.63.63.63 0 0 1 .63-.63.63.63 0 0 1 .63.63zm10.673-5.282l1.504-2.604a.313.313 0 0 0-.114-.427.313.313 0 0 0-.428.114l-1.523 2.637A9.448 9.448 0 0 0 12 9.036a9.448 9.448 0 0 0-5.22 1.743L5.257 8.142a.313.313 0 0 0-.428-.114.313.313 0 0 0-.114.427l1.504 2.604C3.716 12.48 2.25 15.076 2.25 18h19.5c0-2.924-1.466-5.52-3.97-6.941z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Right: polished phone mockup */}
        <PhoneMockup series={series} episode={episode} coverSrc={coverSrc} />
      </div>
    </div>
  )
}

function PhoneMockup({
  series,
  episode,
  coverSrc,
}: {
  series: Series
  episode: Episode
  coverSrc: string | null
}) {
  return (
    <div className="relative flex-shrink-0" style={{ perspective: 1200 }}>
      {/* Subtle drop shadow behind phone */}
      <div
        className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-6"
        style={{
          width: 200,
          height: 40,
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.7)',
          filter: 'blur(24px)',
          pointerEvents: 'none',
        }}
      />

      {/* Phone outer shell */}
      <div
        style={{
          width: 270,
          height: 560,
          borderRadius: 52,
          background: 'linear-gradient(160deg, #3a3a3c 0%, #1c1c1e 40%, #141416 60%, #2a2a2c 100%)',
          padding: 10,
          boxShadow: [
            '0 0 0 1px rgba(255,255,255,0.12)',
            '0 0 0 1.5px rgba(0,0,0,0.8)',
            '0 30px 80px rgba(0,0,0,0.9)',
            '0 10px 30px rgba(0,0,0,0.6)',
            'inset 0 1px 0 rgba(255,255,255,0.18)',
            'inset 0 -1px 0 rgba(0,0,0,0.5)',
          ].join(', '),
          position: 'relative',
        }}
      >
        {/* Volume buttons (left side) */}
        <div
          style={{
            position: 'absolute',
            left: -3,
            top: 110,
            width: 3,
            height: 32,
            borderRadius: '2px 0 0 2px',
            background: 'linear-gradient(180deg, #4a4a4c, #2a2a2c)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: -3,
            top: 155,
            width: 3,
            height: 32,
            borderRadius: '2px 0 0 2px',
            background: 'linear-gradient(180deg, #4a4a4c, #2a2a2c)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        />
        {/* Power button (right side) */}
        <div
          style={{
            position: 'absolute',
            right: -3,
            top: 140,
            width: 3,
            height: 48,
            borderRadius: '0 2px 2px 0',
            background: 'linear-gradient(180deg, #4a4a4c, #2a2a2c)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        />

        {/* Screen */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 44,
            overflow: 'hidden',
            background: '#000',
            position: 'relative',
          }}
        >
          {/* Cover image */}
          {coverSrc ? (
            <Image src={coverSrc} alt={series.title} fill className="object-cover" sizes="250px" />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: series.gradient || 'linear-gradient(180deg,#1a0050,#000)',
              }}
            />
          )}

          {/* Screen glare */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.02) 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Status bar */}
          <div
            className="absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-3 pb-1"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)' }}
          >
            <span className="text-[11px] font-semibold text-white">9:41</span>
            {/* Dynamic island */}
            <div
              style={{
                width: 90,
                height: 22,
                borderRadius: 11,
                background: '#000',
              }}
            />
            <div className="flex items-center gap-[3px]">
              {/* Signal */}
              <svg viewBox="0 0 16 12" fill="white" className="h-[10px] w-[14px]">
                <rect x="0" y="8" width="2.5" height="4" rx="0.5" />
                <rect x="3.5" y="5.5" width="2.5" height="6.5" rx="0.5" />
                <rect x="7" y="3" width="2.5" height="9" rx="0.5" />
                <rect x="10.5" y="0" width="2.5" height="12" rx="0.5" opacity="0.35" />
              </svg>
              {/* Wifi */}
              <svg viewBox="0 0 16 12" fill="white" className="h-[10px] w-[14px]">
                <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
                <path d="M8 6c1.5 0 2.9.6 3.9 1.6l1.1-1.1A7 7 0 0 0 8 4a7 7 0 0 0-5 2.5l1.1 1.1A5 5 0 0 1 8 6z" opacity="0.7" />
                <path d="M8 2C4.7 2 1.7 3.4 0 5.6l1.1 1A8.5 8.5 0 0 1 8 3.5c2.5 0 4.8 1 6.4 2.6l1-1A10 10 0 0 0 8 2z" opacity="0.4" />
              </svg>
              {/* Battery */}
              <div className="relative flex items-center">
                <div
                  style={{
                    width: 20,
                    height: 10,
                    borderRadius: 2,
                    border: '1px solid rgba(255,255,255,0.7)',
                    position: 'relative',
                    padding: 1.5,
                  }}
                >
                  <div
                    style={{
                      width: '80%',
                      height: '100%',
                      borderRadius: 1,
                      background: '#fff',
                    }}
                  />
                </div>
                <div
                  style={{
                    width: 2,
                    height: 5,
                    borderRadius: '0 1px 1px 0',
                    background: 'rgba(255,255,255,0.6)',
                    marginLeft: 1,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Series title overlay + episode info */}
          <div
            className="absolute inset-x-0 bottom-0 flex flex-col gap-1 px-5 pb-8 pt-16"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
            }}
          >
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Now Watching
            </p>
            <p className="text-sm font-black leading-tight text-white">{series.title}</p>
            <div className="mt-1 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="white" className="h-3 w-3" style={{ opacity: 0.7 }}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
                <span className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Ep.{episode.number} / {series.totalEpisodes}
                </span>
              </div>
              <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4" style={{ opacity: 0.6 }}>
                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
              </svg>
            </div>
            {/* Progress bar */}
            <div
              className="mt-1 h-0.5 w-full overflow-hidden rounded-full"
              style={{ background: 'rgba(255,255,255,0.15)' }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${((episode.number - 1) / Math.max(series.totalEpisodes - 1, 1)) * 100}%`,
                  background: 'var(--primary, #4500ff)',
                }}
              />
            </div>
          </div>

          {/* Home indicator */}
          <div
            className="absolute bottom-2 left-1/2 -translate-x-1/2"
            style={{
              width: 100,
              height: 4,
              borderRadius: 2,
              background: 'rgba(255,255,255,0.25)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
