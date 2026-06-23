import { notFound } from 'next/navigation'
import { seriesService } from '@/services'
import WatchClient from './_components/WatchClient'

type Props = { params: Promise<{ seriesId: string; episode: string }> }

export default async function WatchPage({ params }: Props) {
  const { seriesId, episode } = await params
  const initialEpisode = parseInt(episode, 10)
  const series = await seriesService.getById(seriesId)

  if (!series || isNaN(initialEpisode) || !series.episodes[initialEpisode - 1]) {
    notFound()
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
