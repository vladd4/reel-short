'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ROUTES } from '@/constants'
import { useStore } from '@/lib/store'
import ContactModal from '@/components/modals/ContactModal'
import CloseButton from '@/components/ui/CloseButton'
import CoinIcon from '@/components/ui/CoinIcon'

export default function Navbar() {
  const { coins, isSubscribed } = useStore()

  const [scrolled, setScrolled] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const [isBannerDismissed, setIsBannerDismissed] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isBannerVisible = !isBannerDismissed && !isSubscribed && coins === 0

  return (
    <>
      <nav
        className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(4,4,5,0.97)'
            : 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
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
              className="h-9 w-auto max-w-[88px] object-contain opacity-90"
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
          </div>
        </div>
      </nav>

      {showContact && <ContactModal onClose={() => setShowContact(false)} />}

      {isBannerVisible && (
        <div
          className="fixed inset-x-0 bottom-0 z-50"
          style={{ background: '#0a0a0d', borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="relative mx-auto flex max-w-[1536px] items-center gap-3 overflow-hidden px-4 py-3 sm:px-6">
            <div
              className="pointer-events-none absolute top-0 left-0 h-full w-40"
              style={{
                background:
                  'radial-gradient(ellipse at 0% 50%, rgba(69,0,255,0.12) 0%, transparent 80%)',
              }}
            />
            <div
              className="flex-shrink-0 rounded-md px-2 py-1 text-[10px] font-black tracking-wider uppercase"
              style={{
                background: 'rgba(69,0,255,0.2)',
                color: '#7a90ff',
                border: '1px solid rgba(69,0,255,0.3)',
              }}
            >
              −38%
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-white">New User Offer</p>
              <p className="truncate text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Limited time · Top up coins now
              </p>
            </div>
            <Link
              href={ROUTES.profile}
              className="flex-shrink-0 rounded-lg px-4 py-2 text-xs font-bold transition-all hover:brightness-110 active:scale-95"
              style={{
                background: 'linear-gradient(90deg, #2b009f, #4500ff)',
                color: '#fff',
                boxShadow: '0 2px 12px rgba(69,0,255,0.35)',
              }}
            >
              Top Up
            </Link>
            <CloseButton
              onClick={() => setIsBannerDismissed(true)}
              className="h-6 w-6 flex-shrink-0 rounded-full"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            />
          </div>
        </div>
      )}
    </>
  )
}
