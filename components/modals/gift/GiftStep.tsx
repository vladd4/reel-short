import type { Actor, GiftItem } from '@/data/gifts'
import { GIFT_ACTORS, GIFT_CATEGORIES, GIFT_ITEMS, GIFT_TIER_STYLES } from '@/data/gifts'
import CoinIcon from '@/components/ui/CoinIcon'

type Props = {
  selectedActor: Actor
  selectedGift: GiftItem | null
  category: string
  onActorSelect: (actor: Actor) => void
  onCategorySelect: (id: string) => void
  onGiftSelect: (gift: GiftItem) => void
  onContinue: () => void
}

export default function GiftStep({
  selectedActor,
  selectedGift,
  category,
  onActorSelect,
  onCategorySelect,
  onGiftSelect,
  onContinue,
}: Props) {
  return (
    <div className="px-5 pb-6">
      <p
        className="mb-4 text-[10px] font-bold tracking-widest"
        style={{ color: 'rgba(255,255,255,0.35)' }}
      >
        TO
      </p>
      <div className="scrollbar-hide mb-4 flex gap-5 overflow-x-auto px-1 py-1">
        {GIFT_ACTORS.map((actor) => (
          <button
            key={actor.id}
            onClick={() => onActorSelect(actor)}
            className="flex flex-shrink-0 cursor-pointer flex-col items-center gap-2"
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full text-base font-bold text-white"
              style={{
                background: actor.avatarBg,
                boxShadow:
                  selectedActor.id === actor.id
                    ? '0 0 0 3px #4500ff, 0 0 0 5px rgba(69,0,255,0.25)'
                    : 'none',
              }}
            >
              {actor.initials}
            </div>
            <span
              className="text-xs font-medium"
              style={{
                color: selectedActor.id === actor.id ? '#a89fff' : 'rgba(255,255,255,0.45)',
              }}
            >
              {actor.name}
            </span>
          </button>
        ))}
      </div>

      <div className="scrollbar-hide mb-4 flex gap-2 overflow-x-auto">
        {GIFT_CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => onCategorySelect(c.id)}
            className="flex flex-shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all"
            style={{
              background: category === c.id ? 'rgba(69,0,255,0.25)' : 'rgba(255,255,255,0.05)',
              color: category === c.id ? '#a89fff' : 'rgba(255,255,255,0.5)',
              border: `1px solid ${category === c.id ? 'rgba(69,0,255,0.45)' : 'rgba(255,255,255,0.08)'}`,
            }}
          >
            {c.icon && <span>{c.icon}</span>}
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {GIFT_ITEMS[category].map((gift) => {
          const tierStyle = GIFT_TIER_STYLES[gift.tier]
          const isSelected = selectedGift?.id === gift.id
          return (
            <button
              key={gift.id}
              onClick={() => onGiftSelect(gift)}
              className="relative flex cursor-pointer flex-col items-center gap-1.5 rounded-2xl p-3 transition-all"
              style={{
                background: tierStyle.bg,
                border: `1px solid ${isSelected ? '#4500ff' : 'rgba(255,255,255,0.07)'}`,
                boxShadow: isSelected ? '0 0 0 1px #4500ff' : 'none',
              }}
            >
              {tierStyle.badge && (
                <span
                  className="absolute top-1.5 right-1.5 rounded px-1 py-0.5 text-[7px] font-bold"
                  style={{
                    background: tierStyle.badgeColor + '22',
                    color: tierStyle.badgeColor,
                    border: `1px solid ${tierStyle.badgeColor}44`,
                  }}
                >
                  {tierStyle.badge}
                </span>
              )}
              <span className="mt-1 text-3xl leading-none">{gift.emoji}</span>
              <p
                className="text-center text-xs leading-tight font-semibold"
                style={{ color: 'rgba(255,255,255,0.85)' }}
              >
                {gift.name}
              </p>
              <p className="flex items-center gap-1 text-xs font-bold" style={{ color: '#e3a119' }}>
                <CoinIcon size={12} /> {gift.cost.toLocaleString()}
              </p>
            </button>
          )
        })}
      </div>

      <button
        onClick={() => selectedGift && onContinue()}
        disabled={!selectedGift}
        className="mt-5 w-full rounded-xl py-3.5 text-sm font-bold transition-all"
        style={{
          background: selectedGift
            ? 'linear-gradient(90deg, #2b009f 0%, #4500ff 100%)'
            : 'rgba(255,255,255,0.07)',
          color: selectedGift ? '#fff' : 'rgba(255,255,255,0.25)',
          cursor: selectedGift ? 'pointer' : 'default',
          boxShadow: selectedGift ? '0 4px 20px rgba(69,0,255,0.4)' : 'none',
        }}
      >
        Continue
      </button>
    </div>
  )
}
