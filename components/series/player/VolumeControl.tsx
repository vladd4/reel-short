import type { MouseEvent, RefObject } from 'react'

const PANEL_STYLE = {
  background: 'rgba(13,13,20,0.97)',
  backdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.1)',
  boxShadow: '0 8px 40px rgba(0,0,0,0.7)',
}

type Props = {
  volume: number
  muted: boolean
  isVolumeOpen: boolean
  volumeTrackRef: RefObject<HTMLDivElement | null>
  volumeLeaveTimerRef: RefObject<ReturnType<typeof setTimeout> | undefined>
  onToggleMute: () => void
  onStartVolumeDrag: (e: MouseEvent) => void
  onSetIsVolumeOpen: (open: boolean) => void
}

export default function VolumeControl({
  volume,
  muted,
  isVolumeOpen,
  volumeTrackRef,
  volumeLeaveTimerRef,
  onToggleMute,
  onStartVolumeDrag,
  onSetIsVolumeOpen,
}: Props) {
  const displayVolume = muted ? 0 : volume

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        clearTimeout(volumeLeaveTimerRef.current)
        onSetIsVolumeOpen(true)
      }}
      onMouseLeave={() => {
        volumeLeaveTimerRef.current = setTimeout(() => onSetIsVolumeOpen(false), 120)
      }}
    >
      <button
        onClick={onToggleMute}
        className="rounded-lg p-2 transition-colors hover:bg-white/10"
        style={{ color: 'rgba(255,255,255,0.65)' }}
      >
        {muted || volume === 0 ? (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
        ) : volume < 0.5 ? (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        )}
      </button>

      {isVolumeOpen && (
        <div
          className="absolute bottom-full left-1/2 mb-2 flex -translate-x-1/2 flex-col items-center gap-2 rounded-2xl px-3 py-3"
          style={{ ...PANEL_STYLE, width: 48 }}
        >
          <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {Math.round(displayVolume * 100)}
          </span>
          <div
            ref={volumeTrackRef}
            className="relative flex cursor-pointer items-center justify-center"
            style={{ width: 24, height: 72 }}
            onMouseDown={onStartVolumeDrag}
          >
            <div
              className="pointer-events-none absolute inset-y-0 rounded-full"
              style={{
                width: 4,
                background: 'rgba(255,255,255,0.15)',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              <div
                className="absolute right-0 bottom-0 left-0 rounded-full"
                style={{ height: `${displayVolume * 100}%`, background: '#4500ff' }}
              />
              <div
                className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-white shadow-md"
                style={{ bottom: `calc(${displayVolume * 100}% - 6px)` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
