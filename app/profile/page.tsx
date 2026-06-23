'use client'

import { useState } from 'react'
import { EPISODE_COST } from '@/constants'
import { useStore } from '@/lib/store'
import ContactModal from '@/components/modals/ContactModal'
import PaywallModal from '@/components/modals/PaywallModal'
import VipSuccessModal from '@/components/modals/VipSuccessModal'
import CoinIcon from '@/components/ui/CoinIcon'

const USER_EMAIL = 'stanislav.kravets@renesandro.ai'

export default function ProfilePage() {
  const { coins, isSubscribed } = useStore()
  const [showTopUp, setShowTopUp] = useState(false)
  const [showVipSuccess, setShowVipSuccess] = useState(false)
  const [showSubscribe, setShowSubscribe] = useState(false)
  const [showContact, setShowContact] = useState(false)

  const initials = USER_EMAIL.slice(0, 2).toUpperCase()

  return (
    <div style={{ background: '#040405', minHeight: '100vh' }}>
      <div style={{ height: 64 }} />

      <div className="mx-auto max-w-lg space-y-4 px-4 py-10">
        <div
          className="flex flex-col items-center gap-4 rounded-2xl p-8"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full text-2xl font-black text-white select-none"
            style={{
              background: 'linear-gradient(135deg, #2b009f 0%, #4500ff 100%)',
              boxShadow: '0 0 0 3px rgba(69,0,255,0.25)',
            }}
          >
            {initials}
          </div>
          <div className="text-center">
            <p className="text-base font-semibold text-white">{USER_EMAIL}</p>
            <p className="mt-0.5 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Member
            </p>
          </div>
        </div>

        <div
          className="rounded-2xl p-5"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <p
            className="mb-3 text-xs font-semibold tracking-widest uppercase"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            Subscription
          </p>

          {isSubscribed ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full"
                  style={{
                    background: 'rgba(227,161,25,0.15)',
                    border: '1px solid rgba(227,161,25,0.3)',
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="#e3a119" className="h-[18px] w-[18px]">
                    <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3H5v-2h14v2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">VIP Active</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Unlimited access to all episodes
                  </p>
                </div>
              </div>
              <span
                className="rounded-full px-2.5 py-1 text-xs font-bold"
                style={{
                  background: 'rgba(227,161,25,0.15)',
                  color: '#e3a119',
                  border: '1px solid rgba(227,161,25,0.25)',
                }}
              >
                ACTIVE
              </span>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="2"
                    className="h-[18px] w-[18px]"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    No active subscription
                  </p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    Subscribe to unlock all episodes
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSubscribe(true)}
                className="w-full cursor-pointer rounded-xl py-3 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-95"
                style={{
                  background: 'linear-gradient(90deg, #2b009f 0%, #4500ff 100%)',
                  boxShadow: '0 4px 20px rgba(69,0,255,0.35)',
                }}
              >
                Get VIP — Unlimited Access
              </button>
            </div>
          )}
        </div>

        <div
          className="rounded-2xl p-5"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <p
            className="mb-3 text-xs font-semibold tracking-widest uppercase"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            Coin Balance
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-lg"
                style={{
                  background: 'rgba(227,161,25,0.12)',
                  border: '1px solid rgba(227,161,25,0.25)',
                }}
              >
                <CoinIcon />
              </div>
              <div>
                <p className="text-2xl leading-none font-black text-white">{coins}</p>
                <p className="mt-0.5 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  coins available
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowTopUp(true)}
              className="cursor-pointer rounded-xl px-4 py-2 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-95"
              style={{
                background: 'linear-gradient(90deg, #2b009f 0%, #4500ff 100%)',
                boxShadow: '0 2px 12px rgba(69,0,255,0.35)',
              }}
            >
              Top Up
            </button>
          </div>
        </div>

        <button
          onClick={() => setShowContact(true)}
          className="flex w-full cursor-pointer items-center justify-between rounded-2xl px-5 py-4 transition-all hover:brightness-125"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="2"
                className="h-[18px] w-[18px]"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <p className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Contact Us
            </p>
          </div>
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>

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
          {[
            { icon: '▶', text: `Unlock individual episodes (${EPISODE_COST} coins each)` },
            { icon: '◈', text: 'Send gifts to your favourite actors' },
            { icon: '★', text: 'Bonus coins on every top-up pack' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-start gap-3">
              <span className="mt-0.5 text-sm text-gold">{icon}</span>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {showTopUp && (
        <PaywallModal
          seriesId=""
          episodeNumber={0}
          seriesTitle=""
          showCoins
          onClose={() => setShowTopUp(false)}
          onUnlocked={() => setShowTopUp(false)}
          onSubscribed={() => {
            setShowTopUp(false)
            setShowVipSuccess(true)
          }}
        />
      )}

      {showSubscribe && (
        <PaywallModal
          seriesId=""
          episodeNumber={0}
          seriesTitle=""
          showCoins={false}
          onClose={() => setShowSubscribe(false)}
          onUnlocked={() => setShowSubscribe(false)}
          onSubscribed={() => {
            setShowSubscribe(false)
            setShowVipSuccess(true)
          }}
        />
      )}

      {showVipSuccess && <VipSuccessModal onClose={() => setShowVipSuccess(false)} />}
      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
    </div>
  )
}
