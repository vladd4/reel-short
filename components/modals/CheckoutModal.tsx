'use client'

import { useState } from 'react'
import { billingService } from '@/services/billing.service'
import BottomDrawer from '@/components/modals/BottomDrawer'
import CloseButton from '@/components/ui/CloseButton'
import FormInput from '@/components/ui/FormInput'

type Props = {
  plan: { label: string; price: string }
  packCode?: string
  planCode?: string
  onClose: () => void
  onSubscribe: () => void
}

type FieldErrors = {
  cardNumber?: string
  expiry?: string
  cvv?: string
}

function formatCard(v: string) {
  return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 4)
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
}

function validateCard(cardNumber: string, expiry: string, cvv: string): FieldErrors {
  const errors: FieldErrors = {}
  const digits = cardNumber.replace(/\s/g, '')
  if (digits.length !== 16) errors.cardNumber = 'Enter a valid 16-digit card number'

  const parts = expiry.split('/')
  if (parts.length !== 2 || parts[0].length !== 2 || parts[1].length !== 2) {
    errors.expiry = 'Enter expiry as MM/YY'
  } else {
    const month = parseInt(parts[0], 10)
    const year = 2000 + parseInt(parts[1], 10)
    if (month < 1 || month > 12) {
      errors.expiry = 'Invalid month'
    } else {
      const now = new Date()
      const expiryDate = new Date(year, month)
      if (expiryDate <= now) errors.expiry = 'Card has expired'
    }
  }

  if (cvv.length < 3) errors.cvv = 'Enter 3 or 4 digit CVV'

  return errors
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

export default function CheckoutModal({ plan, packCode, planCode, onClose, onSubscribe }: Props) {
  const isCoins = !!packCode

  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [showCvvTip, setShowCvvTip] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [apiError, setApiError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setApiError('')

    const fieldErrors = validateCard(cardNumber, expiry, cvv)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }
    setErrors({})
    setIsLoading(true)

    try {
      await sleep(2000 + Math.floor(Math.random() * 1000))
      if (isCoins) {
        await billingService.purchaseCredits(packCode)
      } else if (planCode) {
        await billingService.purchaseSubscription(planCode)
      }
      onSubscribe()
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Payment failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <BottomDrawer onClose={onClose}>
      <div
        className="flex items-center justify-between px-5 pt-2 pb-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <CloseButton onClick={onClose} className="h-7 w-7 rounded-full" style={{ color: 'rgba(255,255,255,0.4)' }} />
        <h2 className="text-base font-bold text-white">Payment</h2>
        <div className="w-7" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
        <div
          className="flex items-center gap-2.5 rounded-xl px-4 py-3"
          style={{ background: 'rgba(0,157,105,0.08)', border: '1px solid rgba(0,157,105,0.2)' }}
        >
          <svg viewBox="0 0 24 24" fill="#009d69" className="h-5 w-5 flex-shrink-0">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
          </svg>
          <p className="text-xs font-medium" style={{ color: '#009d69' }}>
            Fast, safe checkout — {isCoins ? 'coins added instantly!' : 'start watching in seconds!'}
          </p>
        </div>

        {/* Order summary */}
        <div className="overflow-hidden rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div>
              <p className="text-sm font-semibold text-white">{plan.label}</p>
              <p className="mt-0.5 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {isCoins ? 'One-time purchase · Tax included' : 'Tax included'}
              </p>
            </div>
            <span className="text-sm font-bold text-white">{plan.price}</span>
          </div>
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <span className="text-sm font-bold text-white">Total</span>
            <span className="text-sm font-bold" style={{ color: '#7a90ff' }}>{plan.price}</span>
          </div>
        </div>

        {/* Legal */}
        <p
          className="rounded-xl px-4 py-3 text-[11px] leading-relaxed"
          style={{
            color: 'rgba(255,255,255,0.7)',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {isCoins ? (
            <>
              By completing this purchase you agree to be charged{' '}
              <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>{plan.price}</span>{' '}
              once. Coins are added to your account immediately and are non-refundable. See our{' '}
              <span className="cursor-pointer underline" style={{ color: 'rgba(122,144,255,0.7)' }}>Terms of Service</span>.
            </>
          ) : (
            <>
              By selecting a payment method and proceeding, you agree you will be charged{' '}
              <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>{plan.price}</span>{' '}
              today, then{' '}
              <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>{plan.price}</span>{' '}
              automatically every period unless you cancel. Cancel anytime via Profile or{' '}
              <span className="cursor-pointer underline" style={{ color: 'rgba(122,144,255,0.7)' }}>support@my-drama.com</span>.
            </>
          )}
        </p>

        {/* Card fields */}
        <div className="space-y-3">
          <FormInput
            label="Card Number"
            type="text"
            inputMode="numeric"
            placeholder="XXXX XXXX XXXX XXXX"
            value={cardNumber}
            error={errors.cardNumber}
            disabled={isLoading}
            onChange={(e) => {
              setCardNumber(formatCard(e.target.value))
              setErrors((prev) => ({ ...prev, cardNumber: undefined }))
            }}
          />

          <div className="grid grid-cols-2 gap-3">
            <FormInput
              label="Expiry Date"
              type="text"
              inputMode="numeric"
              placeholder="MM/YY"
              value={expiry}
              error={errors.expiry}
              disabled={isLoading}
              onChange={(e) => {
                setExpiry(formatExpiry(e.target.value))
                setErrors((prev) => ({ ...prev, expiry: undefined }))
              }}
            />

            <div>
              <label className="mb-1.5 block text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.55)' }}>
                CVV
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="CVV"
                  value={cvv}
                  disabled={isLoading}
                  onChange={(e) => {
                    setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))
                    setErrors((prev) => ({ ...prev, cvv: undefined }))
                  }}
                  className="w-full rounded-xl px-4 py-3 pr-10 text-white transition-all outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: `1px solid ${errors.cvv ? 'rgba(214,0,0,0.5)' : 'rgba(255,255,255,0.08)'}`,
                    caretColor: '#4500ff',
                    fontSize: 16,
                  }}
                  onFocus={(e) => (e.target.style.borderColor = errors.cvv ? 'rgba(214,0,0,0.7)' : 'rgba(69,0,255,0.6)')}
                  onBlur={(e) => (e.target.style.borderColor = errors.cvv ? 'rgba(214,0,0,0.5)' : 'rgba(255,255,255,0.08)')}
                />
                <button
                  type="button"
                  onClick={() => setShowCvvTip((v) => !v)}
                  className="absolute top-1/2 right-3 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-xs font-bold"
                  style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }}
                >
                  i
                </button>
                {showCvvTip && (
                  <div
                    className="absolute right-0 bottom-full z-10 mb-2 w-48 rounded-lg px-3 py-2 text-xs"
                    style={{ background: '#1e1e2e', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}
                  >
                    3-digit code on the back of your card (4 digits for Amex)
                  </div>
                )}
              </div>
              {errors.cvv && <p className="mt-1.5 text-xs" style={{ color: '#ff4d4d' }}>{errors.cvv}</p>}
            </div>
          </div>
        </div>

        {apiError && (
          <p className="rounded-xl px-4 py-3 text-xs font-medium" style={{ background: 'rgba(214,0,0,0.08)', border: '1px solid rgba(214,0,0,0.2)', color: '#ff4d4d' }}>
            {apiError}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl py-4 text-sm font-semibold tracking-widest text-white uppercase transition-all hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-80"
          style={{
            background: 'linear-gradient(90deg, #2b009f 0%, #4500ff 100%)',
            boxShadow: '0 4px 24px rgba(69,0,255,0.45)',
          }}
        >
          {isLoading ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Processing…
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
              </svg>
              {isCoins ? 'Buy Coins' : 'Subscribe'}
            </>
          )}
        </button>
      </form>
    </BottomDrawer>
  )
}
