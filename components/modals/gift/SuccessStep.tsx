import type { Actor } from '@/data/gifts'
import type { GiftItem } from '@/services'

type Props = {
  selectedActor: Actor
  selectedGift: GiftItem
  attachedImage: string | null
  onSendAnother: () => void
  onClose: () => void
}

export default function SuccessStep({
  selectedActor,
  selectedGift,
  attachedImage,
  onSendAnother,
  onClose,
}: Props) {
  return (
    <div className="flex flex-col items-center gap-4 px-5 py-10 text-center">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full"
        style={{ background: 'rgba(0,157,105,0.15)', border: '1px solid rgba(0,157,105,0.4)' }}
      >
        <svg viewBox="0 0 24 24" fill="#009d69" className="h-8 w-8">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-white">Gift sent! 🍾</h3>
      <p
        className="max-w-[260px] text-sm leading-relaxed"
        style={{ color: 'rgba(255,255,255,0.5)' }}
      >
        Your <span className="font-semibold text-white">{selectedGift.name}</span>
        {attachedImage ? ' and your photo' : ''} is on its way to{' '}
        <span className="font-semibold text-white">{selectedActor.fullName}</span>. They&apos;ll see
        your message in their fan inbox.
      </p>
      <div className="mt-2 flex w-full gap-3">
        <button
          onClick={onSendAnother}
          className="flex-1 cursor-pointer rounded-xl py-3.5 text-sm font-semibold transition-colors hover:bg-white/10"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          Send another
        </button>
        <button
          onClick={onClose}
          className="flex-1 cursor-pointer rounded-xl py-3.5 text-sm font-bold text-white transition-all hover:brightness-110"
          style={{
            background: 'linear-gradient(90deg, #2b009f 0%, #4500ff 100%)',
            boxShadow: '0 4px 20px rgba(69,0,255,0.35)',
          }}
        >
          Done
        </button>
      </div>
    </div>
  )
}
