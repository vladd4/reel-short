import type { Episode, Series } from '@/types'
import rawData from './my_drama_series.json'

// ─── helpers ─────────────────────────────────────────────────────────────────

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function formatViews(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`
  return String(n)
}

function deriveRating(likes: number, views: number): number {
  const ratio = likes / views
  // like-rate range ~2 % → 4.0, ~8 % → 5.0
  const raw = 4.0 + (ratio - 0.02) / 0.06
  return Math.round(Math.min(5.0, Math.max(4.0, raw)) * 10) / 10
}

function mapGenre(genres: string[]): string {
  for (const g of genres) {
    const l = g.toLowerCase()
    if (
      l.includes('thriller') ||
      l.includes('crime') ||
      l.includes('suspense') ||
      l.includes('mystery')
    )
      return 'Thriller'
    if (
      l.includes('fantasy') ||
      l.includes('supernatural') ||
      l.includes('vampire') ||
      l.includes('werewolf') ||
      l.includes('paranormal') ||
      l.includes('folklore') ||
      l.includes('gothic') ||
      l.includes('shifter') ||
      l.includes('demon')
    )
      return 'Fantasy'
    if (
      l.includes('romance') ||
      l.includes('sapphic') ||
      l.includes('lgbtq') ||
      l.includes('erotic') ||
      l.includes('royal') ||
      l.includes('mafia')
    )
      return 'Romance'
  }
  return 'Drama'
}

const GENRE_STYLE: Record<string, { gradient: string; accentColor: string }> = {
  Romance: { gradient: 'from-rose-900 via-purple-900 to-indigo-950', accentColor: '#f43f5e' },
  Thriller: { gradient: 'from-slate-900 via-teal-950 to-cyan-950', accentColor: '#14b8a6' },
  Fantasy: { gradient: 'from-amber-900 via-orange-900 to-red-950', accentColor: '#f59e0b' },
  Drama: { gradient: 'from-blue-950 via-indigo-900 to-slate-900', accentColor: '#6366f1' },
}

const EPISODE_TITLES = [
  'The Beginning',
  'First Encounter',
  'Unexpected Feelings',
  'Hidden Truths',
  'Breaking Point',
  'Dangerous Territory',
  'No Turning Back',
  'Secrets Revealed',
  'The Confrontation',
  'Point of No Return',
]

const DURATIONS = ['5:30', '6:45', '7:12', '8:03', '5:58', '6:22', '7:45', '5:15', '8:30', '6:09']

const VIDEOS = ['/video-1.mp4', '/video-2.mp4', '/video-3.mp4', '/video-4.mp4']

function makeEpisodes(count: number, freeCount: number): Episode[] {
  return Array.from({ length: count }, (_, i) => ({
    number: i + 1,
    title: i < EPISODE_TITLES.length ? EPISODE_TITLES[i] : `Episode ${i + 1}`,
    duration: DURATIONS[i % DURATIONS.length],
    videoUrl: VIDEOS[i % VIDEOS.length],
    free: i < freeCount,
  }))
}

// ─── top 3 by views → featured ───────────────────────────────────────────────

const topByViews = new Set(
  [...rawData]
    .sort((a, b) => b.stats.views - a.stats.views)
    .slice(0, 3)
    .map((s) => s.id),
)

// ─── mapper ──────────────────────────────────────────────────────────────────

function mapRaw(raw: (typeof rawData)[number]): Series {
  const genre = mapGenre(raw.genres)
  const style = GENRE_STYLE[genre]
  const totalEpisodes = 30
  const freeEpisodes = 3

  return {
    id: slugify(raw.title),
    title: raw.title,
    genre,
    subGenre: raw.genres[1] ?? raw.genres[0],
    description:
      raw.plot_summary.length > 180 ? raw.plot_summary.slice(0, 177) + '…' : raw.plot_summary,
    longDescription: raw.plot_summary,
    rating: deriveRating(raw.stats.likes, raw.stats.views),
    totalEpisodes,
    freeEpisodes,
    views: formatViews(raw.stats.views),
    likes: formatViews(raw.stats.likes),
    year: new Date(raw.published_date).getFullYear(),
    tags: raw.tropes.slice(0, 5),
    gradient: style.gradient,
    accentColor: style.accentColor,
    coverImage: raw.thumbnail_url,
    bannerImage: raw.thumbnail_url,
    featured: topByViews.has(raw.id),
    episodes: makeEpisodes(totalEpisodes, freeEpisodes),
    genres: raw.genres,
    cast: raw.cast.filter((m) => m.actor !== 'N/A'),
    tone: raw.tone,
    comparableTo: raw.comparable_to.length > 0 ? raw.comparable_to : undefined,
    watchUrl: raw.watch_url,
  }
}

// ─── exports ─────────────────────────────────────────────────────────────────

export const ALL_SERIES: Series[] = rawData.map(mapRaw)

export const FEATURED = ALL_SERIES.filter((s) => s.featured)

export const CATEGORIES = ['All', 'Romance', 'Thriller', 'Fantasy', 'Drama'] as const

export function getSeriesById(id: string): Series | undefined {
  return ALL_SERIES.find((s) => s.id === id)
}

export function getSeriesByGenre(genre: string): Series[] {
  if (!genre || genre === 'All') return ALL_SERIES
  return ALL_SERIES.filter((s) => s.genre === genre)
}
