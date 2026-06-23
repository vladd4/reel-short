export const EPISODE_COST = 5
export const STORAGE_KEY = 'nd-v1'

export const EXCLUSIVE_OFFER_COINS = 550
export const EXCLUSIVE_OFFER_PRICE = '$4.99'

export const COIN_PACKS = [
  { total: 1150, immediate: 1000, free: 150, bonus: '+15%', price: '$9.99' },
  { total: 550, immediate: 500, free: 50, bonus: '+10%', price: '$4.99' },
  { total: 100, immediate: 100, free: 0, bonus: null, price: '$0.99' },
  { total: 3000, immediate: 2000, free: 1000, bonus: '+50%', price: '$19.99' },
  { total: 5250, immediate: 3000, free: 2250, bonus: '+75%', price: '$29.99' },
  { total: 10000, immediate: 5000, free: 5000, bonus: '+100%', price: '$49.99' },
] as const

export const CREDITS_PACKAGES = [
  { coins: 30, price: '$0.99', label: 'Starter', bonus: '', highlight: false },
  { coins: 100, price: '$2.99', label: 'Popular', bonus: '+10 bonus', highlight: true },
  { coins: 250, price: '$5.99', label: 'Value', bonus: '+50 bonus', highlight: false },
  { coins: 600, price: '$9.99', label: 'Mega', bonus: '+150 bonus', highlight: false },
] as const
