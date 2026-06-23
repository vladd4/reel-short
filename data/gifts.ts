export type Actor = { id: string; initials: string; name: string; fullName: string; avatarBg: string }
export type GiftItem = { id: string; name: string; emoji: string; cost: number; tier: string }
export type GiftCategory = { id: string; label: string; icon: string | null }
export type TierStyle = { bg: string; badge?: string; badgeColor: string }

export const GIFT_ACTORS: Actor[] = [
  { id: 'sb', initials: 'SB', name: 'Sailor', fullName: 'Sailor Bell', avatarBg: '#7a5c3a' },
  { id: 'ec', initials: 'EC', name: 'Ethan', fullName: 'Ethan Cole', avatarBg: '#2d3a5c' },
  { id: 'vh', initials: 'VH', name: 'Vivian', fullName: 'Vivian Hart', avatarBg: '#4a1a4a' },
  { id: 'mq', initials: 'MQ', name: 'Marcus', fullName: 'Marcus Quinn', avatarBg: '#1a3a2a' },
  { id: 'lp', initials: 'LP', name: 'Lena', fullName: 'Lena Park', avatarBg: '#3a3a1a' },
  { id: 'dw', initials: 'DW', name: 'Dorian', fullName: 'Dorian West', avatarBg: '#2a1a4a' },
]

export const GIFT_ITEMS: Record<string, GiftItem[]> = {
  popular: [
    { id: 'rose', name: 'Rose', emoji: '🌹', cost: 9, tier: 'popular' },
    { id: 'sunflower', name: 'Sunflower', emoji: '🌻', cost: 49, tier: 'popular' },
    { id: 'cupcake', name: 'Cupcake', emoji: '🧁', cost: 99, tier: 'popular' },
    { id: 'balloons', name: 'Balloons', emoji: '🎈', cost: 159, tier: 'popular' },
    { id: 'bouquet', name: 'Bouquet', emoji: '💐', cost: 199, tier: 'popular' },
    { id: 'teddy', name: 'Teddy Bear', emoji: '🧸', cost: 299, tier: 'popular' },
  ],
  love: [
    { id: 'locket', name: 'Heart Locket', emoji: '💌', cost: 49, tier: 'love' },
    { id: 'choco', name: 'Chocolates', emoji: '🍫', cost: 149, tier: 'love' },
    { id: 'candles', name: 'Candles', emoji: '🕯️', cost: 299, tier: 'love' },
    { id: 'cake', name: 'Love Cake', emoji: '🎂', cost: 499, tier: 'love' },
    { id: 'swan', name: 'Swan Pair', emoji: '🦢', cost: 799, tier: 'love' },
    { id: 'wedding', name: 'Wedding', emoji: '💒', cost: 1499, tier: 'love' },
  ],
  luxury: [
    { id: 'perfume', name: 'Perfume', emoji: '🧴', cost: 399, tier: 'luxury' },
    { id: 'champagne', name: 'Champagne', emoji: '🍾', cost: 599, tier: 'luxury' },
    { id: 'crown', name: 'Queen Crown', emoji: '👑', cost: 999, tier: 'luxury' },
    { id: 'ring', name: 'Diamond Ring', emoji: '💍', cost: 1999, tier: 'luxury' },
    { id: 'car', name: 'Sports Car', emoji: '🏎️', cost: 4999, tier: 'luxury' },
    { id: 'yacht', name: 'Luxury Yacht', emoji: '⛵', cost: 9999, tier: 'luxury' },
  ],
  legendary: [
    { id: 'rocket', name: 'Rocket', emoji: '🚀', cost: 9999, tier: 'legendary' },
    { id: 'castle', name: 'Castle', emoji: '🏰', cost: 19999, tier: 'legendary' },
    { id: 'island', name: 'Private Island', emoji: '🏝️', cost: 49999, tier: 'legendary' },
    { id: 'dragon', name: 'Dragon', emoji: '🐉', cost: 99999, tier: 'legendary' },
    { id: 'starship', name: 'Starship', emoji: '🛸', cost: 199999, tier: 'legendary' },
    { id: 'galaxy', name: 'Galaxy', emoji: '🌌', cost: 499999, tier: 'legendary' },
  ],
}

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
