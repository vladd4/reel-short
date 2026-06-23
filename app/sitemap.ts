import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/constants'
import { ALL_SERIES } from '@/data/series'

export default function sitemap(): MetadataRoute.Sitemap {
  const seriesPages: MetadataRoute.Sitemap = ALL_SERIES.map((s) => ({
    url: `${SITE_URL}/series/${s.id}`,
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
