'use client'

import { useEffect, useState } from 'react'
import { COIN_PACKS, PAYWALL_COUNTDOWN_S, SALE_TIMER_KEY, SUBSCRIPTION_PLANS } from '@/constants'
import { useStore } from '@/lib/store'
import { useScrollLock } from '@/hooks/useScrollLock'
import CheckoutModal from '@/components/modals/CheckoutModal'
import SignInModal from '@/components/modals/SignInModal'
import CloseButton from '@/components/ui/CloseButton'
import CoinIcon from '@/components/ui/CoinIcon'

type Props = {
  seriesId: string
  episodeNumber: number
  seriesTitle: string
  onClose: () => void
  onUnlocked: () => void
  onSubscribed?: () => void
  showCoins?: boolean
}

type CoinPack = (typeof COIN_PACKS)[number]

export default function PaywallModal({
  onClose,
  onUnlocked,
  onSubscribed,
  showCoins = false,
}: Props) {
  useScrollLock()

  const { addCoins, subscribe } = useStore()

  const [seconds, setSeconds] = useState(0)
  const [selected, setSelected] = useState<'weekly' | 'yearly'>('weekly')
  const [checkoutStep, setCheckoutStep] = useState<'signin' | 'payment' | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    const now = Date.now()
    const stored = localStorage.getItem(SALE_TIMER_KEY)
    let deadline: number

    if (stored) {
      deadline = parseInt(stored, 10)
    } else {
      deadline = now + PAYWALL_COUNTDOWN_S * 1000
      localStorage.setItem(SALE_TIMER_KEY, String(deadline))
    }

    const tick = () => setSeconds(Math.max(0, Math.round((deadline - Date.now()) / 1000)))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const saleActive = seconds > 0
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0')
  const secs = String(seconds % 60).padStart(2, '0')

  const selectedPlan = SUBSCRIPTION_PLANS.find((p) => p.id === selected)!

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 280)
  }

  function handleBuyCoin(pack: CoinPack) {
    addCoins(pack.total)
    handleClose()
  }

  return (
    <>
      <div
        className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
        style={{
          background: visible ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0)',
          backdropFilter: visible ? 'blur(4px)' : 'none',
          transition: 'background 0.28s ease, backdrop-filter 0.28s ease',
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose()
        }}
      >
        <div
          className={`flex max-h-[92dvh] w-full flex-col overflow-hidden sm:mx-4 sm:max-w-2xl modal-drawer${visible ? ' open' : ''}`}
          style={{
            background: '#040405',
            boxShadow: '0 -8px 40px rgba(0,0,0,0.6)',
          }}
        >
          <div className="flex flex-shrink-0 justify-center pt-3 pb-1 sm:hidden">
            <div className="h-1 w-10 rounded-full" style={{ background: 'rgba(255,255,255,0.18)' }} />
          </div>

          {saleActive && (
            <div
              className="relative flex-shrink-0 overflow-hidden px-5 py-4"
              style={{
                background: 'linear-gradient(135deg, #111114 0%, #0a0a0c 60%, #0d0d10 100%)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div
                className="pointer-events-none absolute -top-6 -left-6 h-32 w-32 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)' }}
              />
              <div
                className="pointer-events-none absolute right-16 -bottom-8 h-28 w-28 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)' }}
              />

              <div className="relative flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="mb-0.5 text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      Limited time
                    </p>
                    <p className="text-base leading-tight font-bold text-white">
                      Newby Sale — <span style={{ color: '#7a90ff' }}>67% OFF</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5"
                    style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" style={{ color: '#7a90ff' }}>
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span className="font-mono text-sm font-bold text-white tabular-nums">{mins}:{secs}</span>
                  </div>
                  <CloseButton onClick={handleClose} className="h-7 w-7 rounded-full" style={{ color: 'rgba(255,255,255,0.4)' }} />
                </div>
              </div>
            </div>
          )}

          <div className="scrollbar-hide overflow-y-auto">
            <div className="space-y-6 px-5 pt-5 pb-6">
              <div>
                <h2 className="mb-0.5 text-lg font-bold text-white">VIP Unlock all series for free</h2>
                <p className="mb-5 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Auto renew. Cancel anytime.</p>

                <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {SUBSCRIPTION_PLANS.map((plan) => {
                    const isSelected = selected === plan.id
                    return (
                      <button
                        key={plan.id}
                        onClick={() => setSelected(plan.id as 'weekly' | 'yearly')}
                        className="relative overflow-hidden rounded-2xl p-4 text-left transition-all"
                        style={{
                          background: 'linear-gradient(145deg, #f5e6c8 0%, #e8d09a 50%, #d4b870 100%)',
                          border: '2px solid transparent',
                          boxShadow: isSelected ? '0 0 0 3px #fff' : 'none',
                        }}
                      >
                        <div
                          className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full opacity-30"
                          style={{ background: 'radial-gradient(circle, #e3a119 0%, transparent 70%)' }}
                        />
                        <p className="mb-2 text-sm font-bold" style={{ color: '#1a1205' }}>{plan.label}</p>
                        <div className="mb-1 flex items-baseline gap-2">
                          <span className="text-2xl font-bold" style={{ color: '#1a1205' }}>
                            {saleActive ? plan.salePrice : plan.fullPrice}
                          </span>
                          {saleActive && (
                            <span className="text-xs" style={{ color: 'rgba(26,18,5,0.45)' }}>
                              <span className="line-through">{plan.fullPrice}</span> -{plan.discount}
                            </span>
                          )}
                        </div>
                        <p className="mb-0.5 text-[10px] font-medium" style={{ color: 'rgba(26,18,5,0.7)' }}>
                          Auto-renew. Cancel anytime.
                        </p>
                        <p className="mb-4 text-[10px] leading-snug" style={{ color: 'rgba(26,18,5,0.5)' }}>
                          {plan.renewal}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold" style={{ background: 'rgba(26,18,5,0.12)', color: '#3d2a05' }}>
                            <span>📺</span> Unlimited Viewing
                          </span>
                          <span className="flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold" style={{ background: 'rgba(26,18,5,0.12)', color: '#3d2a05' }}>
                            <span>🔲</span> 1080p High Quality
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[
                    {
                      icon: (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                          <rect x="1" y="4" width="22" height="16" rx="2" />
                          <line x1="1" y1="10" x2="23" y2="10" />
                        </svg>
                      ),
                      style: { background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(255,255,255,0.2)', color: '#fff' },
                    },
                    {
                      icon: (
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                        </svg>
                      ),
                      style: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' },
                    },
                    {
                      icon: (
                        <span className="text-base leading-none font-bold">
                          <span style={{ color: '#4285F4' }}>G</span>
                          <span style={{ color: '#EA4335' }}>o</span>
                          <span style={{ color: '#FBBC05' }}>o</span>
                          <span style={{ color: '#34A853' }}>g</span>
                          <span style={{ color: '#EA4335' }}>l</span>
                          <span style={{ color: '#4285F4' }}>e</span>
                        </span>
                      ),
                      style: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' },
                    },
                    {
                      icon: (
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                          <path fill="#003087" d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z" />
                          <path fill="#009cde" d="M21.222 6.917a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.47z" />
                        </svg>
                      ),
                      style: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' },
                    },
                  ].map((btn, i) => (
                    <button
                      key={i}
                      onClick={() => setCheckoutStep('signin')}
                      className="flex flex-col items-center justify-center gap-1 rounded-xl py-3 text-white transition-all hover:brightness-125"
                      style={btn.style}
                    >
                      {btn.icon}
                    </button>
                  ))}
                </div>
              </div>

              {showCoins && (
                <div>
                  <h3 className="mb-4 text-base font-bold text-white">Top up coins</h3>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {COIN_PACKS.map((pack) => (
                      <CoinCard key={pack.total} pack={pack} onBuy={handleBuyCoin} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {checkoutStep === 'signin' && (
        <SignInModal
          onClose={() => setCheckoutStep(null)}
          onContinue={() => setCheckoutStep('payment')}
        />
      )}

      {checkoutStep === 'payment' && (
        <CheckoutModal
          plan={{
            label: selectedPlan.label,
            price: saleActive ? selectedPlan.salePrice : selectedPlan.fullPrice,
          }}
          onClose={() => setCheckoutStep(null)}
          onSubscribe={() => {
            subscribe()
            setCheckoutStep(null)
            onSubscribed?.()
          }}
        />
      )}
    </>
  )
}

function CoinCard({ pack, onBuy }: { pack: CoinPack; onBuy: (pack: CoinPack) => void }) {
  return (
    <button
      onClick={() => onBuy(pack)}
      className="relative rounded-xl p-3 text-left transition-all hover:brightness-125 active:scale-[0.97]"
      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {pack.bonus && (
        <span
          className="absolute top-2 right-2 rounded px-1.5 py-0.5 text-[10px] font-bold"
          style={{ background: '#d60000', color: '#fff' }}
        >
          {pack.bonus}
        </span>
      )}
      <div className="mb-2 flex items-center gap-1.5 pr-8">
        <CoinIcon size={18} />
        <span className="text-xl leading-none font-bold text-white">{pack.total.toLocaleString()}</span>
      </div>
      <p className="mb-0.5 text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
        Immediately: {pack.immediate.toLocaleString()}
      </p>
      {pack.free > 0 ? (
        <p className="mb-3 text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
          Free: {pack.free.toLocaleString()}
        </p>
      ) : (
        <div className="mb-3" />
      )}
      <p className="text-base font-bold text-white">{pack.price}</p>
    </button>
  )
}
