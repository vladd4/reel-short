export type GiftItem = {
  id: string
  code: string
  name: string
  emoji: string
  cost: number
  tier: string
}

export type Actor = {
  id: string
  initials: string
  name: string
  fullName: string
  avatarBg: string
}
export type GiftCategory = {
  id: string
  label: string
  icon: string | null
}
export type TierStyle = {
  bg: string
  badge?: string
  badgeColor: string
}
