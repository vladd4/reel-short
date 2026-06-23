'use client'

import { QRCodeSVG } from 'qrcode.react'
import { APP_DOWNLOAD_URL } from '@/constants'
import { useScrollLock } from '@/hooks/useScrollLock'
import CloseButton from '@/components/ui/CloseButton'

type Props = {
  onClose: () => void
}

export default function AppDownloadModal({ onClose }: Props) {
  useScrollLock()

  return (
    <div
      className="anim-fade-in fixed inset-0 z-[200] flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="anim-scale-in relative w-full max-w-md overflow-hidden rounded-2xl"
        style={{ background: '#040405', border: '1px solid rgba(255,255,255,0.15)' }}
      >
        <CloseButton
          onClick={onClose}
          className="absolute top-3 right-3 z-10 h-7 w-7 rounded-full"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        />

        <div className="flex items-stretch gap-0">
          <div className="flex flex-1 flex-col justify-between px-6 py-8">
            <h2 className="text-lg leading-snug font-bold text-white">
              In-App Exclusive: Free Unlocks
            </h2>
            <div>
              <div className="mb-2 flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="white" className="h-6 w-6" style={{ opacity: 0.85 }}>
                  <path d="M17.523 15.341a.63.63 0 0 1-.63.63.63.63 0 0 1-.63-.63.63.63 0 0 1 .63-.63.63.63 0 0 1 .63.63zm-10.416 0a.63.63 0 0 1-.63.63.63.63 0 0 1-.63-.63.63.63 0 0 1 .63-.63.63.63 0 0 1 .63.63zm10.673-5.282l1.504-2.604a.313.313 0 0 0-.114-.427.313.313 0 0 0-.428.114l-1.523 2.637A9.448 9.448 0 0 0 12 9.036a9.448 9.448 0 0 0-5.22 1.743L5.257 8.142a.313.313 0 0 0-.428-.114.313.313 0 0 0-.114.427l1.504 2.604C3.716 12.48 2.25 15.076 2.25 18h19.5c0-2.924-1.466-5.52-3.97-6.941z" />
                </svg>
                <svg viewBox="0 0 24 24" fill="white" className="h-6 w-6" style={{ opacity: 0.85 }}>
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </div>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Scan to download app
              </p>
            </div>
          </div>

          <div className="flex flex-shrink-0 items-center justify-center p-5">
            <div
              className="overflow-hidden rounded-xl"
              style={{ background: '#fff', padding: 10, width: 164, height: 164 }}
            >
              <QRCodeSVG
                value={APP_DOWNLOAD_URL}
                size={144}
                bgColor="#ffffff"
                fgColor="#000000"
                level="M"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
