'use client'

import { useState } from 'react'
import BottomDrawer from '@/components/modals/BottomDrawer'
import FormInput from '@/components/ui/FormInput'

type Props = {
  onClose: () => void
  onContinue: (email: string) => void
}

export default function SignInModal({ onClose, onContinue }: Props) {
  const [email, setEmail] = useState('')
  const [marketing, setMarketing] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim()) onContinue(email.trim())
  }

  return (
    <BottomDrawer onClose={onClose} maxHeight="80dvh">
      <form onSubmit={handleSubmit} className="px-7 pt-7 pb-8">
        <div className="mb-7 text-center">
          <h2 className="text-2xl font-bold text-white">Sign in</h2>
          <p className="mt-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Please, enter your email
          </p>
        </div>

        <div className="mb-4">
          <FormInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="py-3.5"
          />
        </div>

        <button
          type="submit"
          className="mb-5 w-full rounded-xl py-3.5 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-95"
          style={{
            background: 'linear-gradient(90deg, #2b009f 0%, #4500ff 100%)',
            boxShadow: '0 2px 10px rgba(69,0,255,0.3)',
          }}
        >
          Continue with Email
        </button>

        <label className="mb-6 flex cursor-pointer items-start gap-3">
          <div
            onClick={() => setMarketing((v) => !v)}
            className="mt-0.5 flex h-5 w-5 flex-shrink-0 cursor-pointer items-center justify-center rounded transition-colors"
            style={{
              background: marketing ? '#4500ff' : 'transparent',
              border: marketing ? '1px solid #4500ff' : '1.5px solid rgba(255,255,255,0.25)',
            }}
          >
            {marketing && (
              <svg viewBox="0 0 24 24" fill="white" className="h-3 w-3">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            )}
          </div>
          <span className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
            I&apos;d like to receive emails with updates and special offers from My Drama
          </span>
        </label>

        <div className="space-y-1 text-center">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
            By continuing you accept our{' '}
            <span className="cursor-pointer underline" style={{ color: '#7a90ff' }}>
              Terms of use
            </span>{' '}
            and{' '}
            <span className="cursor-pointer underline" style={{ color: '#7a90ff' }}>
              Privacy policy
            </span>
          </p>
          <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
            My Drama Inc.
          </p>
        </div>
      </form>
    </BottomDrawer>
  )
}
