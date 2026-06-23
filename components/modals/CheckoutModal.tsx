'use client'

import { useState } from 'react'
import BottomDrawer from '@/components/modals/BottomDrawer'
import CloseButton from '@/components/ui/CloseButton'
import FormInput from '@/components/ui/FormInput'

type Props = {
  plan: { label: string; price: string }
  onClose: () => void
  onSubscribe: () => void
}

export default function CheckoutModal({ plan, onClose, onSubscribe }: Props) {
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [showCvvTip, setShowCvvTip] = useState(false)

  function formatCard(v: string) {
    return v
      .replace(/\D/g, '')
      .slice(0, 16)
      .replace(/(.{4})/g, '$1 ')
      .trim()
  }

  function formatExpiry(v: string) {
    const d = v.replace(/\D/g, '').slice(0, 4)
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubscribe()
  }

  return (
    <BottomDrawer onClose={onClose}>
      <div
        className="flex items-center justify-between px-5 pt-2 pb-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <CloseButton
          onClick={onClose}
          className="h-7 w-7 rounded-full"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        />
        <h2 className="text-base font-bold text-white">Select payment method</h2>
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
            Fast, safe checkout — start watching in seconds!
          </p>
        </div>

        <div
          className="overflow-hidden rounded-xl"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div>
              <p className="text-sm font-semibold text-white">Your {plan.label}</p>
              <p className="mt-0.5 text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Tax included
              </p>
            </div>
            <span className="text-sm font-bold text-white">{plan.price}</span>
          </div>
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <span className="text-sm font-bold text-white">Total</span>
            <span className="text-sm font-bold" style={{ color: '#7a90ff' }}>
              {plan.price}
            </span>
          </div>
        </div>

        <p
          className="rounded-xl px-4 py-3 text-[11px] leading-relaxed"
          style={{
            color: 'rgba(255,255,255,0.7)',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          By selecting a payment method and proceeding, you agree you will be charged{' '}
          <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {plan.price}
          </span>{' '}
          today, then{' '}
          <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {plan.price}
          </span>{' '}
          automatically every period thereafter unless you cancel. You can cancel your subscription
          any time through your Profile or by emailing{' '}
          <span className="cursor-pointer underline" style={{ color: 'rgba(122,144,255,0.7)' }}>
            support@my-drama.com
          </span>
          . See our{' '}
          <span className="cursor-pointer underline" style={{ color: 'rgba(122,144,255,0.7)' }}>
            Subscription Policy
          </span>{' '}
          for full details.
        </p>

        <div className="space-y-3">
          <FormInput
            label="Card Number"
            type="text"
            inputMode="numeric"
            placeholder="XXXX XXXX XXXX XXXX"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCard(e.target.value))}
          />

          <div className="grid grid-cols-2 gap-3">
            <FormInput
              label="Expiry Date"
              type="text"
              inputMode="numeric"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            />

            <div>
              <label
                className="mb-1.5 block text-xs font-semibold"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                CVV
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="w-full rounded-xl px-4 py-3 pr-10 text-sm text-white transition-all outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    caretColor: '#4500ff',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(69,0,255,0.6)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
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
                    style={{
                      background: '#1e1e2e',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.7)',
                    }}
                  >
                    3-digit code on the back of your card (4 digits for Amex)
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-semibold tracking-widest text-white uppercase transition-all hover:brightness-110 active:scale-95"
          style={{
            background: 'linear-gradient(90deg, #2b009f 0%, #4500ff 100%)',
            boxShadow: '0 4px 24px rgba(69,0,255,0.45)',
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
          </svg>
          Subscribe
        </button>
      </form>
    </BottomDrawer>
  )
}
