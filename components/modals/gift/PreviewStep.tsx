import type { Actor, GiftItem } from '@/data/gifts'
import CoinIcon from '@/components/ui/CoinIcon'

type Props = {
  selectedActor: Actor
  selectedGift: GiftItem
  message: string
  attachedImage: string | null
  canAfford: boolean
  onSend: () => void
  onBack: () => void
}

export default function PreviewStep({
  selectedActor,
  selectedGift,
  message,
  attachedImage,
  canAfford,
  onSend,
  onBack,
}: Props) {
  return (
    <div className="space-y-4 px-5 pb-6">
      <div
        className="overflow-hidden rounded-2xl"
        style={{ background: '#06001a', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <p
          className="pt-4 pb-1 text-center text-[10px] tracking-widest uppercase"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          PREVIEW · how {selectedActor.fullName} will see it
        </p>
        <div className="flex flex-col items-center gap-2 px-4 pb-5">
          <span className="mt-2 text-5xl leading-none">{selectedGift.emoji}</span>
          <p className="mt-1 text-lg font-bold text-white">{selectedGift.name}</p>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
            from You
          </p>
          {message && (
            <div
              className="mt-2 w-full rounded-xl px-4 py-3 text-sm"
              style={{
                background: 'rgba(255,255,255,0.07)',
                color: 'rgba(255,255,255,0.8)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {message}
            </div>
          )}
          {attachedImage && (
            <div className="mt-2 w-full overflow-hidden rounded-xl">
              <img src={attachedImage} alt="attached" className="w-full object-contain" />
            </div>
          )}
        </div>
      </div>

      <div
        className="flex items-center justify-between px-1 text-sm"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 14 }}
      >
        <span style={{ color: 'rgba(255,255,255,0.45)' }}>Total</span>
        <span className="flex items-center gap-1.5 font-bold" style={{ color: '#e3a119' }}>
          <CoinIcon /> {selectedGift.cost.toLocaleString()}
        </span>
      </div>

      {!canAfford && (
        <p className="text-center text-xs font-medium" style={{ color: '#d60000' }}>
          Not enough coins — top up to send this gift.
        </p>
      )}

      <button
        onClick={onSend}
        disabled={!canAfford}
        className="w-full rounded-xl py-4 text-sm font-bold transition-all"
        style={{
          background: canAfford
            ? 'linear-gradient(90deg, #2b009f 0%, #4500ff 100%)'
            : 'rgba(255,255,255,0.07)',
          color: canAfford ? '#fff' : 'rgba(255,255,255,0.25)',
          cursor: canAfford ? 'pointer' : 'default',
          boxShadow: canAfford ? '0 4px 20px rgba(69,0,255,0.4)' : 'none',
        }}
      >
        Send gift to {selectedActor.name}
      </button>
      <button
        onClick={onBack}
        className="w-full cursor-pointer pb-1 text-center text-sm transition-colors hover:text-white/60"
        style={{ color: 'rgba(255,255,255,0.3)' }}
      >
        Back to message
      </button>
    </div>
  )
}
