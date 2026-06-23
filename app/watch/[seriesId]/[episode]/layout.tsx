import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { getSeriesById } from '@/data/series'

type Props = {
  params: Promise<{
    seriesId: string
    episode: string
  }>
  children: ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seriesId, episode } = await params
  const series = getSeriesById(seriesId)
  if (!series) return {}

  const epNum = parseInt(episode, 10)
  const ep = series.episodes.find((e) => e.number === epNum)
  const epLabel = ep ? `Ep ${epNum}: ${ep.title}` : `Episode ${epNum}`
  const title = `${series.title} — ${epLabel}`
  const description = `Watch ${series.title} ${epLabel} on My Drama. ${series.description}`

  const images = series.bannerImage
    ? [{ url: series.bannerImage, width: 1280, height: 720, alt: series.title }]
    : []

  return {
    title,
    description,
    openGraph: { type: 'video.episode', title, description, images },
    twitter: { card: 'summary_large_image', title, description, images: images.map((i) => i.url) },
  }
}

export default function WatchLayout({ children }: Props) {
  return <>{children}</>
}
