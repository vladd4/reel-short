'use client'

import { useState } from 'react'
import { SUPPORT_EMAIL, SUPPORT_PHONE, SUPPORT_PHONE_HREF } from '@/constants'
import { useScrollLock } from '@/hooks/useScrollLock'
import CloseButton from '@/components/ui/CloseButton'
import FormInput from '@/components/ui/FormInput'

type Props = { onClose: () => void }

export default function ContactModal({ onClose }: Props) {
  useScrollLock()

  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !message) return
    setSent(true)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="anim-scale-in relative w-full max-w-lg overflow-hidden rounded-2xl"
        style={{
          background: '#0d0d10',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-7">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="mb-1 text-xl font-black text-white">Get in Touch</h2>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                We&apos;ll get back to you within 24 hours
              </p>
            </div>
            <CloseButton
              onClick={onClose}
              className="mt-0.5 h-8 w-8 flex-shrink-0 rounded-full"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            />
          </div>

          {sent ? (
            <div className="flex flex-col items-center gap-4 py-10">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full"
                style={{
                  background: 'rgba(0,157,105,0.15)',
                  border: '1px solid rgba(0,157,105,0.3)',
                }}
              >
                <svg viewBox="0 0 24 24" fill="#009d69" className="h-8 w-8">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="mb-1 text-base font-bold text-white">Message sent!</p>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  We&apos;ll reach out to{' '}
                  <span style={{ color: 'rgba(255,255,255,0.8)' }}>{email}</span> soon.
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all hover:brightness-110"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.8)',
                }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                label="Email address"
                required
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="flex flex-col gap-1.5">
                <label
                  className="block text-xs font-semibold"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                  How can we help? <span style={{ color: '#d60000' }}>*</span>
                </label>
                <textarea
                  required
                  placeholder="Describe your issue or question…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full resize-none rounded-xl px-4 py-3 text-sm text-white transition-all outline-none placeholder:text-white/25"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    caretColor: '#4500ff',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(69,0,255,0.6)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl py-3.5 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-95"
                style={{
                  background: 'linear-gradient(90deg, #2b009f, #4500ff)',
                  boxShadow: '0 4px 20px rgba(69,0,255,0.35)',
                }}
              >
                Send Message
              </button>

              <div
                className="flex items-center justify-between border-t pt-2"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
              >
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="group flex items-center gap-2 text-xs font-medium transition-colors hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-3.5 w-3.5 flex-shrink-0"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M2 7l10 7 10-7" />
                  </svg>
                  <span className="underline-offset-2 group-hover:underline">{SUPPORT_EMAIL}</span>
                </a>
                <a
                  href={SUPPORT_PHONE_HREF}
                  className="group flex items-center gap-2 text-xs font-medium transition-colors hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-3.5 w-3.5 flex-shrink-0"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span className="underline-offset-2 group-hover:underline">{SUPPORT_PHONE}</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
