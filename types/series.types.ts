export type Episode = {
  number: number
  title: string
  duration: string
  videoUrl: string
  free: boolean
}

export type CastMember = {
  character: string
  actor: string
  role: string
}

export type Series = {
  id: string
  title: string
  genre: string
  subGenre: string
  description: string
  longDescription: string
  rating: number
  totalEpisodes: number
  freeEpisodes: number
  views: string
  likes: string
  year: number
  tags: string[]
  gradient: string
  accentColor: string
  coverImage?: string
  bannerImage?: string
  featured: boolean
  episodes: Episode[]
  genres?: string[]
  cast?: CastMember[]
  tone?: string
  comparableTo?: string[]
  watchUrl?: string
}
