import type { MetadataRoute } from 'next'
import { SITE_URL, ROUTES } from '@/constants'
import { seriesService } from '@/services'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allSeries = await seriesService.getAll().catch(() => [])

  const seriesPages: MetadataRoute.Sitemap = allSeries.map((s) => ({
    url: `${SITE_URL}${ROUTES.series(s.id, s.title)}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    {
      url: SITE_URL,
      changeFrequency: 'daily',
      priority: 1,
    },
    ...seriesPages,
  ]
}
