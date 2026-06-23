import type { RefObject } from 'react'

const PANEL_STYLE = {
  background: 'rgba(13,13,20,0.97)',
  backdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.1)',
  boxShadow: '0 8px 40px rgba(0,0,0,0.7)',
}

const SUBTITLES = ['Off', 'English', 'Spanish', 'French', 'Portuguese', 'German', 'Ukrainian']

type Props = {
  panelRef: RefObject<HTMLDivElement | null>
  isOpen: boolean
  subtitle: string
  onSubtitleChange: (s: string) => void
  onClose: () => void
}

export default function SubtitlesPanel({
  panelRef,
  isOpen,
  subtitle,
  onSubtitleChange,
  onClose,
}: Props) {
  if (!isOpen) return null

  return (
    <div
      ref={panelRef}
      className="absolute right-0 bottom-full mb-2 w-44 overflow-hidden rounded-2xl"
      style={PANEL_STYLE}
    >
      <div className="px-4 py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <p
          className="text-[10px] font-bold tracking-widest uppercase"
          style={{ color: 'rgba(255,255,255,0.38)' }}
        >
          Subtitles
        </p>
      </div>
      {SUBTITLES.map((s) => (
        <button
          key={s}
          onClick={() => {
            onSubtitleChange(s)
            onClose()
          }}
          className="flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-white/[0.07]"
          style={{ color: subtitle === s ? '#fff' : 'rgba(255,255,255,0.55)' }}
        >
          {s}
          {subtitle === s && (
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
              style={{ color: '#4500ff' }}
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          )}
        </button>
      ))}
    </div>
  )
}
