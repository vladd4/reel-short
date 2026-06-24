'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth'
import { useScrollLock } from '@/hooks/useScrollLock'
import { giftsService, seriesService } from '@/services'
import type { GiftItem } from '@/services'
import type { Actor } from '@/data/gifts'
import { parseId } from '@/lib/utils'
import CloseButton from '@/components/ui/CloseButton'
import CoinIcon from '@/components/ui/CoinIcon'
import GiftStep from './gift/GiftStep'
import MessageStep from './gift/MessageStep'
import PreviewStep from './gift/PreviewStep'
import SuccessStep from './gift/SuccessStep'

type GiftStep = 'choose' | 'message' | 'preview' | 'success'

const STEP_LABELS: Record<string, string> = {
  choose: 'Choose gift',
  message: 'Message',
  preview: 'Preview',
}

const ORDERED_STEPS: GiftStep[] = ['choose', 'message', 'preview']

const AVATAR_COLORS = ['#7a5c3a', '#2d3a5c', '#4a1a4a', '#1a3a2a', '#3a3a1a', '#2a1a4a']

function toInitials(name: string): string {
  return name.split(' ').map((p) => p[0] ?? '').join('').slice(0, 2).toUpperCase()
}

export default function GiftModal({ onClose, seriesId }: { onClose: () => void; seriesId: string }) {
  useScrollLock()

  const { user, refreshUser } = useAuth()
  const coins = user?.credits ?? 0

  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<GiftStep>('choose')
  const [loading, setLoading] = useState(true)
  const [gifts, setGifts] = useState<GiftItem[]>([])
  const [actors, setActors] = useState<Actor[]>([])
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null)
  const [category, setCategory] = useState('popular')
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null)
  const [message, setMessage] = useState('')
  const [attachedImage, setAttachedImage] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsOpen(true))
    async function loadData() {
      try {
        const [items, apiActors] = await Promise.all([
          giftsService.getAll(),
          seriesService.getActors(parseInt(parseId(seriesId), 10)),
        ])
        setGifts(items)
        const mapped: Actor[] = apiActors.map((a, i) => ({
          id: String(a.id),
          initials: toInitials(a.name),
          name: a.name.split(' ')[0] ?? a.name,
          fullName: a.name,
          avatarBg: AVATAR_COLORS[i % AVATAR_COLORS.length],
        }))
        setActors(mapped)
        if (mapped.length > 0) setSelectedActor(mapped[0])
      } catch {} finally {
        setLoading(false)
      }
    }
    loadData()
    return () => cancelAnimationFrame(raf)
  }, [seriesId])

  function handleClose() {
    setIsOpen(false)
    setTimeout(onClose, 300)
  }

  async function handleSend() {
    if (!selectedGift || !selectedActor) return
    setIsSending(true)
    try {
      await giftsService.send(selectedActor.id, selectedGift.code, message)
    } catch {}
    setIsSending(false)
    setStep('success')
    ;(async () => { try { await refreshUser() } catch {} })()
  }

  function handleSendAnother() {
    setStep('choose')
    setSelectedGift(null)
    setMessage('')
    setAttachedImage(null)
  }

  const canAfford = selectedGift ? coins >= selectedGift.cost : false
  const stepNumber = step === 'success' ? 3 : ORDERED_STEPS.indexOf(step) + 1

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
      style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        className={`scrollbar-hide max-h-[92vh] w-full overflow-y-auto sm:max-h-[90vh] sm:w-[560px] modal-drawer${isOpen ? ' open' : ''}`}
        style={{
          background: '#040405',
          boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-shrink-0 justify-center pt-3 pb-1 sm:hidden">
          <div className="h-1 w-10 rounded-full" style={{ background: 'rgba(255,255,255,0.18)' }} />
        </div>

        <div
          className="flex items-center justify-between px-5 pt-3 pb-4 sm:pt-5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <h2 className="text-base font-bold text-white">Send a Gift</h2>
          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold"
              style={{
                background: 'rgba(227,161,25,0.12)',
                border: '1px solid rgba(227,161,25,0.3)',
                color: '#e3a119',
              }}
            >
              <CoinIcon size={14} />
              {coins.toLocaleString()}
            </div>
            <CloseButton
              onClick={handleClose}
              className="hidden h-8 w-8 rounded-full sm:flex"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            />
          </div>
        </div>

        {step !== 'success' && (
          <div className="flex flex-wrap items-center gap-1.5 px-5 py-4 text-sm">
            {ORDERED_STEPS.map((s, i) => (
              <span key={s} className="flex items-center gap-1.5">
                <span
                  style={{
                    color: i + 1 === stepNumber ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.25)',
                    fontWeight: i + 1 === stepNumber ? 700 : 400,
                  }}
                >
                  {i + 1} · {STEP_LABELS[s]}
                </span>
                {i < 2 && <span style={{ color: 'rgba(255,255,255,0.15)' }}>—</span>}
              </span>
            ))}
          </div>
        )}

        {step === 'choose' && (loading || selectedActor) && (
          <GiftStep
            loading={loading}
            gifts={gifts}
            actors={actors}
            selectedActor={selectedActor}
            selectedGift={selectedGift}
            category={category}
            onActorSelect={setSelectedActor}
            onCategorySelect={setCategory}
            onGiftSelect={setSelectedGift}
            onContinue={() => setStep('message')}
          />
        )}

        {step === 'message' && selectedGift && selectedActor && (
          <MessageStep
            selectedActor={selectedActor}
            selectedGift={selectedGift}
            message={message}
            attachedImage={attachedImage}
            onMessageChange={setMessage}
            onAttachImage={setAttachedImage}
            onRemoveImage={() => setAttachedImage(null)}
            onBack={() => setStep('choose')}
            onContinue={() => setStep('preview')}
          />
        )}

        {step === 'preview' && selectedGift && selectedActor && (
          <PreviewStep
            selectedActor={selectedActor}
            selectedGift={selectedGift}
            message={message}
            attachedImage={attachedImage}
            canAfford={canAfford}
            isSending={isSending}
            onSend={handleSend}
            onBack={() => setStep('message')}
          />
        )}

        {step === 'success' && selectedGift && selectedActor && (
          <SuccessStep
            selectedActor={selectedActor}
            selectedGift={selectedGift}
            attachedImage={attachedImage}
            onSendAnother={handleSendAnother}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  )
}
