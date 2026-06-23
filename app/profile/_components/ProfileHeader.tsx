'use client'

import type { ApiUser } from '@/types'
import { formatDate } from '../_utils'

type Props = {
  user: ApiUser | null
  isLoggedIn: boolean
  onSignIn: () => void
}

export default function ProfileHeader({ user, isLoggedIn, onSignIn }: Props) {
  const email = user?.email ?? ''
  const initials = email.slice(0, 2).toUpperCase()

  return (
    <div
      className="flex flex-col items-center gap-4 rounded-2xl p-8"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {isLoggedIn ? (
        <>
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full text-2xl font-black text-white select-none"
            style={{
              background: 'linear-gradient(135deg, #2b009f 0%, #4500ff 100%)',
              boxShadow: '0 0 0 3px rgba(69,0,255,0.25)',
            }}
          >
            {initials}
          </div>
          <div className="text-center">
            <p className="text-base font-semibold text-white">{email}</p>
            <p className="mt-0.5 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {user?.createdAt ? `Member since ${formatDate(user.createdAt)}` : 'Member'}
            </p>
          </div>
        </>
      ) : (
        <>
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1.5"
              className="h-9 w-9"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-base font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Not signed in
            </p>
            <p className="mt-0.5 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Sign in to sync your progress
            </p>
          </div>
          <button
            onClick={onSignIn}
            className="w-full rounded-xl py-3 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-95"
            style={{
              background: 'linear-gradient(90deg, #2b009f 0%, #4500ff 100%)',
              boxShadow: '0 4px 20px rgba(69,0,255,0.35)',
            }}
          >
            Sign In / Create Account
          </button>
        </>
      )}
    </div>
  )
}
