import { type ChangeEvent, useRef } from 'react'
import type { Actor, GiftItem } from '@/data/gifts'

type Props = {
  selectedActor: Actor
  selectedGift: GiftItem
  message: string
  attachedImage: string | null
  onMessageChange: (msg: string) => void
  onAttachImage: (url: string) => void
  onRemoveImage: () => void
  onBack: () => void
  onContinue: () => void
}

export default function MessageStep({
  selectedActor,
  selectedGift,
  message,
  attachedImage,
  onMessageChange,
  onAttachImage,
  onRemoveImage,
  onBack,
  onContinue,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) onAttachImage(URL.createObjectURL(file))
  }

  return (
    <div className="space-y-4 px-5 pb-6">
      <div
        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium"
        style={{
          background: 'rgba(227,161,25,0.08)',
          border: '1px solid rgba(227,161,25,0.2)',
          color: '#e3a119',
        }}
      >
        <span className="text-xl">{selectedGift.emoji}</span>
        <span style={{ color: 'rgba(255,255,255,0.7)' }}>
          Sending <span className="font-bold text-white">{selectedGift.name}</span> to{' '}
          <span className="font-bold text-white">{selectedActor.fullName}</span>
        </span>
      </div>

      <div>
        <label
          className="mb-2 block text-sm font-semibold"
          style={{ color: 'rgba(255,255,255,0.8)' }}
        >
          Your message
        </label>
        <textarea
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          maxLength={200}
          rows={4}
          placeholder="Write something heartfelt..."
          className="w-full resize-none rounded-xl px-4 py-3 text-sm outline-none placeholder:text-white/20"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.85)',
          }}
        />
        <p className="mt-1 text-right text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
          {message.length}/200
        </p>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.8)' }}>
          Attach a photo or video{' '}
          <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>(optional)</span>
        </p>
        {attachedImage ? (
          <div className="relative overflow-hidden rounded-xl">
            <img src={attachedImage} alt="attached" className="w-full object-contain" />
            <button
              onClick={onRemoveImage}
              className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileRef.current?.click()}
            className="flex w-full cursor-pointer flex-col items-center gap-2 rounded-xl py-8 text-sm transition-all hover:border-white/20"
            style={{ border: '2px dashed rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.25)' }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-8 w-8"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Tap to attach
          </button>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <div className="flex gap-3 pt-1">
        <button
          onClick={onBack}
          className="flex-1 cursor-pointer rounded-xl py-3.5 text-sm font-semibold transition-colors hover:bg-white/10"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          Back
        </button>
        <button
          onClick={onContinue}
          className="flex-[2] cursor-pointer rounded-xl py-3.5 text-sm font-bold text-white transition-all hover:brightness-110"
          style={{
            background: 'linear-gradient(90deg, #2b009f 0%, #4500ff 100%)',
            boxShadow: '0 4px 20px rgba(69,0,255,0.4)',
          }}
        >
          Preview gift
        </button>
      </div>
    </div>
  )
}
