'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Series } from '@/types'
import { FEATURED_INTERVAL_MS, ROUTES } from '@/constants'

type Props = { items: Series[] }

export default function FeaturedBanner({ items }: Props) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), FEATURED_INTERVAL_MS)
    return () => clearInterval(t)
  }, [items.length])

  const s = items[idx]

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: 'min(560px, 72vw)', minHeight: 420 }}
    >
      {items.map((item, i) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-700 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
        >
          {item.bannerImage ? (
            <Image
              src={item.bannerImage}
              alt={item.title}
              fill
              sizes="100vw"
              className="absolute inset-0 h-full w-full object-cover object-center"
              style={{ opacity: 0.7 }}
              priority={i === 0}
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${item.accentColor}55 0%, #040405 70%)`,
              }}
            />
          )}
        </div>
      ))}

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: '200px',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 70% 40%, transparent 20%, rgba(4,4,5,0.65) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, #040405 0%, rgba(4,4,5,0.3) 40%, transparent 65%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(4,4,5,0.85) 0%, rgba(4,4,5,0.4) 40%, transparent 70%)',
        }}
      />

      <div
        key={s.id + '-glow'}
        className="anim-fade-in pointer-events-none absolute"
        style={{
          top: '-10%',
          right: '5%',
          width: 420,
          height: 420,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${s.accentColor}30 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />

      <div
        key={s.id + '-content'}
        className="anim-fade-up absolute inset-0 flex flex-col justify-end px-6 pb-10 md:px-14 md:pb-14"
      >
        <div className="max-w-2xl">
          <div className="mb-4 flex items-center gap-2">
            <span
              className="rounded-md px-2.5 py-1 text-[11px] font-bold tracking-widest uppercase"
              style={{ background: s.accentColor, color: '#fff' }}
            >
              {s.subGenre}
            </span>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {s.views} views
            </span>
          </div>

          <h1
            className="mb-2 text-4xl leading-[1.1] font-black tracking-tight md:text-6xl"
            style={{ textShadow: '0 2px 40px rgba(0,0,0,0.5)' }}
          >
            {s.title}
          </h1>

          <p
            className="mb-6 line-clamp-2 max-w-sm text-sm leading-relaxed md:text-base"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            {s.description}
          </p>

          <div className="flex items-center gap-3">
            <Link
              href={ROUTES.watch(s.id, s.title, 1)}
              className="flex items-center gap-2.5 rounded-xl px-6 py-3 text-sm font-bold transition-all hover:brightness-110 active:scale-95"
              style={{
                background: 'linear-gradient(90deg, #2b009f, #4500ff)',
                color: '#fff',
                boxShadow: '0 2px 16px rgba(69,0,255,0.4)',
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Free
            </Link>
            <Link
              href={ROUTES.series(s.id, s.title)}
              className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all hover:brightness-125"
              style={{
                background: 'rgba(0,0,0,0.45)',
                border: '1px solid rgba(255,255,255,0.22)',
                color: '#fff',
                backdropFilter: 'blur(12px) saturate(160%)',
                WebkitBackdropFilter: 'blur(12px) saturate(160%)',
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4m0 4h.01" />
              </svg>
              More Info
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute right-6 bottom-5 flex items-center gap-1.5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="cursor-pointer rounded-full transition-all duration-300"
            style={{
              height: 4,
              width: i === idx ? 24 : 4,
              background: i === idx ? '#fff' : 'rgba(255,255,255,0.25)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
