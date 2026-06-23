'use client'

import { useScrollLock } from '@/hooks/useScrollLock'
import CloseButton from '@/components/ui/CloseButton'

type Props = {
  onClose: () => void
}

const POINT_ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
      </svg>
    ),
    label: 'Dedicated Support',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M12 1l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 1z" />
      </svg>
    ),
    label: 'VIP Perks',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
      </svg>
    ),
    label: 'Unlimited Viewing',
  },
]

export default function VipSuccessModal({ onClose }: Props) {
  useScrollLock()

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="anim-scale-in relative w-full max-w-sm rounded-3xl px-6 pt-16 pb-8"
        style={{
          background: 'linear-gradient(180deg, #2a1a00 0%, #1a1000 40%, #110d00 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute -top-14 left-1/2 flex -translate-x-1/2 flex-col items-center select-none">
          <div
            className="flex h-28 w-28 items-center justify-center rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(227,161,25,0.25) 0%, transparent 70%)',
              filter: 'drop-shadow(0 0 24px rgba(227,161,25,0.5))',
            }}
          >
            <span style={{ fontSize: 72, lineHeight: 1 }}>👑</span>
          </div>
        </div>

        <CloseButton
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 rounded-full"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        />

        <h2 className="mb-1 text-center text-xl font-black text-white">Congratulations!</h2>
        <p className="mb-5 text-center text-base font-semibold" style={{ color: '#e3a119' }}>
          You&apos;re now a VIP!
        </p>

        <div className="mb-6 flex items-center gap-2">
          <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <svg
            viewBox="0 0 12 16"
            className="h-3.5 w-2.5 flex-shrink-0"
            style={{ fill: '#e3a119' }}
          >
            <path d="M6 0l2 5h4l-3.3 2.4L10 13 6 10 2 13l1.3-5.6L0 5h4z" />
          </svg>
          <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
        </div>

        <div className="mb-7 grid grid-cols-3 gap-3">
          {POINT_ITEMS.map(({ icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2.5">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{
                  background: 'rgba(227,161,25,0.1)',
                  border: '1px solid rgba(227,161,25,0.2)',
                  color: '#e3a119',
                }}
              >
                {icon}
              </div>
              <span
                className="text-center text-[11px] leading-tight font-semibold"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full rounded-xl py-3.5 text-sm font-bold tracking-wide transition-all hover:brightness-110 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #e3a119 0%, #f5c842 50%, #e3a119 100%)',
            color: '#1a1000',
            boxShadow: '0 4px 20px rgba(227,161,25,0.4)',
          }}
        >
          Start Watching
        </button>
      </div>
    </div>
  )
}
