import { slugify } from '@/lib/utils'

export const ROUTES = {
  home: '/',
  profile: '/profile',
  series: (id: string, title: string) => `/series/${id}-${slugify(title)}`,
  watch: (seriesId: string, title: string, ep: number) => `/watch/${seriesId}-${slugify(title)}/${ep}`,
}
