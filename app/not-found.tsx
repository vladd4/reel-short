import Link from 'next/link'
import { ROUTES } from '@/constants'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[480px] w-[480px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="relative max-w-sm space-y-6">
        <p className="text-[96px] leading-none font-black tracking-tighter text-white/5 select-none">
          404
        </p>

        <div className="-mt-10 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/15">
            <svg
              className="h-10 w-10 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75.125v-1.5C2.25 16.377 2.25 15.877 2.25 15c0-.877 0-1.377-.002-1.877M20.625 19.5h-1.5c-.621 0-1.125-.504-1.125-1.125M20.625 19.5V18c0-.621 0-1.121.002-1.621M4.5 19.5v-1.5M19.5 19.5v-1.5M6 18.375V9.75M18 18.375V9.75M6 9.75A.75.75 0 0 1 6.75 9h10.5a.75.75 0 0 1 .75.75v8.625M6 9.75A2.25 2.25 0 0 1 8.25 7.5h7.5A2.25 2.25 0 0 1 18 9.75"
              />
            </svg>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Page not found</h1>
          <p className="text-sm leading-relaxed text-muted">
            The series or page you&apos;re looking for doesn&apos;t exist or may have been removed.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <Link
            href={ROUTES.home}
            className="w-full rounded-xl bg-primary py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
