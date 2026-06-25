'use client'

import CoinIcon from '@/components/ui/CoinIcon'

type Props = {
  credits: number
  onTopUp: () => void
}

export default function CoinBalanceCard({ credits, onTopUp }: Props) {
  return (
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
            <p className="text-2xl leading-none font-black text-white">
              {credits.toLocaleString()}
            </p>
            <p className="mt-0.5 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              coins available
            </p>
          </div>
        </div>
        <button
          onClick={onTopUp}
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
  )
}
