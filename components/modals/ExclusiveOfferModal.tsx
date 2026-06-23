'use client'

import { EXCLUSIVE_OFFER_COINS, EXCLUSIVE_OFFER_PRICE } from '@/constants'
import { useStore } from '@/lib/store'
import { useScrollLock } from '@/hooks/useScrollLock'
import CloseButton from '@/components/ui/CloseButton'
import CoinIcon from '@/components/ui/CoinIcon'

type Props = { onClose: () => void }

const baseCoins = Math.round(EXCLUSIVE_OFFER_COINS / 1.1)
const bonusCoins = EXCLUSIVE_OFFER_COINS - baseCoins

export default function ExclusiveOfferModal({ onClose }: Props) {
  useScrollLock()

  const { addCoins } = useStore()

  function handleClaim() {
    addCoins(EXCLUSIVE_OFFER_COINS)
    onClose()
  }

  return (
    <div
      className="anim-fade-in fixed inset-0 z-[150] flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="anim-scale-in relative w-full max-w-md overflow-hidden rounded-3xl"
        style={{ background: '#0a0a0d', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <CloseButton
          onClick={onClose}
          className="absolute top-4 right-4 z-20 h-8 w-8 rounded-full"
          style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
        />

        <div
          className="relative flex flex-col items-center justify-center overflow-hidden pt-10 pb-8"
          style={{ background: 'linear-gradient(180deg, #1c1400 0%, #0f0c00 60%, #0a0a0d 100%)' }}
        >
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div
              className="h-56 w-56 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(227,161,25,0.18) 0%, transparent 70%)',
              }}
            />
          </div>

          <div
            className="relative z-10 mb-5 flex items-center gap-1.5 rounded-full px-3 py-1"
            style={{
              background: 'rgba(227,161,25,0.12)',
              border: '1px solid rgba(227,161,25,0.3)',
            }}
          >
            <svg viewBox="0 0 24 24" fill="#e3a119" className="h-3 w-3">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: '#e3a119' }}
            >
              Exclusive Offer
            </span>
          </div>

          <div className="relative z-10 text-center">
            <div className="mb-1 flex items-center justify-center gap-2">
              <CoinIcon
                size={64}
                style={{ filter: 'drop-shadow(0 0 24px rgba(227,161,25,0.6))' }}
              />
            </div>
            <p className="mt-2 text-6xl font-black text-white" style={{ letterSpacing: '-2px' }}>
              {EXCLUSIVE_OFFER_COINS}
            </p>
            <p className="mt-1 text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.6)' }}>
              coins total
            </p>
          </div>
        </div>

        <div
          className="space-y-2 px-6 py-5"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div
            className="flex items-center justify-between rounded-xl px-4 py-2.5"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Base coins
            </span>
            <div className="flex items-center gap-1.5">
              <CoinIcon size={14} />
              <span className="text-sm font-bold text-white">{baseCoins}</span>
            </div>
          </div>
          <div
            className="flex items-center justify-between rounded-xl px-4 py-2.5"
            style={{ background: 'rgba(0,157,105,0.08)', border: '1px solid rgba(0,157,105,0.15)' }}
          >
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="#009d69" className="h-3.5 w-3.5">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              <span className="text-sm font-medium" style={{ color: '#009d69' }}>
                Bonus reward (+10%)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <CoinIcon size={14} />
              <span className="text-sm font-bold" style={{ color: '#009d69' }}>
                +{bonusCoins}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between px-1 pt-3 pb-1">
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              1,200+ claimed today
            </span>
            <span className="text-2xl font-black text-white">{EXCLUSIVE_OFFER_PRICE}</span>
          </div>

          <button
            onClick={handleClaim}
            className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-bold transition-all hover:brightness-110 active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #e3a119 0%, #f5c842 50%, #e3a119 100%)',
              boxShadow: '0 4px 24px rgba(227,161,25,0.35)',
              color: '#1a1000',
            }}
          >
            <CoinIcon size={18} color="#c0c0c0" />
            Claim {EXCLUSIVE_OFFER_COINS} Coins
          </button>

          <p className="pb-1 text-center text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
            One-time purchase · No subscription required
          </p>
        </div>
      </div>
    </div>
  )
}
