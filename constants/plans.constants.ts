export const SUBSCRIPTION_PLANS = [
  {
    id: 'weekly',
    label: 'Weekly VIP',
    salePrice: '$5.99',
    fullPrice: '$18.99',
    originalPrice: '$6.27',
    fullPriceLabel: '18.99',
    discount: '67%',
    renewal: 'Cancel anytime, then auto-renews $18.99 every 1 week',
  },
  {
    id: 'yearly',
    label: 'Yearly VIP',
    salePrice: '$99.99',
    fullPrice: '$299.99',
    originalPrice: '$99.99',
    fullPriceLabel: '299.99',
    discount: '67%',
    renewal: 'Cancel anytime, then auto-renews $299 every 1 year',
  },
] as const
