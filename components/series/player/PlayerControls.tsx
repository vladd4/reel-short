import type { MouseEvent, RefObject } from 'react'
import { formatSeconds } from '@/lib/utils'
import SettingsPanel from './SettingsPanel'
import SubtitlesPanel from './SubtitlesPanel'
import VolumeControl from './VolumeControl'
import type { SettingsView } from './usePlayerState'

type Props = {
  playing: boolean
  currentTime: number
  duration: number
  muted: boolean
  volume: number
  buffered: number
  isVisible: boolean
  isFullscreen: boolean
  isVolumeOpen: boolean
  isSettingsOpen: boolean
  isSubtitlesOpen: boolean
  settingsView: SettingsView
  speed: number
  quality: string
  availableLanguages: string[]
  subtitle: string
  episode: number
  totalEpisodes?: number
  title: string
  hasPrev?: boolean
  hasNext?: boolean
  volumeTrackRef: RefObject<HTMLDivElement | null>
  volumeLeaveTimerRef: RefObject<ReturnType<typeof setTimeout> | undefined>
  settingsPanelRef: RefObject<HTMLDivElement | null>
  subtitlesPanelRef: RefObject<HTMLDivElement | null>
  onTogglePlay: () => void
  onSeek: (e: MouseEvent<HTMLDivElement>) => void
  onToggleMute: () => void
  onToggleFullscreen: () => void
  onStartVolumeDrag: (e: MouseEvent) => void
  onSetIsVolumeOpen: (open: boolean) => void
  onOpenSettings: () => void
  onOpenSubtitles: () => void
  onSpeedChange: (s: number) => void
  onQualityChange: (q: string) => void
  onSubtitleChange: (s: string) => void
  onSettingsViewChange: (v: SettingsView) => void
  onCloseSettings: () => void
  onCloseSubtitles: () => void
  onPrev?: () => void
  onNext?: () => void
}

export default function PlayerControls({
  playing,
  currentTime,
  duration,
  muted,
  volume,
  buffered,
  isVisible,
  isFullscreen,
  isVolumeOpen,
  isSettingsOpen,
  isSubtitlesOpen,
  settingsView,
  speed,
  quality,
  availableLanguages,
  subtitle,
  episode,
  totalEpisodes,
  title,
  hasPrev,
  hasNext,
  volumeTrackRef,
  volumeLeaveTimerRef,
  settingsPanelRef,
  subtitlesPanelRef,
  onTogglePlay,
  onSeek,
  onToggleMute,
  onToggleFullscreen,
  onStartVolumeDrag,
  onSetIsVolumeOpen,
  onOpenSettings,
  onOpenSubtitles,
  onSpeedChange,
  onQualityChange,
  onSubtitleChange,
  onSettingsViewChange,
  onCloseSettings,
  onCloseSubtitles,
  onPrev,
  onNext,
}: Props) {
  const playedPct = duration ? (currentTime / duration) * 100 : 0
  const bufferedPct = duration ? (buffered / duration) * 100 : 0

  return (
    <div
      className="absolute inset-x-0 bottom-0 transition-opacity duration-150"
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        background:
          'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 55%, transparent 100%)',
        paddingTop: 80,
      }}
    >
      <div className="mb-2 px-4">
        <p
          className="text-[10px] font-semibold tracking-widest uppercase"
          style={{ color: 'rgba(255,255,255,0.38)' }}
        >
          Episode {episode}{totalEpisodes ? ` / ${totalEpisodes}` : ''}
        </p>
        <p className="truncate text-sm leading-snug font-semibold text-white">{title}</p>
      </div>

      <div
        className="group/bar relative mb-3 cursor-pointer px-4"
        style={{ paddingTop: 5, paddingBottom: 5 }}
        onClick={onSeek}
      >
        <div
          className="relative rounded-full transition-all duration-150 group-hover/bar:scale-y-[2]"
          style={{ height: 3, background: 'rgba(255,255,255,0.15)' }}
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ width: `${bufferedPct}%`, background: 'rgba(255,255,255,0.2)' }}
          />
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ width: `${playedPct}%`, background: '#4500ff' }}
          />
        </div>
        <div
          className="pointer-events-none absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-white opacity-0 shadow-md transition-opacity group-hover/bar:opacity-100"
          style={{ left: `calc(${playedPct}% - 7px + 16px)` }}
        />
      </div>

      <div className="flex items-center gap-0.5 px-3 pb-4">
        <button
          onClick={onTogglePlay}
          className="cursor-pointer rounded-lg p-2 text-white transition-colors hover:bg-white/10"
        >
          {playing ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button
          onClick={onPrev}
          disabled={!hasPrev}
          title="Previous episode"
          className="rounded-lg p-2 transition-colors hover:bg-white/10"
          style={{
            color: hasPrev ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.2)',
            cursor: hasPrev ? 'pointer' : 'default',
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
          </svg>
        </button>

        <button
          onClick={onNext}
          disabled={!hasNext}
          title="Next episode"
          className="rounded-lg p-2 transition-colors hover:bg-white/10"
          style={{
            color: hasNext ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.2)',
            cursor: hasNext ? 'pointer' : 'default',
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>

        <VolumeControl
          volume={volume}
          muted={muted}
          isVolumeOpen={isVolumeOpen}
          volumeTrackRef={volumeTrackRef}
          volumeLeaveTimerRef={volumeLeaveTimerRef}
          onToggleMute={onToggleMute}
          onStartVolumeDrag={onStartVolumeDrag}
          onSetIsVolumeOpen={onSetIsVolumeOpen}
        />

        <div className="flex-1" />

        <span className="mr-2 font-mono text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
          {formatSeconds(currentTime)} / {formatSeconds(duration)}
        </span>

        {availableLanguages.length > 0 && (
          <div className="relative">
            <button
              onClick={onOpenSubtitles}
              title="Subtitles"
              className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-white/10"
              style={{
                color: isSubtitlesOpen || subtitle !== 'Off' ? '#fff' : 'rgba(255,255,255,0.5)',
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 7H9.5v-.5h-2v3h2V13H11v1c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1zm7 0h-1.5v-.5h-2v3h2V13H18v1c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1z" />
              </svg>
            </button>
            <SubtitlesPanel
              panelRef={subtitlesPanelRef}
              isOpen={isSubtitlesOpen}
              subtitle={subtitle}
              availableLanguages={availableLanguages}
              onSubtitleChange={onSubtitleChange}
              onClose={onCloseSubtitles}
            />
          </div>
        )}

        <div className="relative">
          <button
            onClick={onOpenSettings}
            title="Settings"
            className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-white/10"
            style={{ color: isSettingsOpen ? '#fff' : 'rgba(255,255,255,0.5)' }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
            </svg>
          </button>
          <SettingsPanel
            panelRef={settingsPanelRef}
            isOpen={isSettingsOpen}
            settingsView={settingsView}
            speed={speed}
            quality={quality}
            onSpeedChange={onSpeedChange}
            onQualityChange={onQualityChange}
            onViewChange={onSettingsViewChange}
            onClose={onCloseSettings}
          />
        </div>

        <button
          onClick={onToggleFullscreen}
          title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          className="hidden cursor-pointer rounded-lg p-2 transition-colors hover:bg-white/10 lg:block"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          {isFullscreen ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
