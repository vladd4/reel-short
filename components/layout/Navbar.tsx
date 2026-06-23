'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ROUTES } from '@/constants'
import { useAuth } from '@/lib/auth'
import ContactModal from '@/components/modals/ContactModal'
import SignInModal from '@/components/modals/SignInModal'
import CoinIcon from '@/components/ui/CoinIcon'

export default function Navbar() {
  const { isLoggedIn, isLoading, user } = useAuth()

  const coins = isLoggedIn ? (user?.credits ?? 0) : 0

  const [scrollProgress, setScrollProgress] = useState(0)
  const [showContact, setShowContact] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrollProgress(Math.min(window.scrollY / 150, 1))
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className="fixed inset-x-0 top-0 z-50"
        style={{
          background: `rgba(6,6,10,${(scrollProgress * 0.55).toFixed(3)})`,
          backdropFilter: `blur(${(scrollProgress * 12).toFixed(1)}px) saturate(${(100 + scrollProgress * 60).toFixed(0)}%)`,
          WebkitBackdropFilter: `blur(${(scrollProgress * 12).toFixed(1)}px) saturate(${(100 + scrollProgress * 60).toFixed(0)}%)`,
          boxShadow: `0 2px 24px rgba(0,0,0,${(scrollProgress * 0.3).toFixed(3)})`,
        }}
      >
        <div className="mx-auto flex max-w-[1536px] items-center justify-between px-5 py-4">
          <Link href={ROUTES.home} className="flex items-center gap-2 select-none">
            <svg width="32" height="32" fill="currentColor">
              <use href="/icons/sprite.svg#icon-desktop-header-logo" />
            </svg>
            <svg width="102" height="22" fill="currentColor">
              <use href="/icons/sprite.svg#icon-mobile-header-logo" />
            </svg>
            <Image
              src="/our-awards.webp"
              alt="Award"
              width={88}
              height={36}
              className="h-9 max-w-[88px] object-contain opacity-90"
              style={{ width: 'auto' }}
            />
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowContact(true)}
              className="hidden h-8 cursor-pointer items-center gap-1.5 rounded-full px-3 text-sm font-semibold transition-all hover:brightness-110 active:scale-95 md:flex"
              style={{
                background: 'linear-gradient(90deg, #2b009f, #4500ff)',
                color: '#fff',
                boxShadow: '0 2px 12px rgba(69,0,255,0.35)',
              }}
            >
              Contact Us
            </button>

            {isLoading ? (
              <div
                className="h-8 w-20 animate-pulse rounded-full"
                style={{ background: 'rgba(255,255,255,0.1)' }}
              />
            ) : isLoggedIn ? (
              <Link
                href={ROUTES.profile}
                className="flex h-8 items-center gap-1.5 rounded-full px-3 text-sm transition-all hover:brightness-125"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  color: '#fff',
                }}
              >
                <CoinIcon />
                <span className="font-mono font-semibold">{coins}</span>
              </Link>
            ) : (
              <button
                onClick={() => setShowSignIn(true)}
                className="group flex h-8 cursor-pointer items-center gap-1.5 rounded-full px-4 text-sm font-semibold text-white transition-all active:scale-95"
                style={{
                  background: 'rgba(0,0,0,0.45)',
                  border: '1px solid rgba(255,255,255,0.22)',
                  backdropFilter: 'blur(12px) saturate(160%)',
                  WebkitBackdropFilter: 'blur(12px) saturate(160%)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.58)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.32)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.45)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'
                }}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
      {showSignIn && (
        <SignInModal onClose={() => setShowSignIn(false)} onContinue={() => setShowSignIn(false)} />
      )}
    </>
  )
}
