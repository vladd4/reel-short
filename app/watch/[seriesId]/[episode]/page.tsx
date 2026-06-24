import { notFound, redirect } from 'next/navigation'
import { seriesService } from '@/services'
import { ROUTES } from '@/constants'
import { parseId } from '@/lib/utils'
import WatchClient from './_components/WatchClient'

type Props = { params: Promise<{ seriesId: string; episode: string }> }

export default async function WatchPage({ params }: Props) {
  const { seriesId: seriesSlug, episode } = await params
  const seriesId = parseId(seriesSlug)
  const initialEpisode = parseInt(episode, 10)
  const series = await seriesService.getById(seriesId)

  if (!series || isNaN(initialEpisode)) notFound()

  if (series.episodes.length === 0 || !series.episodes[initialEpisode - 1]) {
    redirect(ROUTES.series(series.id, series.title))
  }

  const related = await seriesService.getRelated(seriesId, series.genre)

  return (
    <WatchClient
      series={series}
      initialEpisode={initialEpisode}
      seriesId={seriesId}
      related={related}
    />
  )
}
