'use client'

import type { Dispatch, FormEvent, SetStateAction } from 'react'

function inputStyle(hasError: boolean) {
  return {
    background: 'rgba(255,255,255,0.05)',
    border: `1px solid ${hasError ? 'rgba(214,0,0,0.5)' : 'rgba(255,255,255,0.08)'}`,
  }
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="mt-1 text-xs" style={{ color: '#ff4d4d' }}>
      {message}
    </p>
  )
}

type Props = {
  newEmail: string
  setNewEmail: Dispatch<SetStateAction<string>>
  emailCurrentPw: string
  setEmailCurrentPw: Dispatch<SetStateAction<string>>
  emailErrors: Record<string, string>
  setEmailErrors: Dispatch<SetStateAction<Record<string, string>>>
  emailApiError: string
  emailLoading: boolean
  emailSuccess: boolean
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export default function ChangeEmailForm({
  newEmail,
  setNewEmail,
  emailCurrentPw,
  setEmailCurrentPw,
  emailErrors,
  setEmailErrors,
  emailApiError,
  emailLoading,
  emailSuccess,
  onSubmit,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-3 px-5 pb-5">
      <div>
        <input
          type="email"
          placeholder="New email address"
          value={newEmail}
          onChange={(e) => {
            setNewEmail(e.target.value)
            setEmailErrors((p) => ({ ...p, newEmail: '' }))
          }}
          className="w-full rounded-xl px-4 py-3 text-base text-white outline-none"
          style={inputStyle(!!emailErrors.newEmail)}
        />
        <FieldError message={emailErrors.newEmail} />
      </div>
      <div>
        <input
          type="password"
          placeholder="Current password"
          value={emailCurrentPw}
          onChange={(e) => {
            setEmailCurrentPw(e.target.value)
            setEmailErrors((p) => ({ ...p, currentPassword: '' }))
          }}
          className="w-full rounded-xl px-4 py-3 text-base text-white outline-none"
          style={inputStyle(!!emailErrors.currentPassword)}
        />
        <FieldError message={emailErrors.currentPassword} />
      </div>
      {emailApiError && (
        <p className="text-xs" style={{ color: '#ff4d4d' }}>
          {emailApiError}
        </p>
      )}
      {emailSuccess && (
        <p className="text-xs font-semibold" style={{ color: '#009d69' }}>
          Email updated successfully
        </p>
      )}
      <button
        type="submit"
        disabled={emailLoading}
        className="w-full rounded-xl py-3 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-95 disabled:opacity-50"
        style={{
          background: 'linear-gradient(90deg, #2b009f 0%, #4500ff 100%)',
          boxShadow: '0 4px 20px rgba(69,0,255,0.35)',
        }}
      >
        {emailLoading ? 'Saving…' : 'Update Email'}
      </button>
    </form>
  )
}
