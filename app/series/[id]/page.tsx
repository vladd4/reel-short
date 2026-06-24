import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { seriesService } from '@/services'
import { ROUTES } from '@/constants'
import { parseId } from '@/lib/utils'
import FavoriteButton from '@/components/series/FavoriteButton'
import GenreRow from '@/components/series/GenreRow'
import ShareButton from '@/components/series/ShareButton'
import DownloadButton from './_components/DownloadButton'
import EpisodeGrid from './_components/EpisodeGrid'
import GenrePills from './_components/GenrePills'
import SeriesBanner from './_components/SeriesBanner'

type Props = {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: slug } = await params
  const series = await seriesService.getById(parseId(slug))
  if (!series) return {}

  const images = series.bannerImage
    ? [{ url: series.bannerImage, width: 1280, height: 720, alt: series.title }]
    : []

  return {
    title: series.title,
    description: `${series.description} ${series.totalEpisodes} episodes · ${series.genre} · ${series.subGenre}.`,
    keywords: [
      series.title,
      series.genre,
      series.subGenre,
      ...series.tags,
      'short drama',
      'streaming',
    ],
    openGraph: {
      type: 'video.tv_show',
      title: series.title,
      description: series.description,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: series.title,
      description: series.description,
      images: images.map((i) => i.url),
    },
  }
}

export default async function SeriesPage({ params }: Props) {
  const { id: slug } = await params
  const id = parseId(slug)
  const series = await seriesService.getById(id)
  if (!series) notFound()

  const relatedSeries = await seriesService.getRelated(id, series.genre)
  const genres = (series.tags ?? []).filter(Boolean)

  return (
    <main className="min-h-screen pb-20" style={{ background: 'var(--background)' }}>
      <SeriesBanner series={series} />

      <div className="px-4 sm:px-8 md:px-12">
        <nav
          className="mt-6 mb-8 flex items-center gap-2 text-sm"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <span>/</span>
          <span className="max-w-[160px] truncate text-white sm:max-w-none">{series.title}</span>
        </nav>

        <div className="mb-8 flex items-start gap-5 sm:mb-12 sm:gap-8">
          <div
            className="relative w-[42vw] max-w-[180px] flex-shrink-0 overflow-hidden rounded-xl select-none sm:w-44"
            style={{ aspectRatio: '2/3' }}
          >
            {series.coverImage ? (
              <Image
                src={series.coverImage}
                alt={series.title}
                fill
                sizes="180px"
                className="object-cover"
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(160deg, ${series.accentColor}55 0%, #0a0a1a 70%)`,
                }}
              />
            )}
          </div>

          <div className="flex min-w-0 flex-1 flex-col">
            <h1 className="mb-3 text-xl leading-tight font-bold tracking-tight sm:mb-5 sm:text-3xl">
              {series.title}
            </h1>

            <div className="mb-3 flex flex-wrap items-center gap-3 sm:mb-5 sm:gap-6">
              <div
                className="flex items-center gap-1.5 text-sm"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span className="font-medium">{series.views}</span>
              </div>
              <div
                className="flex items-center gap-1.5 text-sm"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                <svg viewBox="0 0 24 24" fill="#ff5d88" className="h-4 w-4">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="font-medium">{series.likes}</span>
              </div>
              <FavoriteButton
                seriesId={series.id}
                withLabel
                style={{ color: 'rgba(255,255,255,0.55)' }}
              />
              <ShareButton series={series} />
            </div>

            <GenrePills genres={genres} className="mb-auto hidden sm:flex" />

            <div className="mt-4 flex flex-col items-stretch gap-2.5 sm:mt-8 sm:flex-row sm:items-center sm:gap-3">
              <Link
                href={ROUTES.watch(series.id, series.title, 1)}
                className="flex items-center justify-center gap-2.5 rounded-xl px-5 py-3 text-sm font-bold transition-all hover:opacity-85 active:scale-95 active:opacity-70 sm:px-7"
                style={{ background: '#4500ff', color: '#fff' }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Go Watching
              </Link>
              <DownloadButton />
            </div>
          </div>
        </div>

        <GenrePills genres={genres} className="mb-8 sm:hidden" compact />

        <div className="mb-10">
          <h2 className="mb-3 text-base font-bold">Plot</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {series.longDescription}
          </p>
        </div>

        {series.comparableTo && series.comparableTo.length > 0 && (
          <div className="mb-10">
            <h2 className="mb-3 text-base font-bold">If you liked</h2>
            <div className="flex flex-wrap gap-2">
              {series.comparableTo.map((title) => (
                <span
                  key={title}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium"
                  style={{
                    background: series.accentColor + '15',
                    border: `1px solid ${series.accentColor}33`,
                    color: series.accentColor,
                  }}
                >
                  {title}
                </span>
              ))}
            </div>
          </div>
        )}

        {series.episodes.length > 0 && (
          <EpisodeGrid
            episodes={series.episodes}
            seriesId={series.id}
            seriesTitle={series.title}
            totalCount={series.totalEpisodes}
          />
        )}

        {relatedSeries.length > 0 && (
          <GenreRow genre="More Like This" series={relatedSeries} showMoreButton={false} />
        )}
      </div>
    </main>
  )
}
