import { EPISODE_COST } from '@/constants'

const items = [
  { icon: '▶', text: `Unlock individual episodes (${EPISODE_COST} coins each)` },
  { icon: '◈', text: 'Send gifts to your favourite actors' },
  { icon: '★', text: 'Bonus coins on every top-up pack' },
]

export default function HowCoinsWork() {
  return (
    <div
      className="space-y-2 rounded-2xl p-5"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <p
        className="mb-3 text-xs font-semibold tracking-widest uppercase"
        style={{ color: 'rgba(255,255,255,0.35)' }}
      >
        How Coins Work
      </p>
      {items.map(({ icon, text }) => (
        <div key={text} className="flex items-start gap-3">
          <span className="mt-0.5 text-sm text-gold">{icon}</span>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {text}
          </p>
        </div>
      ))}
    </div>
  )
}
