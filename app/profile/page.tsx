'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import ContactModal from '@/components/modals/ContactModal'
import PaywallModal from '@/components/modals/PaywallModal'
import SignInModal from '@/components/modals/SignInModal'
import VipSuccessModal from '@/components/modals/VipSuccessModal'
import AccountSettings from './_components/AccountSettings'
import CoinBalanceCard from './_components/CoinBalanceCard'
import ContactRow from './_components/ContactRow'
import HowCoinsWork from './_components/HowCoinsWork'
import ProfileHeader from './_components/ProfileHeader'
import SignOutRow from './_components/SignOutRow'
import SubscriptionCard from './_components/SubscriptionCard'
import { useSubscription } from './_hooks/useSubscription'

export default function ProfilePage() {
  const router = useRouter()
  const { user, isLoggedIn, isLoading, logout, refreshUser } = useAuth()
  const isSubscribed = user?.isSubscribed ?? false

  const {
    subscription,
    isLoading: subLoading,
    refetch: refetchSubscription,
  } = useSubscription(isLoggedIn)

  useEffect(() => {
    if (!isLoading && !isLoggedIn) router.replace('/')
  }, [isLoading, isLoggedIn, router])

  const [showTopUp, setShowTopUp] = useState(false)
  const [showVipSuccess, setShowVipSuccess] = useState(false)
  const [showSubscribe, setShowSubscribe] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)

  async function revalidateAll() {
    await Promise.all([refreshUser().catch(() => {}), refetchSubscription().catch(() => {})])
  }

  if (!isLoggedIn) return null

  const credits = user?.credits ?? 0

  return (
    <div style={{ background: '#040405', minHeight: '100vh' }}>
      <div style={{ height: 64 }} />

      <div className="mx-auto max-w-lg space-y-4 px-4 py-10">
        <ProfileHeader user={user} isLoggedIn={isLoggedIn} onSignIn={() => setShowSignIn(true)} />

        <AccountSettings refreshUser={refreshUser} />

        <SubscriptionCard
          isLoggedIn={isLoggedIn}
          isSubscribed={isSubscribed}
          subscription={subscription}
          subscriptionLoading={subLoading}
          onSubscribe={() => setShowSubscribe(true)}
          onRefetch={revalidateAll}
        />

        <CoinBalanceCard credits={credits} onTopUp={() => setShowTopUp(true)} />

        <HowCoinsWork />

        <ContactRow onClick={() => setShowContact(true)} />

        <SignOutRow onSignOut={logout} />
      </div>

      {showTopUp && (
        <PaywallModal
          seriesId=""
          episodeNumber={0}
          seriesTitle=""
          showCoins
          onClose={() => setShowTopUp(false)}
          onUnlocked={() => setShowTopUp(false)}
          onSubscribed={() => {
            setShowTopUp(false)
            setShowVipSuccess(true)
            refetchSubscription().catch(() => {})
          }}
        />
      )}

      {showSubscribe && (
        <PaywallModal
          seriesId=""
          episodeNumber={0}
          seriesTitle=""
          showCoins={false}
          onClose={() => setShowSubscribe(false)}
          onUnlocked={() => setShowSubscribe(false)}
          onSubscribed={() => {
            setShowSubscribe(false)
            setShowVipSuccess(true)
            refetchSubscription().catch(() => {})
          }}
        />
      )}

      {showVipSuccess && <VipSuccessModal onClose={() => setShowVipSuccess(false)} />}
      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
      {showSignIn && (
        <SignInModal onClose={() => setShowSignIn(false)} onContinue={() => setShowSignIn(false)} />
      )}
    </div>
  )
}
