'use client'

import { useAccountSettings } from '../_hooks/useAccountSettings'

type Props = {
  refreshUser: () => Promise<void>
}

function ChevronIcon({ rotated }: { rotated: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 transition-transform duration-200"
      style={{ color: 'rgba(255,255,255,0.3)', transform: rotated ? 'rotate(90deg)' : 'none' }}
    >
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  )
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 text-xs" style={{ color: '#ff4d4d' }}>{message}</p>
}

export default function AccountSettings({ refreshUser }: Props) {
  const {
    activeEdit,
    openEdit,
    newEmail,
    setNewEmail,
    emailCurrentPw,
    setEmailCurrentPw,
    emailErrors,
    setEmailErrors,
    emailApiError,
    emailLoading,
    emailSuccess,
    submitEmailChange,
    currentPw,
    setCurrentPw,
    newPw,
    setNewPw,
    pwErrors,
    setPwErrors,
    pwApiError,
    pwLoading,
    pwSuccess,
    submitPasswordChange,
  } = useAccountSettings(refreshUser)

  const inputStyle = (hasError: boolean) => ({
    background: 'rgba(255,255,255,0.05)',
    border: `1px solid ${hasError ? 'rgba(214,0,0,0.5)' : 'rgba(255,255,255,0.08)'}`,
  })

  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <p
        className="px-5 pt-5 pb-3 text-xs font-semibold tracking-widest uppercase"
        style={{ color: 'rgba(255,255,255,0.35)' }}
      >
        Account Settings
      </p>

      {/* Change Email */}
      <button
        onClick={() => openEdit('email')}
        className="flex w-full cursor-pointer items-center justify-between px-5 py-3.5 transition-all hover:brightness-125"
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" className="h-[18px] w-[18px]">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <p className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>Change Email</p>
        </div>
        <ChevronIcon rotated={activeEdit === 'email'} />
      </button>

      {activeEdit === 'email' && (
        <form onSubmit={submitEmailChange} className="space-y-3 px-5 pb-5">
          <div>
            <input
              type="email"
              placeholder="New email address"
              value={newEmail}
              onChange={(e) => { setNewEmail(e.target.value); setEmailErrors((p) => ({ ...p, newEmail: '' })) }}
              className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none"
              style={inputStyle(!!emailErrors.newEmail)}
            />
            <FieldError message={emailErrors.newEmail} />
          </div>
          <div>
            <input
              type="password"
              placeholder="Current password"
              value={emailCurrentPw}
              onChange={(e) => { setEmailCurrentPw(e.target.value); setEmailErrors((p) => ({ ...p, currentPassword: '' })) }}
              className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none"
              style={inputStyle(!!emailErrors.currentPassword)}
            />
            <FieldError message={emailErrors.currentPassword} />
          </div>
          {emailApiError && <p className="text-xs" style={{ color: '#ff4d4d' }}>{emailApiError}</p>}
          {emailSuccess && <p className="text-xs font-semibold" style={{ color: '#009d69' }}>Email updated successfully</p>}
          <button
            type="submit"
            disabled={emailLoading}
            className="w-full rounded-xl py-3 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-95 disabled:opacity-50"
            style={{ background: 'linear-gradient(90deg, #2b009f 0%, #4500ff 100%)', boxShadow: '0 4px 20px rgba(69,0,255,0.35)' }}
          >
            {emailLoading ? 'Saving…' : 'Update Email'}
          </button>
        </form>
      )}

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} />

      {/* Change Password */}
      <button
        onClick={() => openEdit('password')}
        className="flex w-full cursor-pointer items-center justify-between px-5 py-3.5 transition-all hover:brightness-125"
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" className="h-[18px] w-[18px]">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <p className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>Change Password</p>
        </div>
        <ChevronIcon rotated={activeEdit === 'password'} />
      </button>

      {activeEdit === 'password' && (
        <form onSubmit={submitPasswordChange} className="space-y-3 px-5 pb-5">
          <div>
            <input
              type="password"
              placeholder="Current password"
              value={currentPw}
              onChange={(e) => { setCurrentPw(e.target.value); setPwErrors((p) => ({ ...p, currentPassword: '' })) }}
              className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none"
              style={inputStyle(!!pwErrors.currentPassword)}
            />
            <FieldError message={pwErrors.currentPassword} />
          </div>
          <div>
            <input
              type="password"
              placeholder="New password"
              value={newPw}
              onChange={(e) => { setNewPw(e.target.value); setPwErrors((p) => ({ ...p, newPassword: '' })) }}
              className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none"
              style={inputStyle(!!pwErrors.newPassword)}
            />
            <FieldError message={pwErrors.newPassword} />
          </div>
          {pwApiError && <p className="text-xs" style={{ color: '#ff4d4d' }}>{pwApiError}</p>}
          {pwSuccess && <p className="text-xs font-semibold" style={{ color: '#009d69' }}>Password updated successfully</p>}
          <button
            type="submit"
            disabled={pwLoading}
            className="w-full rounded-xl py-3 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-95 disabled:opacity-50"
            style={{ background: 'linear-gradient(90deg, #2b009f 0%, #4500ff 100%)', boxShadow: '0 4px 20px rgba(69,0,255,0.35)' }}
          >
            {pwLoading ? 'Saving…' : 'Update Password'}
          </button>
        </form>
      )}
    </div>
  )
}
