import { Suspense } from 'react'
import type { Metadata } from 'next'
import { seriesService } from '@/services'
import CategoryTabs from '@/components/series/CategoryTabs'
import FavoritesRow from '@/components/series/FavoritesRow'
import FeaturedBanner from '@/components/series/FeaturedBanner'
import GenreRow from '@/components/series/GenreRow'
import MyMuseBanner from '@/components/series/MyMuseBanner'
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
  const isShowingAll = !genre || genre.toLowerCase() === 'all'

  const [allSeries, genres] = await Promise.all([
    seriesService.getAll().catch(() => [] as Awaited<ReturnType<typeof seriesService.getAll>>),
    seriesService.getGenres().catch((): string[] => []),
  ])

  const featuredSeries = allSeries.slice(0, 5)
  const filteredSeries = isShowingAll
    ? allSeries
    : allSeries.filter(
        (s) =>
          s.genres?.some((g) => g.toLowerCase() === genre?.toLowerCase()) ||
          s.genre.toLowerCase() === genre?.toLowerCase(),
      )

  const visibleGenres = genres.slice(0, 7)
  const categories = ['All', ...visibleGenres]

  return (
    <main className="min-h-screen pb-16">
      <FeaturedBanner items={featuredSeries} />

      <div className="mt-8 space-y-8 px-5 md:px-8">
        <FavoritesRow allSeries={allSeries} />

        <Suspense>
          <CategoryTabs categories={categories} />
        </Suspense>

        {isShowingAll ? (
          visibleGenres.map((g) => {
            const genreSeries = allSeries.filter((s) => (s.genres?.[0] ?? s.genre) === g)
            return <GenreRow key={g} genre={g} series={genreSeries} />
          })
        ) : (
          <>
            <GenreRow
              genre={genres.find((g) => g.toLowerCase() === genre?.toLowerCase()) ?? genre ?? 'Results'}
              series={filteredSeries}
              showMoreButton={false}
            />
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

        <MyMuseBanner />
      </div>
    </main>
  )
}
