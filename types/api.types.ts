export type ApiResponse<T> = {
  data: T
  error?: string
}

export type ApiGift = {
  id: number
  code: string
  name: string
  emoji: string
  priceCredits: number
  category: string
}

export type PaginatedResponse<T> = {
  data: T[]
  total: number
  page: number
}

export type ApiGenre = {
  id: number
  name: string
}

type ApiSeriesMetadata = {
  tone?: string
  tropes?: string[]
  watchUrl?: string
  fandomUrl?: string
  comparableTo?: string[]
  publishedDate?: string
} | null

export type ApiSeriesItem = {
  id: number
  title: string
  description: string
  previewUrl: string | null
  bannerUrl: string | null
  genres: ApiGenre[]
  freeEpisodes: number
  total_episodes: number
  likes: number
  views: number
  metadata: ApiSeriesMetadata
  createdAt: string
}

export type ApiEpisode = {
  id: number
  seriesId: number
  episodeNumber: number
  title: string
  description?: string
  videoUrl: string | null
  previewUrl: string | null
  duration: number
  isFree: boolean
  access?: string
  locked?: boolean
  priceCredits?: number
  createdAt: string
}

export type ApiSeriesDetail = ApiSeriesItem & {
  episodes?: ApiEpisode[]
  casts?: unknown[]
}

export type ApiFavouriteSeries = ApiSeriesItem

export type ApiFavourite = {
  id: number
  userId: number
  seriesId: number
  createdAt: string
  series: ApiFavouriteSeries
}

export type ApiActor = {
  id: number
  name: string
  characters: { character: string; role: string }[]
}

export type ApiSubtitleTrack = {
  id: number
  episodeId: number
  language: string
}
