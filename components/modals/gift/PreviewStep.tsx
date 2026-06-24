import type { Actor } from '@/data/gifts'
import type { GiftItem } from '@/services'
import CoinIcon from '@/components/ui/CoinIcon'

type Props = {
  selectedActor: Actor
  selectedGift: GiftItem
  message: string
  attachedImage: string | null
  canAfford: boolean
  isSending: boolean
  onSend: () => void
  onBack: () => void
}

export default function PreviewStep({
  selectedActor,
  selectedGift,
  message,
  attachedImage,
  canAfford,
  isSending,
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
        disabled={!canAfford || isSending}
        className="w-full rounded-xl py-4 text-sm font-bold transition-all"
        style={{
          background: canAfford
            ? 'linear-gradient(90deg, #2b009f 0%, #4500ff 100%)'
            : 'rgba(255,255,255,0.07)',
          color: canAfford ? '#fff' : 'rgba(255,255,255,0.25)',
          cursor: canAfford && !isSending ? 'pointer' : 'default',
          boxShadow: canAfford ? '0 4px 20px rgba(69,0,255,0.4)' : 'none',
          opacity: isSending ? 0.7 : 1,
        }}
      >
        {isSending ? 'Sending…' : `Send gift to ${selectedActor.name}`}
      </button>
      <button
        onClick={onBack}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all hover:brightness-110 active:scale-95"
        style={{
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: 'rgba(255,255,255,0.75)',
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Message
      </button>
    </div>
  )
}
