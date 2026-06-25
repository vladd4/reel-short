import type { RefObject } from 'react'
import type { SettingsView } from './usePlayerState'

const PANEL_STYLE = {
  background: 'rgba(13,13,20,0.97)',
  backdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.1)',
  boxShadow: '0 8px 40px rgba(0,0,0,0.7)',
}

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2]
const QUALITIES = ['Auto (540P)', '1080P', '720P', '480P', '360P']

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" style={{ color: '#4500ff' }}>
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
)

const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </svg>
)

type Props = {
  panelRef: RefObject<HTMLDivElement | null>
  isOpen: boolean
  settingsView: SettingsView
  speed: number
  quality: string
  onSpeedChange: (s: number) => void
  onQualityChange: (q: string) => void
  onViewChange: (v: SettingsView) => void
  onClose: () => void
}

export default function SettingsPanel({
  panelRef,
  isOpen,
  settingsView,
  speed,
  quality,
  onSpeedChange,
  onQualityChange,
  onViewChange,
  onClose,
}: Props) {
  if (!isOpen) return null

  return (
    <div
      ref={panelRef}
      className="absolute right-0 bottom-full mb-2 w-52 overflow-hidden rounded-2xl"
      style={PANEL_STYLE}
    >
      {settingsView === null && (
        <>
          <div className="px-4 py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <p
              className="text-[10px] font-bold tracking-widest uppercase"
              style={{ color: 'rgba(255,255,255,0.38)' }}
            >
              Settings
            </p>
          </div>

          <button
            onClick={() => onViewChange('speed')}
            className="flex w-full cursor-pointer items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-white/[0.07]"
          >
            <div className="flex items-center gap-2.5">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 flex-shrink-0"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                <path d="M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44zm-9.79 6.84a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z" />
              </svg>
              <span className="text-white">Speed</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {speed === 1 ? '1×' : `${speed}×`}
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3.5 w-3.5"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </div>
          </button>

          <button
            onClick={() => onViewChange('quality')}
            className="flex w-full cursor-pointer items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-white/[0.07]"
          >
            <div className="flex items-center gap-2.5">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4 flex-shrink-0"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 2H8" />
              </svg>
              <span className="text-white">Quality</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {quality}
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3.5 w-3.5"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </div>
          </button>
        </>
      )}

      {settingsView === 'speed' && (
        <>
          <button
            onClick={() => onViewChange(null)}
            className="flex w-full cursor-pointer items-center gap-2 px-4 py-3 text-sm transition-colors hover:bg-white/[0.07]"
            style={{
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              color: 'rgba(255,255,255,0.65)',
            }}
          >
            <BackIcon /> Playback Speed
          </button>
          {SPEEDS.map((s) => (
            <button
              key={s}
              onClick={() => {
                onSpeedChange(s)
                onViewChange(null)
                onClose()
              }}
              className="flex w-full cursor-pointer items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-white/[0.07]"
              style={{ color: speed === s ? '#fff' : 'rgba(255,255,255,0.55)' }}
            >
              {s === 1 ? 'Normal (1×)' : `${s}×`}
              {speed === s && <CheckIcon />}
            </button>
          ))}
        </>
      )}

      {settingsView === 'quality' && (
        <>
          <button
            onClick={() => onViewChange(null)}
            className="flex w-full cursor-pointer items-center gap-2 px-4 py-3 text-sm transition-colors hover:bg-white/[0.07]"
            style={{
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              color: 'rgba(255,255,255,0.65)',
            }}
          >
            <BackIcon /> Video Quality
          </button>
          {QUALITIES.map((q) => (
            <button
              key={q}
              onClick={() => {
                onQualityChange(q)
                onViewChange(null)
                onClose()
              }}
              className="flex w-full cursor-pointer items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-white/[0.07]"
              style={{ color: quality === q ? '#fff' : 'rgba(255,255,255,0.55)' }}
            >
              {q}
              {quality === q && <CheckIcon />}
            </button>
          ))}
        </>
      )}
    </div>
  )
}
