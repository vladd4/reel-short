'use client'

import { useState } from 'react'
import { z } from 'zod'
import BottomDrawer from '@/components/modals/BottomDrawer'
import FormInput from '@/components/ui/FormInput'
import { useAuth } from '@/lib/auth'

type Props = {
  onClose: () => void
  onContinue: () => void
}

const emailSchema = z.string().min(1, 'Email is required').email('Enter a valid email address')

const passwordSignInSchema = z.string().min(1, 'Password is required')

const passwordRegisterSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Must contain at least one number')

type FieldErrors = { email?: string; password?: string }

export default function SignInModal({ onClose, onContinue }: Props) {
  const { login, register } = useAuth()

  const [mode, setMode] = useState<'signin' | 'register'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)
  const [marketing, setMarketing] = useState(false)

  function validate(): boolean {
    const errors: FieldErrors = {}

    const emailResult = emailSchema.safeParse(email.trim())
    if (!emailResult.success) errors.email = emailResult.error.issues[0].message

    const pwSchema = mode === 'register' ? passwordRegisterSchema : passwordSignInSchema
    const pwResult = pwSchema.safeParse(password)
    if (!pwResult.success) errors.password = pwResult.error.issues[0].message

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setApiError('')
    if (!validate()) return

    setLoading(true)
    try {
      if (mode === 'signin') {
        await login(email.trim(), password)
      } else {
        await register(email.trim(), password)
      }
      onContinue()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong'
      try {
        const parsed = JSON.parse(msg)
        setApiError(parsed.message ?? msg)
      } catch {
        setApiError(msg)
      }
    } finally {
      setLoading(false)
    }
  }

  function switchMode() {
    setMode((m) => (m === 'signin' ? 'register' : 'signin'))
    setFieldErrors({})
    setApiError('')
  }

  return (
    <BottomDrawer onClose={onClose} maxHeight="90dvh">
      <form onSubmit={handleSubmit} className="px-7 pt-7 pb-8">
        <div className="mb-7 text-center">
          <h2 className="text-2xl font-bold text-white">
            {mode === 'signin' ? 'Sign in' : 'Create account'}
          </h2>
          <p className="mt-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
            {mode === 'signin' ? 'Welcome back' : 'Join My Drama today'}
          </p>
        </div>

        <div className="mb-3">
          <FormInput
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setFieldErrors((fe) => ({ ...fe, email: undefined })) }}
            placeholder="your@email.com"
            error={fieldErrors.email}
            className="py-3.5"
          />
        </div>

        <div className="mb-4">
          <FormInput
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setFieldErrors((fe) => ({ ...fe, password: undefined })) }}
            placeholder={mode === 'register' ? 'Min 8 chars, 1 uppercase, 1 number' : 'Password'}
            error={fieldErrors.password}
            className="py-3.5"
          />
        </div>

        {apiError && (
          <p
            className="mb-3 rounded-xl px-4 py-2.5 text-xs"
            style={{ background: 'rgba(214,0,0,0.12)', color: '#ff4d4d', border: '1px solid rgba(214,0,0,0.2)' }}
          >
            {apiError}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mb-4 w-full rounded-xl py-3.5 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-95 disabled:opacity-50"
          style={{
            background: 'linear-gradient(90deg, #2b009f 0%, #4500ff 100%)',
            boxShadow: '0 2px 10px rgba(69,0,255,0.3)',
          }}
        >
          {loading ? 'Please wait…' : mode === 'signin' ? 'Sign In' : 'Create Account'}
        </button>

        <button
          type="button"
          onClick={switchMode}
          className="mb-5 w-full text-center text-sm transition-opacity hover:opacity-70"
          style={{ color: '#7a90ff' }}
        >
          {mode === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
        </button>

        {mode === 'register' && (
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
        )}

        <div className="space-y-1 text-center">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
            By continuing you accept our{' '}
            <span className="cursor-pointer underline" style={{ color: '#7a90ff' }}>Terms of use</span>
            {' '}and{' '}
            <span className="cursor-pointer underline" style={{ color: '#7a90ff' }}>Privacy policy</span>
          </p>
          <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>My Drama Inc.</p>
        </div>
      </form>
    </BottomDrawer>
  )
}
