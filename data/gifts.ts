import type { Actor, GiftCategory, TierStyle } from '@/types/gift.types'

export type { Actor } from '@/types/gift.types'

export const GIFT_ACTORS: Actor[] = [
  { id: 'sb', initials: 'SB', name: 'Sailor', fullName: 'Sailor Bell', avatarBg: '#7a5c3a' },
  { id: 'ec', initials: 'EC', name: 'Ethan', fullName: 'Ethan Cole', avatarBg: '#2d3a5c' },
  { id: 'vh', initials: 'VH', name: 'Vivian', fullName: 'Vivian Hart', avatarBg: '#4a1a4a' },
  { id: 'mq', initials: 'MQ', name: 'Marcus', fullName: 'Marcus Quinn', avatarBg: '#1a3a2a' },
  { id: 'lp', initials: 'LP', name: 'Lena', fullName: 'Lena Park', avatarBg: '#3a3a1a' },
  { id: 'dw', initials: 'DW', name: 'Dorian', fullName: 'Dorian West', avatarBg: '#2a1a4a' },
]

export const GIFT_CATEGORIES: GiftCategory[] = [
  { id: 'popular', label: 'Popular', icon: null },
  { id: 'love', label: 'Love', icon: '♥' },
  { id: 'luxury', label: 'Luxury', icon: '✦' },
  { id: 'legendary', label: 'Legendary', icon: '★' },
]

export const GIFT_TIER_STYLES: Record<string, TierStyle> = {
  popular: { bg: 'rgba(255,255,255,0.04)', badgeColor: '' },
  love: { bg: 'rgba(212,0,50,0.1)', badge: 'LOVE', badgeColor: '#f43f5e' },
  luxury: { bg: 'rgba(227,161,25,0.1)', badge: 'LUXURY', badgeColor: '#e3a119' },
  legendary: { bg: 'rgba(69,0,255,0.12)', badge: 'LEGENDARY', badgeColor: '#a89fff' },
}
