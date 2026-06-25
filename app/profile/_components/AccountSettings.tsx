'use client'

import { useAccountSettings } from '../_hooks/useAccountSettings'
import ChangeEmailForm from './ChangeEmailForm'
import ChangePasswordForm from './ChangePasswordForm'

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
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="2"
              className="h-[18px] w-[18px]"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <p className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Change Email
          </p>
        </div>
        <ChevronIcon rotated={activeEdit === 'email'} />
      </button>

      {activeEdit === 'email' && (
        <ChangeEmailForm
          newEmail={newEmail}
          setNewEmail={setNewEmail}
          emailCurrentPw={emailCurrentPw}
          setEmailCurrentPw={setEmailCurrentPw}
          emailErrors={emailErrors}
          setEmailErrors={setEmailErrors}
          emailApiError={emailApiError}
          emailLoading={emailLoading}
          emailSuccess={emailSuccess}
          onSubmit={submitEmailChange}
        />
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
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="2"
              className="h-[18px] w-[18px]"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <p className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Change Password
          </p>
        </div>
        <ChevronIcon rotated={activeEdit === 'password'} />
      </button>

      {activeEdit === 'password' && (
        <ChangePasswordForm
          currentPw={currentPw}
          setCurrentPw={setCurrentPw}
          newPw={newPw}
          setNewPw={setNewPw}
          pwErrors={pwErrors}
          setPwErrors={setPwErrors}
          pwApiError={pwApiError}
          pwLoading={pwLoading}
          pwSuccess={pwSuccess}
          onSubmit={submitPasswordChange}
        />
      )}
    </div>
  )
}
