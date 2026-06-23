import { Suspense } from 'react'
import type { Metadata } from 'next'
import { GENRES } from '@/constants'
import { seriesService } from '@/services'
import { CATEGORIES } from '@/data/series'
import CategoryTabs from '@/components/series/CategoryTabs'
import FavoritesRow from '@/components/series/FavoritesRow'
import FeaturedBanner from '@/components/series/FeaturedBanner'
import GenreRow from '@/components/series/GenreRow'
import EmptyState from '@/components/ui/EmptyState'

export const metadata: Metadata = {
  title: 'My Drama — Watch Short Drama Series Free',
  description:
    'Discover and stream the best short drama series. Romance, thriller, fantasy and more — new episodes every day.',
  openGraph: {
    type: 'website',
    title: 'My Drama — Watch Short Drama Series Free',
    description:
      'Discover and stream the best short drama series. Romance, thriller, fantasy and more.',
  },
}

type Props = {
  searchParams: Promise<{
    genre?: string
  }>
}

export default async function Home({ searchParams }: Props) {
  const { genre } = await searchParams
  const isShowingAll = !genre || genre === 'All'

  const [featuredSeries, filteredSeries, allSeries] = await Promise.all([
    seriesService.getFeatured(),
    seriesService.getAll(isShowingAll ? undefined : genre),
    seriesService.getAll(),
  ])

  return (
    <main className="min-h-screen pb-16">
      <FeaturedBanner items={featuredSeries} />

      <div className="mt-8 space-y-8 px-5 md:px-8">
        <FavoritesRow allSeries={allSeries} />
        <Suspense>
          <CategoryTabs categories={CATEGORIES} />
        </Suspense>

        {isShowingAll ? (
          await Promise.all(
            GENRES.map(async (g, i) => (
              <GenreRow key={g} genre={g} series={await seriesService.getAll(g)} />
            )),
          )
        ) : (
          <>
            <GenreRow genre={genre ?? 'Results'} series={filteredSeries} showMoreButton={false} />
            {filteredSeries.length === 0 && (
              <EmptyState
                icon={
                  <svg
                    className="h-8 w-8 text-muted"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                }
                title="No series yet"
                description="New titles in this category are coming soon."
              />
            )}
          </>
        )}
      </div>
    </main>
  )
}
