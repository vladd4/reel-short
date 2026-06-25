'use client'

import { useState } from 'react'
import type { Subscription } from '@/types'
import { billingService } from '@/services/billing.service'
import { formatDate } from '../_utils'

type Props = {
  isLoggedIn: boolean
  isSubscribed: boolean
  subscription: Subscription | null
  subscriptionLoading: boolean
  onSubscribe: () => void
  onRefetch: () => Promise<void>
}

const CrownIcon = () => (
  <svg viewBox="0 0 24 24" fill="#e3a119" className="h-[18px] w-[18px]">
    <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3H5v-2h14v2z" />
  </svg>
)

export default function SubscriptionCard({
  isLoggedIn,
  isSubscribed,
  subscription,
  subscriptionLoading,
  onSubscribe,
  onRefetch,
}: Props) {
  const hasPeriod =
    subscription &&
    (subscription.status === 'ACTIVE' || subscription.status === 'CANCELED') &&
    new Date(subscription.currentPeriodEnd) > new Date()

  const [confirmCancel, setConfirmCancel] = useState(false)
  const [isCanceling, setIsCanceling] = useState(false)
  const [cancelError, setCancelError] = useState('')

  async function handleConfirmCancel() {
    setCancelError('')
    setIsCanceling(true)
    try {
      await billingService.cancelSubscription()
      await onRefetch()
      setConfirmCancel(false)
    } catch (err) {
      setCancelError(err instanceof Error ? err.message : 'Failed to cancel. Try again.')
    } finally {
      setIsCanceling(false)
    }
  }

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
        Subscription
      </p>

      {subscriptionLoading ? (
        <div className="flex items-center gap-3 py-1">
          <div
            className="h-9 w-9 animate-pulse rounded-full"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          />
          <div className="space-y-2">
            <div
              className="h-3 w-32 animate-pulse rounded"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            />
            <div
              className="h-2.5 w-24 animate-pulse rounded"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            />
          </div>
        </div>
      ) : hasPeriod && subscription ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{
                  background: 'rgba(227,161,25,0.15)',
                  border: '1px solid rgba(227,161,25,0.3)',
                }}
              >
                <CrownIcon />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{subscription.plan.name}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  ${subscription.plan.price} / {subscription.plan.interval.toLowerCase()}
                </p>
              </div>
            </div>
            <span
              className="rounded-full px-2.5 py-1 text-xs font-bold"
              style={
                subscription.status === 'CANCELED'
                  ? {
                      background: 'rgba(255,255,255,0.07)',
                      color: 'rgba(255,255,255,0.45)',
                      border: '1px solid rgba(255,255,255,0.12)',
                    }
                  : {
                      background: 'rgba(227,161,25,0.15)',
                      color: '#e3a119',
                      border: '1px solid rgba(227,161,25,0.25)',
                    }
              }
            >
              {subscription.status === 'CANCELED' ? 'CANCELED' : 'ACTIVE'}
            </span>
          </div>

          <div
            className="grid grid-cols-2 gap-2 rounded-xl p-3"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div>
              <p
                className="text-[10px] tracking-wider uppercase"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                Period start
              </p>
              <p className="mt-0.5 text-xs font-medium text-white">
                {formatDate(subscription.currentPeriodStart)}
              </p>
            </div>
            <div>
              <p
                className="text-[10px] tracking-wider uppercase"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                Access until
              </p>
              <p className="mt-0.5 text-xs font-medium text-white">
                {formatDate(subscription.currentPeriodEnd)}
              </p>
            </div>
          </div>

          {subscription.plan.features.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {subscription.plan.features.map((f) => (
                <span
                  key={f}
                  className="rounded-full px-2.5 py-1 text-[10px] font-semibold"
                  style={{
                    background: 'rgba(227,161,25,0.08)',
                    color: 'rgba(227,161,25,0.8)',
                    border: '1px solid rgba(227,161,25,0.15)',
                  }}
                >
                  {f}
                </span>
              ))}
            </div>
          )}

          {subscription.autoRenew && !confirmCancel && (
            <div>
              <button
                onClick={() => setConfirmCancel(true)}
                className="cursor-pointer text-xs transition-colors hover:underline"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                Cancel auto-renew
              </button>
              <span className="mx-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.15)' }}>
                ·
              </span>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Renews {formatDate(subscription.currentPeriodEnd)}
              </span>
            </div>
          )}

          {subscription.autoRenew && confirmCancel && (
            <div
              className="space-y-2 rounded-xl p-3"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <p className="text-xs font-medium text-white">Cancel auto-renew?</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                You keep access until {formatDate(subscription.currentPeriodEnd)}. You won&apos;t be
                charged again.
              </p>
              {cancelError && (
                <p className="text-xs" style={{ color: '#ff4d4d' }}>
                  {cancelError}
                </p>
              )}
              <div className="flex gap-2 pt-0.5">
                <button
                  onClick={handleConfirmCancel}
                  disabled={isCanceling}
                  className="cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                  style={{
                    background: 'rgba(214,0,0,0.15)',
                    color: '#ff6b6b',
                    border: '1px solid rgba(214,0,0,0.25)',
                  }}
                >
                  {isCanceling ? 'Canceling…' : 'Yes, cancel'}
                </button>
                <button
                  onClick={() => {
                    setConfirmCancel(false)
                    setCancelError('')
                  }}
                  disabled={isCanceling}
                  className="cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition-all hover:brightness-110 disabled:opacity-50"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    color: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  Keep plan
                </button>
              </div>
            </div>
          )}

          {!subscription.autoRenew && (
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Auto-renewal off · Access until {formatDate(subscription.currentPeriodEnd)}
            </p>
          )}
        </div>
      ) : isSubscribed ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{
                background: 'rgba(227,161,25,0.15)',
                border: '1px solid rgba(227,161,25,0.3)',
              }}
            >
              <CrownIcon />
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
          {isLoggedIn && (
            <button
              onClick={onSubscribe}
              className="w-full cursor-pointer rounded-xl py-3 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-95"
              style={{
                background: 'linear-gradient(90deg, #2b009f 0%, #4500ff 100%)',
                boxShadow: '0 4px 20px rgba(69,0,255,0.35)',
              }}
            >
              Get VIP — Unlimited Access
            </button>
          )}
        </div>
      )}
    </div>
  )
}
