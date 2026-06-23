export const ROUTES = {
  home: '/',
  profile: '/profile',
  series: (id: string) => `/series/${id}`,
  watch: (seriesId: string, ep: number) => `/watch/${seriesId}/${ep}`,
} as const
