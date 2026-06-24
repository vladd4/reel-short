'use client'

import { useScrollLock } from '@/hooks/useScrollLock'
import CloseButton from '@/components/ui/CloseButton'

type Props = {
  onClose: () => void
}

const PERKS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
      </svg>
    ),
    label: 'Priority Support',
    desc: '24/7 dedicated help',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
      </svg>
    ),
    label: 'Unlimited Access',
    desc: 'Every episode, any time',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 1l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 1z" />
      </svg>
    ),
    label: 'Exclusive Perks',
    desc: 'Early drops & bonuses',
  },
]

export default function VipSuccessModal({ onClose }: Props) {
  useScrollLock()

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-5"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="anim-scale-in relative w-full max-w-sm overflow-hidden rounded-3xl"
        style={{
          background: '#0c0a00',
          border: '1px solid rgba(227,161,25,0.2)',
          boxShadow: '0 0 0 1px rgba(227,161,25,0.08), 0 40px 100px rgba(0,0,0,0.8)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="pointer-events-none absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(227,161,25,0.18) 0%, transparent 70%)',
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(69,0,255,0.12) 0%, transparent 70%)' }}
        />

        <CloseButton
          onClick={onClose}
          className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full"
          style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.06)' }}
        />

        <div className="relative flex flex-col items-center px-6 pt-10 pb-6">
          <div
            className="mb-4 flex h-20 w-20 items-center justify-center rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(227,161,25,0.15) 0%, transparent 70%)',
              border: '1.5px solid rgba(227,161,25,0.25)',
              boxShadow: '0 0 40px rgba(227,161,25,0.2)',
            }}
          >
            <span
              style={{
                fontSize: 44,
                lineHeight: 1,
                filter: 'drop-shadow(0 0 12px rgba(227,161,25,0.6))',
              }}
            >
              👑
            </span>
          </div>

          <p
            className="mb-1 text-[10px] font-bold tracking-[0.2em] uppercase"
            style={{ color: 'rgba(227,161,25,0.7)' }}
          >
            Welcome to
          </p>
          <h2
            className="mb-2 text-3xl font-black tracking-tight text-white"
            style={{ letterSpacing: '-0.02em' }}
          >
            VIP Club
          </h2>
          <p
            className="text-center text-sm leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            Your subscription is now active.
            <br />
            Enjoy unlimited access to everything.
          </p>
        </div>

        <div className="flex items-center gap-3 px-6">
          <div
            className="h-px flex-1"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(227,161,25,0.25))' }}
          />
          <svg
            viewBox="0 0 20 20"
            className="h-3 w-3 flex-shrink-0"
            fill="#e3a119"
            style={{ opacity: 0.6 }}
          >
            <path d="M10 0l2.4 7.3H20l-6.2 4.5 2.4 7.2L10 14.6l-6.2 4.4 2.4-7.2L0 7.3h7.6z" />
          </svg>
          <div
            className="h-px flex-1"
            style={{ background: 'linear-gradient(90deg, rgba(227,161,25,0.25), transparent)' }}
          />
        </div>

        <div className="space-y-2.5 px-6 py-5">
          {PERKS.map(({ icon, label, desc }) => (
            <div
              key={label}
              className="flex items-center gap-4 rounded-2xl px-4 py-3.5"
              style={{
                background: 'rgba(227,161,25,0.05)',
                border: '1px solid rgba(227,161,25,0.1)',
              }}
            >
              <div
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: 'rgba(227,161,25,0.12)',
                  color: '#e3a119',
                }}
              >
                {icon}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{label}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {desc}
                </p>
              </div>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-auto h-4 w-4 flex-shrink-0"
                style={{ color: 'rgba(227,161,25,0.5)' }}
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            </div>
          ))}
        </div>

        <div className="px-6 pb-7">
          <button
            onClick={onClose}
            className="w-full rounded-xl py-4 text-sm font-black tracking-wide transition-all hover:brightness-110 active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #c8870e 0%, #f5c842 45%, #d4950f 100%)',
              color: '#0c0800',
              boxShadow: '0 8px 32px rgba(227,161,25,0.35)',
              letterSpacing: '0.04em',
              cursor: 'pointer',
            }}
          >
            START WATCHING
          </button>
        </div>
      </div>
    </div>
  )
}
