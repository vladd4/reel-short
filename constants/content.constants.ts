export const GENRES = ['Romance', 'Thriller', 'Fantasy', 'Drama'] as const

export type Genre = (typeof GENRES)[number]

export const CATEGORIES = ['All', ...GENRES] as const
