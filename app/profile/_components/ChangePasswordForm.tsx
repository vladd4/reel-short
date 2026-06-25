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
  currentPw: string
  setCurrentPw: Dispatch<SetStateAction<string>>
  newPw: string
  setNewPw: Dispatch<SetStateAction<string>>
  pwErrors: Record<string, string>
  setPwErrors: Dispatch<SetStateAction<Record<string, string>>>
  pwApiError: string
  pwLoading: boolean
  pwSuccess: boolean
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export default function ChangePasswordForm({
  currentPw,
  setCurrentPw,
  newPw,
  setNewPw,
  pwErrors,
  setPwErrors,
  pwApiError,
  pwLoading,
  pwSuccess,
  onSubmit,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-3 px-5 pb-5">
      <div>
        <input
          type="password"
          placeholder="Current password"
          value={currentPw}
          onChange={(e) => {
            setCurrentPw(e.target.value)
            setPwErrors((p) => ({ ...p, currentPassword: '' }))
          }}
          className="w-full rounded-xl px-4 py-3 text-base text-white outline-none"
          style={inputStyle(!!pwErrors.currentPassword)}
        />
        <FieldError message={pwErrors.currentPassword} />
      </div>
      <div>
        <input
          type="password"
          placeholder="New password"
          value={newPw}
          onChange={(e) => {
            setNewPw(e.target.value)
            setPwErrors((p) => ({ ...p, newPassword: '' }))
          }}
          className="w-full rounded-xl px-4 py-3 text-base text-white outline-none"
          style={inputStyle(!!pwErrors.newPassword)}
        />
        <FieldError message={pwErrors.newPassword} />
      </div>
      {pwApiError && (
        <p className="text-xs" style={{ color: '#ff4d4d' }}>
          {pwApiError}
        </p>
      )}
      {pwSuccess && (
        <p className="text-xs font-semibold" style={{ color: '#009d69' }}>
          Password updated successfully
        </p>
      )}
      <button
        type="submit"
        disabled={pwLoading}
        className="w-full rounded-xl py-3 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-95 disabled:opacity-50"
        style={{
          background: 'linear-gradient(90deg, #2b009f 0%, #4500ff 100%)',
          boxShadow: '0 4px 20px rgba(69,0,255,0.35)',
        }}
      >
        {pwLoading ? 'Saving…' : 'Update Password'}
      </button>
    </form>
  )
}
