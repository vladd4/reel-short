'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth'
import { useScrollLock } from '@/hooks/useScrollLock'
import { GIFT_ACTORS } from '@/data/gifts'
import type { Actor, GiftItem } from '@/data/gifts'
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

export default function GiftModal({ onClose }: { onClose: () => void }) {
  useScrollLock()

  const { user } = useAuth()
  const coins = user?.credits ?? 0

  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<GiftStep>('choose')
  const [selectedActor, setSelectedActor] = useState<Actor>(GIFT_ACTORS[0])
  const [category, setCategory] = useState('popular')
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null)
  const [message, setMessage] = useState('')
  const [attachedImage, setAttachedImage] = useState<string | null>(null)

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsOpen(true))
    return () => cancelAnimationFrame(id)
  }, [])

  function handleClose() {
    setIsOpen(false)
    setTimeout(onClose, 300)
  }

  function handleSend() {
    if (!selectedGift) return
    setStep('success')
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

        {step === 'choose' && (
          <GiftStep
            selectedActor={selectedActor}
            selectedGift={selectedGift}
            category={category}
            onActorSelect={setSelectedActor}
            onCategorySelect={setCategory}
            onGiftSelect={setSelectedGift}
            onContinue={() => setStep('message')}
          />
        )}

        {step === 'message' && selectedGift && (
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

        {step === 'preview' && selectedGift && (
          <PreviewStep
            selectedActor={selectedActor}
            selectedGift={selectedGift}
            message={message}
            attachedImage={attachedImage}
            canAfford={canAfford}
            onSend={handleSend}
            onBack={() => setStep('message')}
          />
        )}

        {step === 'success' && selectedGift && (
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
