const LIKED_KEY = 'liked-series'

export function getLikedIds(): string[] {
  try {
    return JSON.parse(localStorage.getItem(LIKED_KEY) ?? '[]')
  } catch {
    return []
  }
}

export function saveLikedIds(ids: string[]): void {
  localStorage.setItem(LIKED_KEY, JSON.stringify(ids))
}
