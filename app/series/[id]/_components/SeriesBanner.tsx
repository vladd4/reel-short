import Image from 'next/image'
import type { Series } from '@/types'

export default function SeriesBanner({ series }: { series: Series }) {
  return (
    <div className="relative pt-16" style={{ height: 'min(460px, 68vw)', minHeight: 360 }}>
      {series.bannerImage ? (
        <Image
          src={series.bannerImage}
          alt={series.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          style={{ opacity: 0.7 }}
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${series.gradient}`} />
      )}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
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

      <div className="absolute inset-x-0 bottom-6 px-4 sm:bottom-8 sm:px-8 md:px-12">
        <div className="mb-2 flex items-center gap-2">
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
            style={{
              background: series.accentColor + '33',
              color: series.accentColor,
              border: `1px solid ${series.accentColor}55`,
            }}
          >
            {series.subGenre}
          </span>
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
            · {series.year} · {series.totalEpisodes} eps
          </span>
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight drop-shadow-lg sm:text-3xl md:text-5xl">
          {series.title}
        </h1>
        <p
          className="line-clamp-2 max-w-lg text-sm leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          {series.description}
        </p>
      </div>
    </div>
  )
}
