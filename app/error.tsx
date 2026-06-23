'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ROUTES } from '@/constants'

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      {/* Glow backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[480px] h-[480px] rounded-full bg-danger/10 blur-[120px]" />
      </div>

      <div className="relative space-y-6 max-w-sm">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-2xl bg-danger/15 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-danger"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
          <p className="text-muted text-sm leading-relaxed">
            An unexpected error occurred. Please try again or return to the home screen.
          </p>
          {error.digest && (
            <p className="text-xs text-dim font-mono mt-1">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={reset}
            className="w-full py-3 rounded-xl bg-primary font-semibold text-sm text-white transition-opacity hover:opacity-90 active:opacity-80"
          >
            Try again
          </button>
          <Link
            href={ROUTES.home}
            className="w-full py-3 rounded-xl glass font-semibold text-sm text-foreground text-center transition-opacity hover:opacity-90 active:opacity-80"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
