'use client'

import { type ReactNode, useEffect, useState } from 'react'
import { useScrollLock } from '@/hooks/useScrollLock'

type Props = {
  onClose: () => void
  children: ReactNode
  maxHeight?: string
}

export default function BottomDrawer({ onClose, children, maxHeight = '92dvh' }: Props) {
  useScrollLock()

  const [visible, setVisible] = useState(false)

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 280)
  }

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center"
      style={{
        background: visible ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0)',
        backdropFilter: visible ? 'blur(4px)' : 'none',
        transition: 'background 0.28s ease, backdrop-filter 0.28s ease',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div
        className="flex w-full flex-col overflow-hidden sm:w-[420px]"
        style={{
          maxHeight,
          borderRadius: '20px 20px 0 0',
          background: '#040405',
          border: '1px solid rgba(255,255,255,0.15)',
          borderBottom: 'none',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
        }}
      >
        <div className="flex flex-shrink-0 justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full" style={{ background: 'rgba(255,255,255,0.18)' }} />
        </div>

        <div className="scrollbar-hide flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}
