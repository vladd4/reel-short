'use client'

import { CREDITS_PACKAGES } from '@/constants'
import { useStore } from '@/lib/store'
import { useScrollLock } from '@/hooks/useScrollLock'
import CloseButton from '@/components/ui/CloseButton'
import CoinIcon from '@/components/ui/CoinIcon'

type Package = (typeof CREDITS_PACKAGES)[number]

type Props = { onClose: () => void }

export default function CreditsModal({ onClose }: Props) {
  useScrollLock()

  const { coins, isSubscribed, addCoins, subscribe } = useStore()

  function handleBuy(pkg: Package) {
    addCoins(pkg.coins)
    onClose()
  }

  return (
    <div
      className="anim-fade-in fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="anim-scale-in w-full max-w-sm overflow-hidden rounded-2xl"
        style={{ background: '#0c002b', border: '1px solid rgba(255,255,255,0.15)' }}
      >
        <div
          className="flex items-start justify-between px-6 pt-6 pb-5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div>
            <h2 className="text-lg font-bold">Credits</h2>
            <p className="mt-0.5 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Unlock episodes &amp; premium content
            </p>
          </div>
          <CloseButton
            onClick={onClose}
            className="h-8 w-8 rounded-full"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          />
        </div>

        <div
          className="flex items-center gap-3 px-6 py-4"
          style={{
            background: 'rgba(227,161,25,0.06)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full text-xl"
            style={{ background: 'rgba(227,161,25,0.15)' }}
          >
            <CoinIcon size={20} />
          </div>
          <div>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Your balance
            </p>
            <p className="font-mono text-2xl font-bold" style={{ color: '#e3a119' }}>
              {coins}
            </p>
          </div>
        </div>

        {!isSubscribed && (
          <div
            className="mx-4 mt-4 flex items-center gap-3 rounded-xl p-4"
            style={{
              background:
                'linear-gradient(135deg, rgba(69,0,255,0.18) 0%, rgba(142,0,219,0.12) 100%)',
              border: '1px solid rgba(69,0,255,0.25)',
            }}
          >
            <div className="flex-1">
              <p className="text-sm font-bold">Go Premium</p>
              <p className="mt-0.5 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Unlimited episodes · No ads · $4.99/mo
              </p>
            </div>
            <button
              onClick={() => {
                subscribe()
                onClose()
              }}
              className="flex-shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold transition-all hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #4500ff, #8e00db)', color: '#fff' }}
            >
              Subscribe
            </button>
          </div>
        )}

        {isSubscribed && (
          <div
            className="mx-4 mt-4 flex items-center gap-3 rounded-xl px-4 py-3"
            style={{ background: 'rgba(0,157,105,0.08)', border: '1px solid rgba(0,157,105,0.2)' }}
          >
            <svg viewBox="0 0 24 24" fill="#009d69" className="h-5 w-5 flex-shrink-0">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
            <p className="text-sm font-semibold" style={{ color: '#009d69' }}>
              Premium Active — all episodes unlocked
            </p>
          </div>
        )}

        <div className="space-y-2 px-4 pt-4 pb-4">
          <p className="mb-3 px-2 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Top up coins
          </p>
          {CREDITS_PACKAGES.map((pkg) => (
            <button
              key={pkg.coins}
              onClick={() => handleBuy(pkg)}
              className="relative flex w-full items-center gap-4 overflow-hidden rounded-xl px-4 py-3 transition-all hover:brightness-125 active:scale-[0.98]"
              style={{
                background: pkg.highlight ? 'rgba(69,0,255,0.12)' : 'rgba(255,255,255,0.04)',
                border: pkg.highlight
                  ? '1px solid rgba(69,0,255,0.3)'
                  : '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {pkg.highlight && (
                <span
                  className="absolute top-1.5 right-2 rounded-full px-1.5 py-0.5 text-[9px] font-bold"
                  style={{ background: '#4500ff', color: '#fff' }}
                >
                  BEST
                </span>
              )}
              <div
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
                style={{ background: 'rgba(227,161,25,0.12)' }}
              >
                <CoinIcon size={18} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold">
                  {pkg.coins} coins
                  {pkg.bonus && (
                    <span className="ml-2 text-xs font-semibold" style={{ color: '#009d69' }}>
                      {pkg.bonus}
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {pkg.label}
                </p>
              </div>
              <span
                className="text-sm font-bold"
                style={{ color: pkg.highlight ? '#7a90ff' : 'rgba(255,255,255,0.7)' }}
              >
                {pkg.price}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
