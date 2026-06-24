'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Series } from '@/types'
import { ROUTES } from '@/constants'

type Props = {
  series: Series
  className?: string
  size?: 'sm' | 'lg'
}

export default function SeriesCard({ series, className = '', size = 'sm' }: Props) {
  const router = useRouter()
  const widthClass = size === 'lg' ? 'w-44 sm:w-52 md:w-56' : 'w-32 sm:w-36 md:w-40'

  return (
    <Link
      href={ROUTES.watch(series.id, series.title, 1)}
      className={`group relative flex-shrink-0 ${widthClass} cursor-pointer overflow-hidden rounded-xl ${className}`}
      style={{ aspectRatio: '2/3', border: '1px solid rgba(255,255,255,0.1)' }}
    >
      {series.coverImage ? (
        <Image
          src={series.coverImage}
          alt={series.title}
          fill
          sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, 224px"
          className="absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-300 group-hover:scale-110"
        />
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-b ${series.gradient} transition-transform duration-300 group-hover:scale-105`}
        />
      )}

      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)',
        }}
      />

      <div
        className="absolute top-2 right-2 rounded px-1.5 py-0.5 text-[10px] font-semibold"
        style={{
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(4px)',
          color: 'rgba(255,255,255,0.75)',
        }}
      >
        {series.totalEpisodes} EP
      </div>

      <div
        className="absolute inset-x-0 bottom-0 p-3 transition-opacity duration-200 group-hover:opacity-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)',
        }}
      >
        <span
          className="mb-1.5 inline-block rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase"
          style={{
            background: 'rgba(0,0,0,0.55)',
            color: 'rgba(255,255,255,0.85)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          {series.genre}
        </span>
        <p className="mb-2 line-clamp-2 text-sm leading-tight font-bold text-white">
          {series.title}
        </p>
        <div className="flex items-center gap-1">
          <svg viewBox="0 0 24 24" fill="#ff5d88" className="h-3 w-3 flex-shrink-0">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="text-[10px] font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {series.likes}
          </span>
        </div>
      </div>

      <div
        className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.2) 100%)',
        }}
      >
        <p className="mb-1.5 line-clamp-2 text-sm leading-tight font-bold text-white">
          {series.title}
        </p>
        <p
          className="mb-3 line-clamp-3 text-[11px] leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.55)' }}
        >
          {series.description}
        </p>
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push(ROUTES.series(series.id, series.title)) }}
          className="flex cursor-pointer items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-bold text-white transition-all hover:brightness-110 active:scale-95"
          style={{ background: 'linear-gradient(90deg, #2b009f, #4500ff)' }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
          </svg>
          Details
        </button>
      </div>
    </Link>
  )
}
